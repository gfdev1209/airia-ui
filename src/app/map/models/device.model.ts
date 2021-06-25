import { IBase } from '@shared/interfaces';

export class Device {
  id!: string;
  building!: string;
  category!: string;
  clientMac!: string;
  ingestionTime!: Date;
  coordLatitude!: number;
  coordLongitude!: number;
  level!: number;
  manufacturer!: string;
  seenTime!: Date;

  constructor(args: {
    $id: string;
    building: string;
    category: string;
    clientMac: string;
    ingestionTime: Date;
    latitude: number;
    longitude: number;
    level: number;
    manufacturer: string;
    seenTime: Date;
  }) {
    this.id = args.$id;
    this.building = args.building;
    this.category = args.category;
    this.clientMac = args.clientMac;
    this.ingestionTime = args.ingestionTime;
    this.coordLatitude = args.latitude;
    this.coordLongitude = args.longitude;
    this.level = args.level;
    this.manufacturer = args.manufacturer;
    this.seenTime = args.seenTime;
  }
}
