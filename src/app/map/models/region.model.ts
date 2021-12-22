import { ResponseList } from '@shared/models';
import { Alert } from './alert.model';
import { Floor } from './floor.model';

export class Region {
  id!: number;
  name!: string;
  modelRegion!: string;
  locationId?: string;
  buildingFloorId!: number;
  regionPolygon?: number[][];
  buildingFloor?: Floor;
  buildingFloorNumber?: number;
  alerts?: Alert[];
  activeType!: string;

  constructor(args: {
    $id: string;
    regionId: number;
    regionName: string;
    modelRegion: string;
    locationId: string;
    buildingFloorId: number;
    regionPolygonJson: any;
    buildingFloor: Floor;
    buildingFloorNumber: number;
    location: Location;
    alerts: ResponseList<Alert>;
    activeType: string;
  }) {
    this.id = args.regionId;
    this.name = args.regionName;
    this.modelRegion = args.modelRegion;
    this.locationId = args.locationId;
    this.buildingFloorId = args.buildingFloorId;
    this.buildingFloorNumber = args.buildingFloorNumber;
    this.buildingFloor = args.buildingFloor;
    this.activeType = args.activeType;

    if (args.regionPolygonJson) {
      this.regionPolygon = JSON.parse(args.regionPolygonJson)?.area_polygon;
      if (this.regionPolygon) {
        this.regionPolygon.forEach((position) => {
          [position[0], position[1]] = [position[1], position[0]];
        });
        this.regionPolygon.push(this.regionPolygon[0]);
      }
    }

    if (args.alerts?.$values) {
      this.alerts = args.alerts.$values.map(
        (responseJson: any) => new Alert(responseJson)
      );
    }
  }
}
