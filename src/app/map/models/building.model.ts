import { IBase, IHasCoordinates } from '@shared/interfaces';
import { ResponseList } from '@shared/models';
import { AccessPoint } from './access-point.model';
import { Floor } from './floor.model';

export class Building implements IBase, IHasCoordinates {
  id!: number;
  floors!: number;
  locationId!: number;
  mapboxId!: number;
  buildingName!: string;
  buildingClassification!: string;
  buildingDescription!: string;
  coordLatitude!: number;
  coordLongitude!: number;
  maxOccupancy!: number;
  createdAt!: Date;
  buildingPolygonJson?: string;
  buildingAddress!: string;
  location?: Location;
  buildingFloors?: Floor[];

  test?: any[];

  constructor(args: {
    $id: string;
    buildingId: number;
    floors: number;
    locationId: number;
    mapboxId: number;
    buildingName: string;
    buildingAddress: string;
    buildingClassification: string;
    buildingDescription: string;
    coordLatitude: number;
    coordLongitude: number;
    maxOccupancy: number;
    createdAt: Date;
    // location: Location;
    buildingFloorInfos: ResponseList<Floor>;
  }) {
    this.id = args.buildingId;
    this.floors = args.floors;
    this.locationId = args.locationId;
    this.mapboxId = args.mapboxId;
    this.buildingName = args.buildingName;
    this.buildingAddress = args.buildingAddress;
    this.buildingClassification = args.buildingClassification;
    this.buildingDescription = args.buildingDescription;
    this.coordLatitude = args.coordLatitude;
    this.coordLongitude = args.coordLongitude;
    this.maxOccupancy = args.maxOccupancy;
    this.createdAt = args.createdAt;
    // this.location = args.location;

    if (args.buildingFloorInfos?.$values) {
      this.buildingFloors = args.buildingFloorInfos.$values.map(
        (responseJson: any) => new Floor(responseJson)
      );
    }
  }

  // window.JSON["reconstitute"] = function (jsonText, delete$Fields) {
  //     let obj = JSON.parse(jsonText);
  //     let lookup = getReferencedData(obj, delete$Fields);
  //     //console.log(lookup);
  //     obj = applyReferencedData(obj, lookup, delete$Fields, delete$Fields);
  //     //console.log(obj);
  //     return obj;
  // }

  // function applyReferencedData(obj, references, delete$ref, delete$values) {
  //     for (let key in obj) {
  //         let value = obj[key];
  //         if (key === '$ref') obj = references[value];
  //         else if (typeof value == 'object' && value) {
  //             let appliedChild = applyReferencedData(value, references, delete$ref, delete$values);
  //             obj[key] = appliedChild;
  //         }
  //     }
  //     if (delete$ref) delete obj.$id;
  //     if (obj.$values) {
  //         obj = obj.$values;
  //         if (!delete$values)  {
  //             obj.$values = obj; //preserves the $values property
  //         }
  //     }
  //     return obj;
  // }
}
