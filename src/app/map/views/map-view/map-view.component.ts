import { Component, OnInit } from '@angular/core';
import { Map, MapboxGeoJSONFeature, Point, SymbolLayer } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent {
  // UT [center] = '[-85.2974959, 35.0458509]';

  constructor() {}

  map!: Map;
  title = 'Airia';
  highlightedBuildings: MapboxGeoJSONFeature[] = [];
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
    //         '#57517b',
    //         '#3a325c',
    //       ],
    //       'fill-extrusion-height': ['number', ['get', 'height'], 5],
    //       'fill-extrusion-base': ['number', ['get', 'min_height'], 0],
    //       'fill-extrusion-opacity': 1,
    //     },
    //   },
    //   'building (1)'
    // );
  }
  mapMouseMove(event: any): void {
    const features = this.map?.queryRenderedFeatures(event.point);
    if (features) {
      this.map.getCanvasContainer().style.cursor = 'default';
      features.forEach((feature) => {
        // console.log(feature);
        if (this.highlightedBuildings.find((e) => e === feature) == null) {
          this.highlightedBuildings.push(feature);
        }
        this.map.setFeatureState(feature, {
          source: feature.source,
          sourceLayer: feature.sourceLayer,
          id: feature.id,
          hover: true,
        });
      });
    }
  }
  mapClick(event: any): void {
    // console.log(event);
    const features = this.map.queryRenderedFeatures(
      new Point(event.point.x, event.point.y)
    ); // This is where I get building information
    console.log(features);
    features.forEach((feature) => {
      console.log(feature);
      if (feature.layer.id.toString() === 'building-extrusion') {
        console.log(feature.geometry); // feature.geometry getter returns building shape points (basement)
        console.log('height', feature?.properties?.height); // this is the building height
      }
    });
  }
}
