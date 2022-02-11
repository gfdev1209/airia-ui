import { OccupancyStat } from './occupancy-stat.model';

export class Occupancy {
  id: string;
  count!: number;
  maxOccupancyHistoric!: number;
  regionId: number;
  occupancyStats: OccupancyStat[] = [];

  constructor(args: {
    $id: string;
    count: number;
    maxOccupancyHistoric: number;
    regionId: number;
    rows: any;
  }) {
    this.id = args.$id;
    this.count = args.count;
    this.maxOccupancyHistoric = args.maxOccupancyHistoric;
    this.regionId = args.regionId;
    if (args.rows?.$values) {
      this.occupancyStats = args.rows.$values.map(
        (responseJson: any) => new OccupancyStat(responseJson)
      );
    }
  }
}
