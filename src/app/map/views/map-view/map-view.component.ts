import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map, MapboxGeoJSONFeature, Point, SymbolLayer } from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { AccessPoint, Alert, Building, Device, Floor, Location, Region } from '../../models';
import { environment } from 'src/environments/environment';
import { DeviceMapboxDetails } from '@map/models/device-mapbox-details.model';
import { MapViewDataSource } from './map-view-data-source';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Store } from '@ngrx/store';
import { RootState } from '@store/index';
import { AlertEffects } from '@store/alert/alert.effects';
import { alertReducer } from '@store/alert/alert.reducer';
import { selectLoading } from '@store/alert/alert.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    providers: [ConfirmationService],
})
export class MapViewComponent implements OnChanges {
    @Input() locations: Location[] | null = [];
    @Input() selectedLocation: Location | null = null;
    @Input() buildings: Building[] | null = [];
    @Input() selectedBuilding?: Building | null;
    @Input() isEditingBuildingShape?: boolean | null = false;
    @Input() selectedRegion?: Region | null;
    @Input() isEditingRegionShape?: boolean | null = false;
    @Input() selectedFloor?: Floor | null;
    @Input() accessPoints: AccessPoint[] | null = [];
    @Input() devices: Device[] | null = [];
    @Input() deviceLoading: boolean | null = false;
    @Input() selectedAccessPoint?: AccessPoint | null;
    @Input() showDevices?: boolean | null = true;
    @Input() showStaticDevices?: boolean | null = true;
    @Input() showAccessPoints?: boolean | null = false;
    @Input() showClusters?: boolean | null = false;
    @Input() filterBySSID?: any[] | null = [];

    @Input() selectedAlert?: Alert | null;
    @Input() regionPolygon?: number[][] | null;

    // Drawing
    @Input() isDrawing: boolean | null = false;
    @Input() deleteDrawing: any | null;

    @Input() showBuildingOverview: boolean | null = false;

    @Output() flyToBuildingComplete = new EventEmitter();
    @Output() clickedBuildingId = new EventEmitter<number>();
    @Output() clickedAccessPoint = new EventEmitter<number>();
    @Output() drawingComplete = new EventEmitter();
    @Output() updateBuildingShape = new EventEmitter<number[][]>();
    @Output() updateRegionShape = new EventEmitter<number[][]>();
    @Output() cancelUpdateRegionShape = new EventEmitter();

    // MapBox Map
    map!: Map;
    // Custom data sources
    mapBuildingData!: MapViewDataSource;
    mapRegionData!: MapViewDataSource;
    mapAccessPointData!: MapViewDataSource;
    mapLiveDeviceData!: MapViewDataSource;
    mapStaticDeviceData!: MapViewDataSource;

    // MapBox Drawing tools
    draw!: MapboxDraw;
    currentPolygon?: GeoJSON.Polygon;
    // A stored list of all buildings that are highlighted to enable/disable hover effect in MapBox
    highlightedBuildings: MapboxGeoJSONFeature[] = [];
    // Position of the selected feature (coordinates set in object do not match for some reason)
    selectedPosition?: number[];
    // The ID of the access point or building that the user is hovering over (stored to display hover effect)
    hoveredAccessPointId?: any;
    hoveredBuildingId?: any;
    hoveredDevice?: mapboxgl.MapboxGeoJSONFeature;
    // Whether the access point image has been initialized. Prevents initializing multiple times.
    apIconImageInitialized = false;
    // The initial zoom level to display the map
    initialZoomLevel: number = environment.zoomLevel ? environment.zoomLevel : 20;
    // Width of the overview panel on the right of the screen
    overviewPanelWidth = 310;
    analyticsPanelHeight = 150;
    centeredCoordinates?: mapboxgl.LngLat;
    // Device display settings for mapbox
    liveDeviceDetails: DeviceMapboxDetails = {
        id: 'devices',
        layers: ['device-unclustered-point', 'device-clusters', 'device-cluster-count'],
        sourceName: 'devicesSource',
        heatmapName: 'devices-heatmap',
        circleColor: '#c702fb',
        circleRadius: 2.5,
        circleOpacity: 0.5,
        heatmapColorRGB: '199, 2, 251',
    };
    staticDeviceDetails: DeviceMapboxDetails = {
        id: 'staticDevices',
        layers: ['static-unclustered-point', 'static-clusters', 'static-cluster-count'],
        sourceName: 'staticSource',
        heatmapName: 'static-heatmap',
        circleColor: '#00c1ff',
        circleRadius: 2,
        circleOpacity: 0.5,
        heatmapColorRGB: '2, 185, 251',
    };


