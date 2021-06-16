import { IBase, IHasCoordinates } from '@shared/interfaces';
import { ResponseList } from '@shared/models';
import { AccessPoint, Floor } from '.';

export class Building implements IBase, IHasCoordinates {
  id!: number;
  floors!: number;
  locationId!: number;
  mapboxId!: number;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
  maxOccupancy!: number;
  createdAt!: Date;
  location?: Location;
  accessPoints?: ResponseList<AccessPoint>;
  buildingFloorInfos?: ResponseList<Floor>;

  constructor(args: {
    $id: string;
    buildingId: number;
    floors: number;
    locationId: number;
    mapboxId: number;
    buildingName: string;
    coordLatitude: number;
    coordLongitude: number;
    maxOccupancy: number;
    createdAt: Date;
    // location: Location;
    // accessPoints: ResponseList<AccessPoint>;
    // buildingFloorInfos: ResponseList<Floor>;
  }) {
    this.id = args.buildingId;
    this.floors = args.floors;
    this.locationId = args.locationId;
    this.mapboxId = args.mapboxId;
    this.name = args.buildingName;
    this.coordLatitude = args.coordLatitude;
    this.coordLongitude = args.coordLongitude;
    this.maxOccupancy = args.maxOccupancy;
    this.createdAt = args.createdAt;
    // this.location = args.location;
    // this.accessPoints = args.accessPoints;
    // this.buildingFloorInfos = args.buildingFloorInfos;
  }
}
