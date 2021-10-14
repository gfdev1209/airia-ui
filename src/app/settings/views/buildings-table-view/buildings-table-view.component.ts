import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AccessLevels from '@core/utils/access-levels';
import { Role } from '@map/enums/role.enum';
import { Building, User } from '@map/models';

@Component({
  selector: 'app-buildings-table-view',
  templateUrl: './buildings-table-view.component.html',
  styleUrls: ['./buildings-table-view.component.scss'],
})
export class BuildingsTableViewComponent implements OnInit {
  @Input() buildings: Building[] | null = [];
  @Input() self?: User | null;
  @Output() buildingSelected = new EventEmitter<Building>();

  selectedBuilding?: Building;
  role = Role;

  constructor() {}

  ngOnInit(): void {}

  onRowSelect(event: any): void {
    this.onEdit(event.data);
  }
  canEdit(): boolean {
    if (this.self?.role) {
      return AccessLevels.roleHasAccessLevel(
        this.self.role.name,
        AccessLevels.CanEdit
      );
    }
    return false;
  }
  onEdit(building: Building): void {
    if (this.canEdit()) {
      this.buildingSelected.emit(building);
    }
  }
}
