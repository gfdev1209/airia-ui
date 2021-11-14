export class BuildingAnalytics {
  id!: number;
  buildingId!: number;
  occupancy!: number;
  occupancyPercentile!: number;
  averageOccupancyPercentile!: number;
  deviceCount!: number;
  averageDeviceCount!: number;
  startInstant!: Date;
  endInstant!: Date;

  constructor(args: {
    $id: number;
    buildingId: number;
    occupancy: number;
    occupancyPercentile: number;
    averageOccupancyPercentile: number;
    deviceCount: number;
    averageDeviceCount: number;
    startInstant: Date;
    endInstant: Date;
  }) {
    this.id = args.$id;
    this.buildingId = args.buildingId;
    this.occupancy = args.occupancy;
    this.occupancyPercentile = args.occupancyPercentile;
    this.averageOccupancyPercentile = args.averageOccupancyPercentile;
    this.deviceCount = args.deviceCount;
    this.averageDeviceCount = args.averageDeviceCount;
    this.startInstant = args.startInstant;
    this.endInstant = args.endInstant;
  }
}
