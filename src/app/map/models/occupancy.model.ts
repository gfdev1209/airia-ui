export class Occupancy {
  id: string;
  regionId: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  averageOccupancy: number;
  maxOccupancy: number;
  medianOccupancy: number;
  title?: string;

  constructor(args: {
    $id: string;
    regionId: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    averageOccupancy: number;
    maxOccupancy: number;
    medianOccupancy: number;
    title?: string;
  }) {
    this.id = args.$id;
    this.regionId = args.regionId;
    this.year = args.year;
    this.month = args.month;
    this.day = args.day;
    this.hour = args.hour;
    this.averageOccupancy = args.averageOccupancy;
    this.maxOccupancy = args.maxOccupancy;
    this.medianOccupancy = args.medianOccupancy;
    this.title = args.title;
  }
}
