import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AccessLevels from '@core/utils/access-levels';
import { Role } from '@map/enums/role.enum';
import { Region, User } from '@map/models';

@Component({
  selector: 'app-regions-table-view',
  templateUrl: './regions-table-view.component.html',
  styleUrls: ['./regions-table-view.component.scss'],
})
export class RegionsTableViewComponent implements OnInit {
  @Input() regions: Region[] | null = [];
  @Input() self?: User | null;
  @Output() regionSelected = new EventEmitter<Region>();

  selectedRegion?: Region;
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
  onEdit(region: Region): void {
    if (this.canEdit()) {
      this.regionSelected.emit(region);
    }
  }
}
