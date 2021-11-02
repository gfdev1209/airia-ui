import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike, Map, MapboxGeoJSONFeature, Point } from 'mapbox-gl';
import {
  AccessPoint,
  Alert,
  Building,
  Device,
  Floor,
  Location,
} from '../../models';
import { environment } from 'src/environments/environment';
import { DeviceMapboxDetails } from '@map/models/device-mapbox-details.model';
import Helpers from '@core/utils/helpers';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnChanges {
  @Input() locations: Location[] | null = [];
  @Input() selectedLocation: Location | null = null;
  @Input() buildings: Building[] | null = [];
  @Input() selectedBuilding?: Building | null;
  @Input() selectedFloor?: Floor | null;
  @Input() accessPoints: AccessPoint[] | null = [];
  @Input() devices: Device[] | null = [];
  @Input() deviceLoading: boolean | null = false;
  @Input() selectedAccessPoint?: AccessPoint | null;
  @Input() showDevices?: boolean | null = true;
  @Input() showStaticDevices?: boolean | null = true;
  @Input() showAccessPoints?: boolean | null = true;

  @Input() selectedAlert?: Alert | null;
  @Input() regionPolygon?: number[][] | null;

  @Input() showBuildingOverview: boolean | null = false;

  @Output() flyToBuildingComplete = new EventEmitter();
  @Output() clickedBuildingId = new EventEmitter<number>();
  @Output() clickedAccessPoint = new EventEmitter<number>();

  // Reference to the MapBox map component
  map!: Map;
  // A stored list of all buildings that are highlighted to enable/disable hover effect in MapBox
  highlightedBuildings: MapboxGeoJSONFeature[] = [];
  // Position of the selected feature (coordinates set in object do not match for some reason)
  selectedPosition?: number[];
  // The ID of the access point or building that the user is hovering over (stored to display hover effect)
  hoveredAccessPointId?: any;
  hoveredBuildingId?: any;
  // Whether the access point image has been initialized. Prevents initializing multiple times.
  apIconImageInitialized = false;
  // The initial zoom level to display the map
  initialZoomLevel: number = environment.zoomLevel ? environment.zoomLevel : 20;
  // Device display settings for mapbox
  liveDeviceDetails: DeviceMapboxDetails = {
    id: 'devices',
    sourceName: 'devices-source',
    heatmapName: 'devices-heatmap',
    circleColor: '#00c1ff',
    circleRadius: 2,
    heatmapColorRGB: '2, 185, 251',
  };
  staticDeviceDetails: DeviceMapboxDetails = {
    id: 'staticDevices',
    sourceName: 'static-devices-source',
    heatmapName: 'static-devices-heatmap',
    circleColor: '#c702fb',
    circleRadius: 2,
    heatmapColorRGB: '199, 2, 251',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBuilding?.currentValue) {
      this.flyToLocation(
        changes.selectedBuilding.currentValue.coordLatitude,
        changes.selectedBuilding.currentValue.coordLongitude
      );
    }
    if (
      changes.accessPoints?.firstChange === false &&
      changes.accessPoints.currentValue.toString() !==
        changes.accessPoints.previousValue.toString()
    ) {
      this.addAccessPoints();
    }
    if (changes.devices?.firstChange === false) {
      this.addDevices();
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
    if (changes.showStaticDevices?.firstChange === false) {
      this.toggleIOT();
    }
    if (changes.regionPolygon?.firstChange === false) {
      console.log('show region', changes.regionPolygon.currentValue);
      let regionCoordinates = [];
      if (changes.regionPolygon.currentValue) {
        regionCoordinates = changes.regionPolygon.currentValue;
      }
      this.addRegionPreview(regionCoordinates);
    }
  }

  flyToLocation(
    latitude: number,
    longitude: number,
    padding: number = 0
  ): void {
    if (latitude && longitude) {
      this.map.once('moveend', () => {
        this.flyToBuildingComplete.emit();
      });
      this.map.flyTo({
        center: [longitude, latitude],
        essential: true,
        speed: 0.475,
        curve: 2.0,
        zoom: 19,
        padding,
      });
    }
  }

  onZoomIn(): void {
    this.map?.zoomIn();
  }
  onZoomOut(): void {
    this.map?.zoomOut();
  }

  toggleAccessPoints(): void {
    const visibility = this.showAccessPoints ? 'visible' : 'none';
    this.map.setLayoutProperty('access-points', 'visibility', visibility);
    this.map.setLayoutProperty(
      'access-points-circles',
      'visibility',
      visibility
    );
    this.map.setLayoutProperty(
      'access-point-clusters',
      'visibility',
      visibility
    );
  }

  toggleDevices(): void {
    const visibility = this.showDevices ? 'visible' : 'none';
    this.map.setLayoutProperty(
      this.liveDeviceDetails.id,
      'visibility',
      visibility
    );
    if (this.liveDeviceDetails.heatmapName) {
      this.map.setLayoutProperty(
        this.liveDeviceDetails.heatmapName,
        'visibility',
        visibility
      );
    }
  }
  toggleIOT(): void {
    const visibility = this.showStaticDevices ? 'visible' : 'none';
    this.map.setLayoutProperty(
      this.staticDeviceDetails.id,
      'visibility',
      visibility
    );
    if (this.staticDeviceDetails.heatmapName) {
      this.map.setLayoutProperty(
        this.staticDeviceDetails.heatmapName,
        'visibility',
        visibility
      );
    }
  }

  mapLoad(map: Map): void {
    this.map = map;
    if (environment.hidePOIs === true) {
      map.setLayoutProperty('poi-label', 'visibility', 'none');
    }
    if (environment.hideStreetLabels === true) {
      map.setLayoutProperty('road-label-simple', 'visibility', 'none');
    }
    this.disableRotate();
    this.addAccessPoints();
    this.addDevices();
    this.addBuildingLayers();
  }
  disableRotate(): void {
    // disable map rotation using right click + drag
    this.map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();
  }
  addBuildingLayers(): void {
    if (this.map) {
      const dataSource = 'region';
      // Add a data source containing GeoJSON data.
      this.map.addSource(dataSource, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [],
          },
        },
      });
      // Add a new layer to visualize the polygon.
      this.map.addLayer({
        id: dataSource,
        type: 'fill',
        source: dataSource, // reference the data source
        layout: {},
        paint: {
          'fill-color': '#ff0000', // blue color fill
          'fill-opacity': 0.25,
        },
      });
      this.map.addLayer({
        id: 'region-outline',
        type: 'line',
        source: dataSource, // reference the data source
        paint: {
          'line-width': 4,
          'line-color': 'rgba(255,0,0,0.5)',
        },
      });
      // this.map.addLayer({
      //   id: 'building-outline',
      //   type: 'line',
      //   source: 'composite',
      //   'source-layer': 'building',
      //   paint: {
      //     'line-width': 2,
      //     'line-color': [
      //       'case',
      //       ['boolean', ['feature-state', 'hover'], false],
      //       'rgba(159,100,209,1.0)',
      //       'rgba(255,255,255,0.0)',
      //     ],
      //   },
      // });
      // this.map.addLayer({
      //   id: '3d-buildings',
      //   type: 'fill',
      //   source: 'composite',
      //   'source-layer': 'building',
      //   paint: {
      //     'fill-outline-color': 'rgba(0,0,0,0)',
      //     // 'fill-color': 'rgba(0,0,0,0)',
      //     'fill-color': [
      //       'case',
      //       ['boolean', ['feature-state', 'hover'], false],
      //       'rgba(159,100,209,0.3)',
      //       'rgba(255,255,255,0.0)',
      //     ],
      //     'fill-opacity': 1.0,
      //   },
      // });
      // this.map.addSource('lakeway-source', {
      //   type: 'vector',
      //   // Use any Mapbox-hosted tileset using its tileset id.
      //   // Learn more about where to find a tileset id:
      //   // https://docs.mapbox.com/help/glossary/tileset-id/
      //   url: 'mapbox://mikeairia.ckt7rxi4p0ypm27ryrt2admx3-5i7zf',
      // });
      // this.map.addLayer({
      //   id: 'lakeway-layer',
      //   type: 'line',
      //   source: 'lakeway-source',
      //   'source-layer': 'Lakeway_Christian_Academy',
      //   layout: {
      //     'line-join': 'round',
      //     'line-cap': 'round',
      //   },
      //   paint: {
      //     'line-color': '#ff69b4',
      //     'line-width': 1,
      //   },
      // });
    }
  }
  addRegionPreview(region: number[][]): void {
    if (this.map && region) {
      // Add a GeoJSON source with all devices
      const regionSource = this.map.getSource(
        'region'
      ) as mapboxgl.GeoJSONSource;
      if (regionSource) {
        regionSource.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [region],
          },
        });
        const coordinates = region;
        const firstCoord = new mapboxgl.LngLat(region[0][0], region[0][1]);
        // Create a 'LngLatBounds' with both corners at the first coordinate.
        const bounds = new mapboxgl.LngLatBounds(firstCoord, firstCoord);
        // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
        for (const coord of coordinates) {
          bounds.extend(new mapboxgl.LngLat(coord[0], coord[1]));
        }
        this.map.fitBounds(bounds, {
          padding: 300,
          offset: [45, 0],
        });
        // this.flyToLocation(bounds.getCenter().lat, bounds.getCenter().lng, 500);
      }
    }
  }
  /** Add all access points to map */
  addAccessPoints(): void {
    if (this.map && this.accessPoints && this.accessPoints.length > 0) {
      this.map.loadImage('/assets/img/access-point.png', (error, image) => {
        if (error) {
          throw error;
        }
        // Add the image to the map style.
        if (image && !this.apIconImageInitialized) {
          this.apIconImageInitialized = true;
          this.map.addImage('accessPointImage', image);
        }
        // Add an image to use as a custom marker
        const pointArr: any[] = [];
        if (this.accessPoints) {
          this.accessPoints.forEach((accessPoint) => {
            pointArr.push({
              type: 'Feature',
              id: accessPoint.id,
              geometry: {
                type: 'Point',
                coordinates: [
                  accessPoint.coordLongitude,
                  accessPoint.coordLatitude,
                ],
              },
              properties: {
                id: accessPoint.id,
                name: accessPoint.name,
              },
            });
          });
        }
        // Add a GeoJSON source with all devices
        const accessPointSource = this.map.getSource(
          'access-point-source'
        ) as mapboxgl.GeoJSONSource;
        // If the source already exists, update the data in it
        if (accessPointSource) {
          accessPointSource.setData({
            type: 'FeatureCollection',
            features: pointArr,
          });
        } else {
          // Add a GeoJSON source with all access points
          this.map.addSource('access-point-source', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: pointArr,
            },
            cluster: true,
            clusterMaxZoom: 17, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
          });

          // Add access point layer
          this.map.addLayer({
            id: 'access-points',
            type: 'symbol',
            source: 'access-point-source',
            layout: {
              'icon-image': 'accessPointImage',
              'icon-size': {
                base: 0.025,
                stops: [
                  [18, 0.01],
                  [20, 0.02],
                  [22, 0.03],
                ],
              },
            },
            paint: {
              'icon-color': '#ffffff',
            },
          });

          // Add access point layer
          this.map.addLayer({
            id: 'access-points-circles',
            type: 'circle',
            source: 'access-point-source',
            paint: {
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
              'circle-stroke-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                4,
                2,
              ],
              'circle-stroke-color': '#F7FFD7',

              'circle-stroke-opacity': {
                default: 0.25,
                stops: [
                  [18, 1],
                  [18, 0],
                ],
              },
            },
          });

          // Add a cluster layer to display number of access points when zoomed out
          this.map.addLayer({
            id: 'access-point-clusters',
            type: 'symbol',
            source: 'access-point-source',
            filter: ['has', 'point_count'],
            paint: {
              'text-color': '#F7FFD7',
            },
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['Arial Unicode MS Bold'],
              'text-size': 12,
            },
          });

          if (this.map.getLayer(this.liveDeviceDetails.heatmapName)) {
            this.map.moveLayer(
              this.liveDeviceDetails.heatmapName,
              'access-points'
            );
          }
          if (this.map.getLayer(this.liveDeviceDetails.id)) {
            this.map.moveLayer(this.liveDeviceDetails.id, 'access-points');
          }
        }
      });
    }
  }

  /** Add all devices to map */
  addDevices(): void {
    if (this.map && this.devices) {
      const staticDevices = Helpers.filterArrayBy<Device>(
        this.devices,
        'ssid',
        'iot',
        true
      );
      if (staticDevices) {
        this.addDevicesToMap(staticDevices, this.staticDeviceDetails);
      }
      const liveDevices = Helpers.filterArrayBy<Device>(
        this.devices,
        'ssid',
        'iot',
        false
      );
      if (liveDevices) {
        this.addDevicesToMap(liveDevices, this.liveDeviceDetails);
      }
    }
  }

  addDevicesToMap(devices: Device[], deviceDetails: DeviceMapboxDetails): void {
    // Add an image to use as a custom marker
    const pointArr: any[] = [];
    devices.forEach((device) => {
      pointArr.push({
        type: 'Feature',
        id: device.id,
        geometry: {
          type: 'Point',
          coordinates: [device.longitude, device.latitude],
        },
        properties: {
          id: device.id,
        },
      });
    });
    // Add a GeoJSON source with all devices
    const deviceSource = this.map.getSource(
      deviceDetails.sourceName
    ) as mapboxgl.GeoJSONSource;
    // If the source already exists, update the data in it
    if (deviceSource) {
      deviceSource.setData({
        type: 'FeatureCollection',
        features: pointArr,
      });
    } else {
      this.map.addSource(deviceDetails.sourceName, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: pointArr,
        },
        cluster: false,
        clusterMaxZoom: 17, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      // Add device layer
      this.map.addLayer({
        id: deviceDetails.heatmapName,
        type: 'heatmap',
        source: deviceDetails.sourceName,
        maxzoom: 24,
        paint: {
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
        },
      });
      // Add device layer
      this.map.addLayer({
        id: deviceDetails.id,
        type: 'circle',
        source: deviceDetails.sourceName,
        paint: {
          'circle-color': deviceDetails.circleColor,
          'circle-radius': {
            base: 1,
            stops: [
              [16, deviceDetails.circleRadius],
              [20, deviceDetails.circleRadius * 2],
              [22, deviceDetails.circleRadius * 3],
            ],
          },
        },
      });
    }
    if (this.map.getLayer('access-points')) {
      this.map.moveLayer(deviceDetails.heatmapName, 'access-points');
      this.map.moveLayer(deviceDetails.id, 'access-points');
    }
  }

  isTenantBuilding(mapboxId: number): boolean {
    return this.buildings?.find((e) => e.mapboxId === mapboxId) !== undefined;
  }
  isFeatureBuilding(feature: MapboxGeoJSONFeature): boolean {
    return feature.layer.id.toString() === '3d-buildings';
  }
  isFeatureAccessPoint(feature: MapboxGeoJSONFeature): boolean {
    return feature.layer.id.toString() === 'access-points';
  }

  mapMouseMove(event: any): void {
    if (this.map) {
      this.map.getCanvasContainer().style.cursor = 'default';
      const features = this.map?.queryRenderedFeatures(event.point);
      const selectedBuilding = this.highlightedBuildings.find(
        (building) => building.id === this.selectedBuilding?.mapboxId
      );
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
          source: 'access-point-source',
          id: this.hoveredAccessPointId,
        });
      }
      if (features) {
        features.some((feature) => {
          if (feature) {
            if (this.isFeatureAccessPoint(feature)) {
              this.map.getCanvasContainer().style.cursor = 'pointer';
              this.hoveredAccessPointId = feature.id;
              this.map.setFeatureState(
                {
                  source: 'access-point-source',
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
                if (
                  this.highlightedBuildings.find((e) => e === feature) == null
                ) {
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
    const features = this.map.queryRenderedFeatures(
      new Point(event.point.x, event.point.y)
    );
    features.some((feature) => {
      console.log(feature);
      if (this.isFeatureAccessPoint(feature)) {
        // Check if this is a cluster of access points
        if (feature.properties?.cluster) {
          const clusterSource = this.map.getSource(
            'access-point-source'
          ) as mapboxgl.GeoJSONSource;
          clusterSource.getClusterLeaves(
            feature.properties.cluster_id,
            feature.properties.point_count,
            0,
            (err, aFeatures) => {
              // build the bounding box with the selected points coordinates
              const bounds = new mapboxgl.LngLatBounds();
              aFeatures.forEach((feature2) => {
                if (feature2.geometry.type === 'Point') {
                  const coordinates =
                    feature2.geometry.coordinates.slice() as mapboxgl.LngLatLike;
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
      return false;
    });
  }
}
