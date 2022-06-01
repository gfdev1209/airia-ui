import { ResponseList } from '@shared/models';
import { Alert } from './alert.model';
import { Floor } from './floor.model';

export enum ActiveType {
  Active = 'Active',
  Inactive = 'Inactive',
}

export class Region {
    id!: number;
    regionId!: number;
    regionName!: string;
    modelRegion!: string;
    locationId?: string;
    buildingId?: number;
    buildingName?: string;
    buildingFloorId?: number;
    regionPolygon?: number[][];
    buildingFloor?: Floor;
    buildingFloorNumber?: number;
    buildingLatitude?: number;
    buildingLongitude?: number;
    alerts?: Alert[];
    activeType!: string;

    constructor(args: {
        $id: string;
        activeType: string;
        alerts?: ResponseList<Alert>;
        buildingFloor?: Floor;
        buildingFloorId?: number;
        buildingId?: number;
        location?: Location;
        locationId: string;
        modelRegion: string;
        regionId: number;
        regionName: string;
        regionPolygonJson: any;
        buildingName?: string;
        buildingFloorNumber: number;
        buildingLatitude?: number;
        buildingLongitude?: number;
    }) {
        this.id = args.regionId;
        this.regionId = args.regionId;
        this.regionName = args.regionName;
        this.modelRegion = args.modelRegion;
        this.locationId = args.locationId;
        this.buildingId = args.buildingId;
        this.buildingName = args.buildingName;
        this.buildingLatitude = args.buildingLatitude;
        this.buildingLongitude = args.buildingLongitude;
        this.buildingFloorId = args.buildingFloorId;
        this.buildingFloorNumber = args.buildingFloorNumber;
        this.buildingFloor = args.buildingFloor;
        this.activeType = args.activeType;

        if (args.regionPolygonJson) {
            this.regionPolygon = JSON.parse(args.regionPolygonJson)?.area_polygon;
            if (this.regionPolygon && this.regionPolygon.length > 0) {
                // Swap lat/long since we do not want to store this as geojson format
                if (this.regionPolygon[0][1] < 0) {
                    this.regionPolygon.forEach((position) => {
                        [position[0], position[1]] = [position[1], position[0]];
                    });
                }
                this.regionPolygon.push(this.regionPolygon[0]);
            } else {
                this.regionPolygon = JSON.parse(args.regionPolygonJson);
            }
        }

        // if (args.alerts?.$values) {
        //     this.alerts = args.alerts.$values.map((responseJson: any) => new Alert(responseJson));
        // }
    }
}
