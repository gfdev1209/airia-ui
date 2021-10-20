import { ResponseList } from '@shared/models';
import { Alert } from './alert.model';
import { Floor } from './floor.model';

export class Region {
  id!: number;
  name!: string;
  modelRegion!: string;
  locationId?: string;
  buildingFloorId!: number;
  regionPolygonJson: any;
  buildingFloor?: Floor;
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
    location: Location;
    alerts: ResponseList<Alert>;
    activeType: string;
  }) {
    this.id = args.regionId;
    this.name = args.regionName;
    this.modelRegion = args.modelRegion;
    this.locationId = args.locationId;
    this.buildingFloorId = args.buildingFloorId;
    this.regionPolygonJson = args.regionPolygonJson;
    this.buildingFloor = args.buildingFloor;
    this.activeType = args.activeType;

    if (args.alerts?.$values) {
      this.alerts = args.alerts.$values.map(
        (responseJson: any) => new Alert(responseJson)
      );
    }
  }
}