    loadingAlert$: Observable<any>;
    constructor(private confirmationService: ConfirmationService, private store: Store<RootState>) {
        this.loadingAlert$ = this.store.select(selectLoading);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.buildings?.firstChange === false) {
            if (changes.buildings.currentValue) {
                this.addCustomBuildings();
            }
        }
        if (
            changes.accessPoints?.firstChange === false &&
            changes.accessPoints.currentValue.toString() !== changes.accessPoints.previousValue.toString()
        ) {
            this.addAccessPointsToMap();
        }
        if (changes.devices?.firstChange === false) {

            this.addDevices();
        }
        if (changes.filterBySSID?.firstChange === false) {

            this.addSSIDFilterDevices();
        }
        if (changes.zoomIn?.firstChange === false) {
            this.onZoomIn();
        }
        if (changes.showAccessPoints?.firstChange === false) {
            this.toggleAccessPoints();
        }
        if (changes.showDevices?.firstChange === false) {
            this.toggleDevices();
        }
        if (changes.showClusters?.firstChange === false) {
            this.toggleClusters();
        }
        // if (
        //   changes.isEditingBuildingShape?.currentValue === true ||
        //   changes.isEditingRegionShape?.currentValue === true
        // ) {
        //   this.startDrawing();
        // }
        if (changes.isEditingBuildingShape?.currentValue === false || changes.isEditingRegionShape?.currentValue === false) {
            this.draw?.trash();
        }
        if (changes.showStaticDevices?.firstChange === false) {
            this.toggleIOT();
        }
        if (changes.regionPolygon?.firstChange === false) {
            let regionCoordinates = [];
            if (changes.regionPolygon.currentValue) {
                regionCoordinates = changes.regionPolygon.currentValue;
            }
            this.showRegionPreview(regionCoordinates);
            // Display the region within the viewport
            if (regionCoordinates?.length > 0) {
                this.zoomToPolygon(regionCoordinates, 300, [40, 0]);
            }
        }
        // if (changes.isDrawing?.firstChange === false) {
        //   if (changes.isDrawing.currentValue === true) {
        //     this.draw?.changeMode('draw_polygon');
        //     this.startDrawing();
        //   }
        // }
        if (changes.selectedBuilding?.currentValue) {
            this.flyToLocation(changes.selectedBuilding.currentValue.coordLatitude, changes.selectedBuilding.currentValue.coordLongitude);
        }
    }

    mapLoad(map: Map): void {
        this.map = map;
        // Set the map's centered location with an offset for the panels in the UI
        if (this.selectedLocation) {
            this.onCenterMap();
        }
        // Don't allow user to rotate the map
        this.disableRotate();
        // Add drawing tools
        this.addDrawingTools();
        // Create a data source for devices
        this.mapLiveDeviceData = this.addDeviceData(this.liveDeviceDetails, this.mapLiveDeviceData);
        this.mapStaticDeviceData = this.addDeviceData(this.staticDeviceDetails, this.mapStaticDeviceData);
        this.addDevices();
        // Create a data source for custom buildings
        this.addBuildingData();
        // Create a data source for region overlays
        this.addRegionData();
        // Create a data source for access points
        this.addAccessPointData();
        if (this.isEditingRegionShape || this.isEditingBuildingShape) {
            this.draw?.changeMode('draw_polygon');
            this.startDrawing();
        }
        if (environment.hidePOIs === true) {
            // Hide map data if required
            map.setLayoutProperty('poi-label', 'visibility', 'none');
        }
        if (environment.hideStreetLabels === true) {
            map.setLayoutProperty('road-label-simple', 'visibility', 'none');
        }
    }

    addCustomBuildings(): void {
        if (this.mapBuildingData) {
            this.mapBuildingData.resetFeatureArray();
            this.buildings?.forEach((building) => {
                if (building.buildingPolygonJson) {
                    const shapeCoordinates: GeoJSON.Position[][] = building.buildingPolygonJson as any;
                    this.mapBuildingData.addFeature(
                        false,
                        building.id.toString(),
                        {
                            type: 'Polygon',
                            coordinates: shapeCoordinates,
                        },
                        {
                            id: building.id,
                        }
                    );
                }
            });
        }
    }

    flyToLocation(latitude: number, longitude: number, padding: number = 0): void {
        if (this.map && latitude && longitude) {
            this.map.once('moveend', () => {
                this.flyToBuildingComplete.emit();
            });
            this.map.flyTo({
                center: [longitude, latitude],
                essential: true,
                speed: 0.475,
                curve: 2.0,
                zoom: 19,
                padding: {
                    top: 0,
                    right: this.overviewPanelWidth,
                    bottom: this.analyticsPanelHeight,
                    left: 0,
                },
            });
        }
    }

    onZoomIn(): void {
        this.map?.zoomIn();
    }
    onZoomOut(): void {
        this.map?.zoomOut();
    }
    onCenterMap(): void {
        if (this.selectedLocation) {
            const lat = this.selectedLocation.coordLongitude;
            const lng = this.selectedLocation.coordLatitude;
            const coordinates = this.map.project([lat, lng]);
            this.centeredCoordinates = this.map.unproject([
                coordinates.x + this.overviewPanelWidth,
                coordinates.y + this.analyticsPanelHeight,
            ]);

            this.map.setCenter([this.centeredCoordinates.lng, this.centeredCoordinates.lat]);
            this.map.flyTo({
                center: this.centeredCoordinates,
                essential: true,
                zoom: this.initialZoomLevel,
            });
        }
    }

    disableRotate(): void {
        // disable map rotation using right click + drag
        this.map.dragRotate.disable();
        // disable map rotation using touch rotation gesture
        this.map.touchZoomRotate.disableRotation();
    }

    addDrawingTools(): void {
        this.draw = new MapboxDraw({
            displayControlsDefault: false,
        });
        this.map.addControl(this.draw);
        this.map.on('draw.create', (e) => {
            const x = this.draw.getAll();
            const polygon = x.features[0].geometry as GeoJSON.Polygon;
            if (polygon?.coordinates) {
                this.currentPolygon = polygon;
                // this.drawingComplete.emit();
            }
        });
        this.map.on('draw.update', (e) => {
            const x = this.draw.getAll();
            const polygon = x.features[0].geometry as GeoJSON.Polygon;
            if (polygon?.coordinates) {
                this.currentPolygon = polygon;
                // this.drawingComplete.emit();
                // this.isDrawing = false;
            }
        });
        if (this.isEditingBuildingShape || this.isEditingRegionShape) {
            this.startDrawing();
        }
    }

    onDeleteDrawing(): void {
        this.draw.trash();
        if (this.draw.getAll().features?.length === 0) {
            this.currentPolygon = undefined;
        }
    }
    startDrawing(): void {
        this.isDrawing = true;
        this.draw?.changeMode('draw_polygon');
        if (this.map && this.mapRegionData) {
            if (this.isEditingRegionShape && this.selectedRegion?.regionPolygon) {
                // const region = this.draw.add({
                //   type: 'Polygon',
                //   coordinates: [this.selectedRegion.regionPolygon],
                // });
                // const regionFeature = this.draw.getAll().features[0];
                // this.draw.changeMode('simple_select', { featureIds: region });
                // Display the region within the viewport
                if (this.selectedRegion.regionPolygon?.length > 0) {
                    this.showRegionPreview(this.selectedRegion.regionPolygon);
                    this.zoomToPolygon(this.selectedRegion.regionPolygon, 300, [40, 0]);
                } else if (this.selectedRegion.buildingLatitude && this.selectedRegion.buildingLongitude) {
                    this.flyToLocation(this.selectedRegion.buildingLatitude, this.selectedRegion.buildingLongitude);
                }
            }
        }
    }
    onEditBuildingSave(): void {
        if (this.selectedBuilding) {
            const shapeCoordinates: number[][] = this.currentPolygon?.coordinates as any;
            if (shapeCoordinates) {
                this.confirmationService.confirm({
                    key: 'buildingShapeConfirmation',
                    message: `Are you sure that you want to update ${this.selectedBuilding.buildingName}'s shape?`,
                    header: 'Confirmation',
                    acceptButtonStyleClass: 'p-mr-0',
                    acceptIcon: 'fal fa-check',
                    rejectIcon: 'fal fa-times',
                    accept: () => {
                        this.updateBuildingShape.emit(shapeCoordinates);
                        this.drawingComplete.emit();
                    },
                    reject: (type: ConfirmEventType) => {
                        switch (type) {
                            case ConfirmEventType.REJECT:
                                console.log('rejected');
                                break;
                            case ConfirmEventType.CANCEL:
                                console.log('cancelled');
                                break;
                        }
                    },
                });
            }
        }
    }

    onEditRegionSave(): void {
        if (this.selectedRegion) {
            const shapeCoordinates: number[][][] = this.currentPolygon?.coordinates as any;
            if (shapeCoordinates) {
                this.confirmationService.confirm({
                    key: 'buildingShapeConfirmation',
                    message: `Are you sure that you want to update ${this.selectedRegion.regionName}'s shape?`,
                    header: 'Confirmation',
                    acceptButtonStyleClass: 'p-mr-0',
                    acceptIcon: 'fal fa-check',
                    rejectIcon: 'fal fa-times',
                    accept: () => {
                        this.updateRegionShape.emit(shapeCoordinates[0]);
                        this.drawingComplete.emit();
                    },
                    reject: (type: ConfirmEventType) => {
                        switch (type) {
                            case ConfirmEventType.REJECT:
                                console.log('rejected');
                                break;
                            case ConfirmEventType.CANCEL:
                                console.log('cancelled');
                                break;
                        }
                    },
                });
            }
        }
    }
    onCancelDrawing(): void {
        this.cancelUpdateRegionShape.emit();
        this.mapRegionData.addFeature(true, 'region', {
            type: 'Polygon',
            coordinates: [],
        });
        this.drawingComplete.emit();
        this.isDrawing = false;
        this.isEditingBuildingShape = false;
        this.isEditingRegionShape = false;
        this.draw?.trash();
    }

    addBuildingData(): void {
        this.mapBuildingData = new MapViewDataSource(this.map, 'buildings');
        this.mapBuildingData.addDataSource();
        this.mapBuildingData.addLayer('customBuildings', 'fill-extrusion', {
            'fill-extrusion-opacity': 0.3,
            'fill-extrusion-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#57517b', '#a9a4c1'],
            'fill-extrusion-height': ['number', ['get', 'height'], 3],
            'fill-extrusion-base': ['number', ['get', 'min_height'], 0],
        });
        this.addCustomBuildings();
        // let plan1 = [
        //   [
        //     [-83.33935886011474, 36.114052145044894],
        //     [-83.34014901131403, 36.113538661106105],
        //     [-83.33940393949328, 36.11304554139731],
        //     [-83.3379092876988, 36.11263804597093],
        //     [-83.33790357156333, 36.11335061598983],
        //     [-83.33968583939483, 36.113457030509224],
        //     [-83.33982404553778, 36.11348560211005],
        //     [-83.33992050914402, 36.11353470141232],
        //     [-83.33981350653184, 36.11358308975351],
        //     [-83.33968717992234, 36.1136152762856],
        //     [-83.33790060755503, 36.11372830725743],
        //     [-83.33790282625036, 36.114473874385354],
        //     [-83.33935886011474, 36.114052145044894],
        //   ],
        // ];
        // console.log(JSON.stringify(plan1));
    }

    addRegionData(): void {
        this.mapRegionData = new MapViewDataSource(this.map, 'region');
        this.mapRegionData.addDataSource();
        // Fill layer
        this.mapRegionData.addLayer('region', 'fill', {
            'fill-color': '#ff0000',
            'fill-opacity': 0.25,
        });
        // Outline layer
        this.mapRegionData.addLayer('regionOutline', 'line', {
            'line-width': 4,
            'line-color': 'rgba(255,0,0,0.5)',
        });
    }

    addAccessPointData(): void {
        this.map.loadImage('/assets/img/access-point.png', (error, image) => {
            if (error) {
                throw error;
            }
            // Add the image to the map style.
            if (image && !this.apIconImageInitialized) {
                this.apIconImageInitialized = true;
                this.map.addImage('accessPointImage', image);
            }
            this.mapAccessPointData = new MapViewDataSource(this.map, 'accessPointSource');
            this.mapAccessPointData.addDataSource(true, 17, 50);
            // Symbol layer
            this.mapAccessPointData.addLayer(
                'accessPoints',
                'symbol',
                {
                    'icon-color': '#ffffff',
                },
                {
                    'icon-image': 'accessPointImage',
                    'icon-size': {
                        base: 0.025,
                        stops: [
                            [18, 0.01],
                            [20, 0.02],
                            [22, 0.03],
                        ],
                    },
                }
            );
            this.mapAccessPointData.addLayer('accessPointOutlines', 'circle', {
                'circle-color': 'transparent',
                'circle-radius': {
                    base: 1.75,
                    stops: [
                        [18, 8],
                        [18, 2],
                        [20, 4],
                        [22, 10],
                    ],
                },
                'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 4, 2],
                'circle-stroke-color': '#F7FFD7',

                'circle-stroke-opacity': {
                    default: 0.25,
                    stops: [
                        [18, 1],
                        [18, 0],
                    ],
                },
            });
            // Add a cluster layer to display number of access points when zoomed out
            // if (this.showClusters) {
            this.mapAccessPointData.addLayer(
                'accessPointClusters',
                'symbol',
                {
                    'text-color': '#F7FFD7',
                },
                {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['Arial Unicode MS Bold'],
                    'text-size': 12,
                }
            );
            // }
        });
    }

    addDeviceData(deviceDetails: DeviceMapboxDetails, existingDataSource?: MapViewDataSource): MapViewDataSource {
        if (existingDataSource !== undefined) {
            this.map.removeLayer(deviceDetails.heatmapName);
            this.map.removeLayer(deviceDetails.layers[0]);
            this.map.removeLayer(deviceDetails.layers[1]);
            this.map.removeSource(deviceDetails.sourceName);
        }
        const dataSource = new MapViewDataSource(this.map, deviceDetails.sourceName);
        dataSource.addDataSource(this.showClusters ? this.showClusters : false, 24, 2);
        dataSource.addLayer(deviceDetails.heatmapName, 'heatmap', {
            // increase intensity as zoom level increases
            'heatmap-intensity': {
                stops: [
                    [16, 0.5],
                    [24, 1],
                ],
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(' + deviceDetails.heatmapColorRGB + ',0)',
                0.25,
                'rgba(' + deviceDetails.heatmapColorRGB + ',0.5)',
                0.5,
                'rgba(' + deviceDetails.heatmapColorRGB + ',0.75)',
                0.8,
                'rgb(' + deviceDetails.heatmapColorRGB + ')',
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
                stops: [
                    [16, 20],
                    [24, 60],
                ],
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
                default: 0.25,
                stops: [
                    [16, 0.4],
                    [20, 0.1],
                    [22, 0],
                ],
            },
        });

        dataSource.addLayer(
            deviceDetails.layers[0],
            'circle',
            {
                'circle-color': deviceDetails.circleColor,
                'circle-opacity': deviceDetails.circleOpacity,
                'circle-radius': {
                    base: deviceDetails.circleRadius,
                    stops: [
                        [16, deviceDetails.circleRadius],
                        [20, deviceDetails.circleRadius * 2],
                        [22, deviceDetails.circleRadius * 3],
                    ],
                },
            },
            null,
            ['!', ['has', 'point_count']]
        );

        dataSource.addLayer(
            deviceDetails.layers[1],
            'circle',
            {
                'circle-color': deviceDetails.circleColor,
                'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, deviceDetails.circleOpacity],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    deviceDetails.circleRadius * 3,
                    5,
                    deviceDetails.circleRadius * 6,
                    10,
                    deviceDetails.circleRadius * 9,
                    20,
                    deviceDetails.circleRadius * 12,
                    100,
                    deviceDetails.circleRadius * 16,
                ],
            },
            null,
            ['has', 'point_count']
        );
        return dataSource;
    }

    showRegionPreview(region: number[][]): void {
        if (this.map && region && this.mapRegionData) {
            this.mapRegionData.addFeature(true, 'region', {
                type: 'Polygon',
                coordinates: [region],
            });
        }
    }

    toggleClusters(): void {
        // If the source already exists, update the data in it
        const deviceLayers = [
            { dataSource: this.mapLiveDeviceData, details: this.liveDeviceDetails },
            {
                dataSource: this.mapStaticDeviceData,
                details: this.staticDeviceDetails,
            },
        ];
        const style = this.map.getStyle();

        if (this.mapLiveDeviceData.dataSource && style.sources) {

            const clusterSource: any = style.sources[this.mapLiveDeviceData.dataSourceName];
            clusterSource.cluster = this.showClusters;
            this.map.setStyle(style);
        }
        this.mapLiveDeviceData = this.addDeviceData(this.liveDeviceDetails, this.mapLiveDeviceData);

        if (this.mapStaticDeviceData.dataSource && style.sources) {
            const clusterSource: any = style.sources[this.mapStaticDeviceData.dataSourceName];
            clusterSource.cluster = this.showClusters;
            this.map.setStyle(style);
        }
        this.mapStaticDeviceData = this.addDeviceData(this.staticDeviceDetails, this.mapStaticDeviceData);
        // deviceLayers.forEach((deviceLayer) => {
        //   if (deviceLayer.dataSource.dataSource && style.sources) {
        //     const clusterSource: any =
        //       style.sources[deviceLayer.dataSource.dataSourceName];
        //     clusterSource.cluster = this.showClusters;
        //     this.map.setStyle(style);
        //   }
        //   this.addDeviceData(deviceLayer.details, deviceLayer.dataSource);
        // });

        this.addDevices();
        console.log(this.showClusters);
    }
    toggleDevices(): void {
        if (!this.showDevices) {
            this.mapLiveDeviceData.hideAllLayers();
        } else {
            this.mapLiveDeviceData.showAllLayers();
            this.addDevices();
        }
    }
    toggleAccessPoints(): void {
        if (!this.showAccessPoints) {
            this.mapAccessPointData.hideAllLayers();
        } else {
            this.mapAccessPointData.showAllLayers();
        }
        this.addAccessPointsToMap();
    }
    toggleIOT(): void {
        if (!this.showStaticDevices) {
            this.mapStaticDeviceData.hideAllLayers();
        } else {
            this.addDevices();
            this.mapStaticDeviceData.showAllLayers();
        }
    }

    /** Zoom to a specific polygon's coordinates and fit within the viewport */
    zoomToPolygon(polygon: number[][], padding: number = 300, offset: mapboxgl.PointLike = [0, 0]): void {
        const firstCoord = new mapboxgl.LngLat(polygon[0][0], polygon[0][1]);
        // Create a 'LngLatBounds' with both corners at the first coordinate.
        const bounds = new mapboxgl.LngLatBounds(firstCoord, firstCoord);
        // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
        for (const coord of polygon) {
            bounds.extend(new mapboxgl.LngLat(coord[0], coord[1]));
        }
        this.map.fitBounds(bounds, {
            padding,
            offset,
        });
        // this.flyToLocation(bounds.getCenter().lat, bounds.getCenter().lng, 500);
    }
    /** Add all access points to map */
    addAccessPointsToMap(): void {
        if (this.map && this.showAccessPoints === true && this.accessPoints && this.accessPoints.length > 0) {
            this.mapAccessPointData.resetFeatureArray();
            this.accessPoints.forEach((accessPoint) => {
                this.mapAccessPointData.addFeature(
                    false,
                    accessPoint.id.toString(),
                    {
                        type: 'Point',
                        coordinates: [accessPoint.coordLongitude, accessPoint.coordLatitude],
                    },
                    {
                        id: accessPoint.id,
                        name: accessPoint.name,
                    }
                );
            });
            if (this.map.getLayer(this.liveDeviceDetails.heatmapName)) {
                this.map.moveLayer(this.liveDeviceDetails.heatmapName, 'accessPoints');
            }
            if (this.map.getLayer(this.liveDeviceDetails.id)) {
                this.map.moveLayer(this.liveDeviceDetails.id, 'accessPoints');
            }
        }
    }

    /** Add all devices to map */
    addDevices(): void {

        if (this.map && this.devices) {
            const liveDevices = this.devices.filter((d) => !d.fixedPosition);

            if (this.showDevices) {
                this.addDevicesToMap(liveDevices, this.liveDeviceDetails, this.mapLiveDeviceData);
            }

            if (this.showStaticDevices) {
                const staticDevices = this.devices.filter((d) => d.fixedPosition);
                this.addDevicesToMap(staticDevices, this.staticDeviceDetails, this.mapStaticDeviceData);
            }

        }
    }

    /** Add SSID filtered devices to map */
    addSSIDFilterDevices(): void {

        if (this.map && this.devices) {
            const liveDevices = this.devices.filter((d) => !d.fixedPosition);

            const filteredLiveDevices = liveDevices.filter((el: any) => {
                return this.filterBySSID?.some((f) => {
                    return f === el.ssid;
                });
            });


            const staticDevices = this.devices.filter((d) => d.fixedPosition);

            const filteredStaticDevices = staticDevices.filter((el: any) => {
                return this.filterBySSID?.some((f) => {
                    return f === el.ssid;
                });
            });

            if(this.showStaticDevices){
                this.addDevicesToMap(filteredStaticDevices, this.staticDeviceDetails, this.mapStaticDeviceData);

            }

            if(this.showDevices){
                this.addDevicesToMap(filteredLiveDevices, this.liveDeviceDetails, this.mapLiveDeviceData);

            }

        }
    }

    addDevicesToMap(devices: Device[], deviceDetails: DeviceMapboxDetails, dataSource?: MapViewDataSource): void {
        if (dataSource) {
            // Add an image to use as a custom marker
            const pointArr: any[] = [];
            if (devices.length > 0) {
                devices.forEach((device) => {
                    pointArr.push({
                        type: 'Feature',
                        id: device.deviceratId,
                        geometry: {
                            type: 'Point',
                            coordinates: [device.longitude, device.latitude],
                        },
                        properties: {
                            id: device.deviceratId,
                        },
                    });
                });
            }
            dataSource.updateData(pointArr);

            if (this.map.getLayer('accessPoints')) {
                deviceDetails.layers.forEach((layer) => {
                    if (this.map.getLayer(layer)) {
                        this.map.moveLayer(layer, 'accessPoints');
                    }
                });
                this.map.moveLayer(deviceDetails.heatmapName, 'accessPoints');
            }
        }
    }

    isTenantBuilding(mapboxId: number): boolean {
        return this.buildings?.find((e) => e.mapboxId === mapboxId) !== undefined;
    }
    isFeatureBuilding(feature: MapboxGeoJSONFeature): boolean {
        return feature.layer.id.toString() === '3d-buildings';
    }
    isFeatureAccessPoint(feature: MapboxGeoJSONFeature): boolean {
        return feature.layer.id.toString() === 'accessPoints';
    }
    isFeatureDeviceCluster(feature: MapboxGeoJSONFeature): boolean {
        return feature.layer.id.toString() === 'device-clusters';
    }
    isFeatureStaticDeviceCluster(feature: MapboxGeoJSONFeature): boolean {
        return feature.layer.id.toString() === 'static-clusters';
    }

    mapMouseMove(event: any): void {
        if (this.map) {
            this.map.getCanvasContainer().style.cursor = 'default';
            const features = this.map?.queryRenderedFeatures(event.point);
            const selectedBuilding = this.highlightedBuildings.find((building) => building.id === this.selectedBuilding?.mapboxId);
            for (const building of this.highlightedBuildings) {
                if (building && building.id !== selectedBuilding?.id) {
                    this.map.setFeatureState(building, {
                        source: building.source,
                        sourceLayer: building.sourceLayer,
                        id: building.id,
                        hover: false,
                    });
                }
            }
            this.highlightedBuildings = [];
            if (selectedBuilding) {
                this.highlightedBuildings.push(selectedBuilding);
            }
            if (this.hoveredAccessPointId) {
                this.map.removeFeatureState({
                    source: this.mapAccessPointData.dataSourceName,
                    id: this.hoveredAccessPointId,
                });
            }
            if (this.hoveredDevice) {
                this.map.removeFeatureState({
                    source: this.liveDeviceDetails.sourceName,
                    id: this.hoveredDevice.id,
                });
                this.hoveredDevice = undefined;
            }
            if (this.hoveredDevice) {
                this.map.removeFeatureState({
                    source: this.staticDeviceDetails.sourceName,
                    id: this.hoveredDevice['id'],
                });
                this.hoveredDevice = undefined;
            }
            if (features) {
                features.some((feature) => {
                    if (feature) {
                        if (this.isFeatureDeviceCluster(feature)) {
                            this.map.getCanvasContainer().style.cursor = 'pointer';
                            this.hoveredDevice = feature;
                            this.map.setFeatureState(
                                {
                                    source: this.liveDeviceDetails.sourceName,
                                    id: feature.id,
                                },
                                {
                                    hover: true,
                                }
                            );
                            if (feature.geometry.type === 'Point') {
                                this.selectedPosition = feature.geometry.coordinates;
                            }
                            return true;
                        } else if (this.isFeatureStaticDeviceCluster(feature)) {
                            this.map.getCanvasContainer().style.cursor = 'pointer';
                            this.hoveredDevice = feature;
                            this.map.setFeatureState(
                                {
                                    source: this.staticDeviceDetails.sourceName,
                                    id: feature.id,
                                },
                                {
                                    hover: true,
                                }
                            );
                            if (feature.geometry.type === 'Point') {
                                this.selectedPosition = feature.geometry.coordinates;
                            }
                            return true;
                        } else if (this.isFeatureAccessPoint(feature)) {
                            this.map.getCanvasContainer().style.cursor = 'pointer';
                            this.hoveredAccessPointId = feature.id;
                            this.map.setFeatureState(
                                {
                                    source: this.mapAccessPointData.dataSourceName,
                                    id: feature.id,
                                },
                                {
                                    hover: true,
                                }
                            );
                            return true;
                        } else if (this.isFeatureBuilding(feature) && feature.id) {
                            if (this.isTenantBuilding(+feature.id)) {
                                this.map.getCanvasContainer().style.cursor = 'pointer';
                                if (this.highlightedBuildings.find((e) => e === feature) == null) {
                                    this.highlightedBuildings.push(feature);
                                    this.map.setFeatureState(feature, {
                                        source: feature.source,
                                        sourceLayer: feature.sourceLayer,
                                        id: feature.id,
                                        hover: true,
                                    });
                                }
                            }
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
    }
    mapClick(event: any): void {
        const features = this.map.queryRenderedFeatures(new Point(event.point.x, event.point.y));
        features.some((feature) => {
            if (!this.isDrawing) {
                console.log(feature);
            }
            if (feature) {
                if (this.isFeatureDeviceCluster(feature)) {
                    const clusterId = feature.properties?.cluster_id;
                    const clusterSource = this.map.getSource(this.liveDeviceDetails.sourceName) as mapboxgl.GeoJSONSource;
                    clusterSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                        if (err) {
                            return;
                        }

                        if (feature.geometry.type === 'Point') {
                            const coordinates = feature.geometry.coordinates.slice() as mapboxgl.LngLatLike;
                            this.map.easeTo({
                                center: coordinates,
                            });
                        }
                    });

                } else if (this.isFeatureAccessPoint(feature)) {
                    // Check if this is a cluster of access points
                    if (feature.properties?.cluster && this.mapAccessPointData.dataSource) {
                        this.mapAccessPointData.dataSource.getClusterLeaves(
                            feature.properties.cluster_id,
                            feature.properties.point_count,
                            0,
                            (err, aFeatures) => {
                                // build the bounding box with the selected points coordinates
                                const bounds = new mapboxgl.LngLatBounds();
                                aFeatures.forEach((feature2) => {
                                    if (feature2.geometry.type === 'Point') {
                                        const coordinates = feature2.geometry.coordinates.slice() as mapboxgl.LngLatLike;
                                        bounds.extend(coordinates);
                                    }
                                });
                                // Move the map to fit the Bounding Box (BBox)
                                return this.map.fitBounds(bounds, {
                                    padding: 45, // orig 45
                                    maxZoom: 20,
                                });
                            }
                        );
                    } else if (feature.geometry.type === 'Point') {
                        console.log(feature.geometry.coordinates);
                        this.selectedPosition = feature.geometry.coordinates;
                        this.clickedAccessPoint.emit(+feature.properties?.id);
                    }
                    return true;
                } else if (this.isFeatureBuilding(feature) && feature.id) {
                    console.log('building', feature);
                    console.log(feature.id);
                    console.log(feature.geometry); // feature.geometry getter returns building shape points (basement)
                    console.log('height', feature?.properties?.height); // this is the building height
                    this.clickedBuildingId.emit(+feature.id);
                    return true;
                }
            }
            return false;
        });
    }
}
