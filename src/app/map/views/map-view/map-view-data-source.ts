import { AnyLayer, GeoJSONSource, Map } from 'mapbox-gl';
export class MapViewDataSource {
  // MapBox Map
  map!: Map;
  // Data Source
  dataSourceName!: string;
  dataSource?: GeoJSONSource;

  private layers: AnyLayer[] = [];
  private features: GeoJSON.Feature[];

  constructor(map: Map, dataSourceName: string) {
    this.map = map;
    this.dataSourceName = dataSourceName;
    this.features = [];
  }

  addDataSource(
    cluster: boolean = false,
    clusterMaxZoom: number = 17,
    clusterRadius: number = 50
  ): void {
    if (this.dataSource) {
      throw new Error(
        'Cannot add more than one data source to a MapViewDataSource'
      );
    }
    // Add a data source containing GeoJSON data.
    this.map.addSource(this.dataSourceName, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      cluster,
      clusterMaxZoom,
      clusterRadius,
    });
    this.dataSource = this.map.getSource(
      this.dataSourceName
    ) as mapboxgl.GeoJSONSource;
  }

  addLayer(
    name: string,
    type: any,
    paint?: any,
    layout?: any,
    filter?: any
  ): void {
    const layer: AnyLayer = {
      id: name,
      type,
      source: this.dataSourceName,
    };
    if (paint) {
      layer.paint = paint;
    }
    if (layout) {
      layer.layout = layout;
    }
    if (filter) {
      layer.filter = filter;
    }
    this.map.addLayer(layer);
    // Store this layer
    if (!this.layers.find((l) => l.id === name)) {
      this.layers.push(layer);
    }
  }

  addFeature(
    replaceExisting: boolean,
    id: string,
    geometry: GeoJSON.Geometry,
    properties: any = {}
  ): void {
    if (this.dataSource) {
      const feature: GeoJSON.Feature = {
        id,
        type: 'Feature',
        properties,
        geometry,
      };
      if (replaceExisting) {
        this.features = [];
        this.dataSource.setData(feature);
      } else {
        this.features.push(feature);
        this.dataSource.setData({
          type: 'FeatureCollection',
          features: this.features,
        });
      }
    }
  }

  updateData(data: any[]): void {
    if (!this.dataSource) {
      throw new Error('Attempted to update data with not data source');
    }
    this.dataSource?.setData({
      type: 'FeatureCollection',
      features: data,
    });
  }

  hideAllLayers(): void {
    this.layers.forEach((layer) => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
  }
  
  showAllLayers(): void {
    this.layers.forEach((layer) => {
      this.map.setLayoutProperty(layer.id, 'visibility', 'visible');
    });
  }

  resetFeatureArray(): void {
    this.features = [];
  }

  // addBuildingLayer(building: number[][][]): void {
  //   if (this.map) {
  //     // const dataSource = 'buildings';
  //     // // Add a data source containing GeoJSON data.
  //     // this.map.addSource(dataSource, {
  //     //   type: 'geojson',
  //     //   data: {
  //     //     type: 'FeatureCollection',
  //     //     features: [
  //     //       {
  //     //         type: 'Feature',
  //     //         properties: {},
  //     //         geometry: {
  //     //           type: 'Polygon',
  //     //           coordinates: building1,
  //     //         },
  //     //       },
  //     //       {
  //     //         type: 'Feature',
  //     //         properties: {},
  //     //         geometry: {
  //     //           type: 'Polygon',
  //     //           coordinates: building2,
  //     //         },
  //     //       },
  //     //     ],
  //     //   },
  //     // });

  //     // Add a data source containing GeoJSON data
  //     const schoolBounds = [
  //       [
  //         [-83.3375565062273, 36.1149244165137],
  //         [-83.33828153946762, 36.11495262590505],
  //         [-83.33844106921995, 36.11344843032599],
  //         [-83.33547132003721, 36.11320780820073],
  //         [-83.33487368031723, 36.11506301884137],
  //         [-83.3375565062273, 36.1149244165137],
  //       ],
  //     ];
  //     this.map.addSource('schoolBoundary', {
  //       type: 'geojson',
  //       data: {
  //         type: 'FeatureCollection',
  //         features: [
  //           {
  //             type: 'Feature',
  //             properties: {},
  //             geometry: {
  //               type: 'Polygon',
  //               coordinates: schoolBounds,
  //             },
  //           },
  //         ],
  //       },
  //     });
  //     this.map.addLayer({
  //       id: 'schoolBoundary',
  //       type: 'fill',
  //       source: 'schoolBoundary',
  //       paint: {
  //         'fill-color': '#2b2640',
  //         'fill-opacity': 1,
  //       },
  //       filter: ['==', '$type', 'Polygon'],
  //     });
  //   }
  // }
}
