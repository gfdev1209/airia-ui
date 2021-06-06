import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Map, MapboxGeoJSONFeature, Point, SymbolLayer } from 'mapbox-gl';
import { of } from 'rxjs';
import { Building, Location } from '../../models';

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
  @Input() showBuildingOverview: boolean | null = false;

  @Output() flyToBuildingComplete = new EventEmitter();
  @Output() clickedBuildingId = new EventEmitter<number>();

  map!: Map;
  highlightedBuildings: MapboxGeoJSONFeature[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBuilding?.currentValue) {
      this.flyToLocation(
        changes.selectedBuilding.currentValue.coordLatitude,
        changes.selectedBuilding.currentValue.coordLongitude
      );
    }
    console.log(changes);
    if (changes.zoomIn?.firstChange === false) {
      this.onZoomIn();
    }
  }

  flyToLocation(latitude: number, longitude: number): void {
    this.map.once('moveend', () => {
      this.flyToBuildingComplete.emit();
    });
    this.map.flyTo({
      center: [longitude, latitude],
      essential: true,
      speed: 0.375,
      curve: 2.0,
      zoom: 18,
    });
  }

  onZoomIn(): void {
    this.map?.zoomIn();
  }
  onZoomOut(): void {
    this.map?.zoomOut();
  }

  mapLoad(map: Map): void {
    this.map = map;
    // map.addLayer(
    //   {
    //     id: '3d-buildings',
    //     source: 'composite',
    //     'source-layer': 'building',
    //     type: 'fill-extrusion',
    //     minzoom: 14,
    //     paint: {
    //       'fill-extrusion-color': [
    //         'case',
    //         ['boolean', ['feature-state', 'hover'], false],
    //         '#9389bf',
    //         '#3a325c',
    //       ],
    //       'fill-extrusion-height': ['number', ['get', 'height'], 5],
    //       'fill-extrusion-base': ['number', ['get', 'min_height'], 30],
    //       'fill-extrusion-opacity': 0.5,
    //     },
    //   },
    //   'building (1) copy'
    // );

    map.addLayer({
      id: 'building-outline',
      type: 'line',
      source: 'composite',
      'source-layer': 'building',
      paint: {
        'line-width': 4,
        'line-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          'rgba(159,100,209,1.0)',
          'rgba(255,255,255,0.0)',
        ],
      },
    });
    map.addLayer({
      id: '3d-buildings',
      type: 'fill',
      source: 'composite',
      'source-layer': 'building',
      paint: {
        'fill-outline-color': 'rgba(0,0,0,0)',
        // 'fill-color': 'rgba(0,0,0,0)',
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          'rgba(159,100,209,0.3)',
          'rgba(255,255,255,0.0)',
        ],
        'fill-opacity': 1.0,
      },
    });
    // if (this.buildings) {
    //   for (const building of this.buildings) {
    //     if (building) {
    //       let source = this.map.queryRenderedFeatures([
    //         building.coordLongitude,
    //         building.coordLatitude,
    //       ]);
    //       console.log(source);
    //       //   this.map.setFeatureState(building, {
    //       //     source: building.source,
    //       //     sourceLayer: building.sourceLayer,
    //       //     id: building.mapboxId,
    //       //     hover: true,
    //       //   });
    //       // }
    //     }
    //   }
    // }
  }
  isTenantBuilding(mapboxId: number): boolean {
    return this.buildings?.find((e) => e.mapboxId === mapboxId) !== undefined;
  }
  isFeatureBuilding(feature: MapboxGeoJSONFeature): boolean {
    return feature.layer.id.toString() === '3d-buildings';
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
      if (features) {
        features.forEach((feature) => {
          if (this.isFeatureBuilding(feature) && feature.id) {
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
          }
        });
      }
    }
  }
  mapClick(event: any): void {
    const features = this.map.queryRenderedFeatures(
      new Point(event.point.x, event.point.y)
    );
    features.forEach((feature) => {
      if (this.isFeatureBuilding(feature) && feature.id) {
        console.log(feature);
        console.log(feature.id);
        console.log(feature.geometry); // feature.geometry getter returns building shape points (basement)
        console.log('height', feature?.properties?.height); // this is the building height
        this.clickedBuildingId.emit(+feature.id);
      }
    });
  }
}
