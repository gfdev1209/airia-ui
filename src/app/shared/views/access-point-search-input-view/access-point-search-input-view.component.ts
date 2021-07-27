import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessPoint } from '@map/models';

@Component({
  selector: 'app-access-point-search-input-view',
  templateUrl: './access-point-search-input-view.component.html',
  styleUrls: ['./access-point-search-input-view.component.scss'],
})
export class AccessPointSearchInputViewComponent implements OnInit {
  @Input() searchResults?: AccessPoint[] | null;
  @Output() search = new EventEmitter<string>();
  @Output() selectAccessPoint = new EventEmitter<AccessPoint>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  onSelect(building: AccessPoint): void {
    this.selectAccessPoint.emit(building);
  }
}
