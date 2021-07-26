import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-buildings-table-view',
  templateUrl: './buildings-table-view.component.html',
  styleUrls: ['./buildings-table-view.component.scss'],
})
export class BuildingsTableViewComponent implements OnInit {
  @Input() buildings: Building[] | null = [];
  @Output() buildingSelected = new EventEmitter<Building>();

  selectedBuilding?: Building;

  constructor() {}

  ngOnInit(): void {}

  onRowSelect(event: any): void {
    this.onEdit(event.data);
  }
  onEdit(building: Building): void {
    this.buildingSelected.emit(building);
  }
}
