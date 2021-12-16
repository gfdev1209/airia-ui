import { Floor } from './floor.model';

export class Device {
  id!: string;
  deviceRatId!: number;
  buildingFloorId?: number;
  clientMac!: string;
  wapMac!: string;
  category!: string;
  datasourceType!: string;
  deviceType!: string;
  ingestionTime!: Date;
  latitude!: number;
  longitude!: number;
  rssi?: number;
  ssid?: string;
  manufacturer!: string;
  ipv4?: string;
  ipv6?: string;
  os?: string;
  buildingFloor?: Floor;

  constructor(args: {
    $id: string;
    deviceRatId: number;
    buildingFloorId: number;
    clientMac: string;
    wapmac: string;
    category: string;
    datasourcetype: string;
    devicetype: string;
    ingestiontime: Date;
    latitude: number;
    longitude: number;
    rssi: number;
    ssid: string;
    manufacturer: string;
    ipv4: string;
    ipv6: string;
    os: string;
    buildingFloor: Floor;
  }) {
    this.id = args.$id;
    this.deviceRatId = args.deviceRatId;
    this.buildingFloorId = args.buildingFloorId;
    this.clientMac = args.clientMac;
    this.wapMac = args.wapmac;
    this.category = args.category;
    this.datasourceType = args.datasourcetype;
    this.deviceType = args.devicetype;
    this.ingestionTime = args.ingestiontime;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
    this.rssi = args.rssi;
    this.ssid = args.ssid;
    this.manufacturer = args.manufacturer;
    this.ipv4 = args.ipv4;
    this.ipv6 = args.ipv6;
    this.os = args.os;
    this.buildingFloor = args.buildingFloor;
  }
}
