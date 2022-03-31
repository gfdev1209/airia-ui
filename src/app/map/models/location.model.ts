import { IHasCoordinates, IBase } from '@shared/interfaces';
import { ResponseList } from '@shared/models';
import { Building } from '.';

export class Location implements IHasCoordinates, IBase {
  id!: number;
  locationId!: number;
  tenantId!: number;
  name!: string;
  coordLatitude!: number;
  coordLongitude!: number;
  createdAt!: Date;
  mapNELatitude!: number;
  mapNELongitude!: number;
  mapSWLatitude!: number;
  mapSWLongitude!: number;
  // buildings?: ResponseList<Building>;
  // tenant?: any;
  // tenantUsers?: ResponseList<any>;

  constructor(args: {
    $id: string;
    locationId: number;
    tenantId: number;
    locationName: string;
    coordLatitude: number;
    coordLongitude: number;
    createdAt: Date;
    mapNELatitude: number;
    mapNELongitude: number;
    mapSWLatitude: number;
    mapSWLongitude: number;
  }) {
    this.id = args.locationId;
    this.locationId = args.locationId;
    this.tenantId = args.tenantId;
    this.name = args.locationName;
    this.coordLatitude = args.coordLatitude;
    this.coordLongitude = args.coordLongitude;
    this.createdAt = args.createdAt;
    this.mapNELatitude = args.mapNELatitude;
    this.mapNELongitude = args.mapNELongitude;
    this.mapSWLatitude = args.mapSWLatitude;
    this.mapSWLongitude = args.mapSWLongitude;
  }
}
