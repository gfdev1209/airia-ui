import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-search-input-view',
  templateUrl: './building-search-input-view.component.html',
  styleUrls: ['./building-search-input-view.component.scss'],
})
export class BuildingSearchInputViewComponent implements OnInit {
  @Input() searchResults?: Building[] | null;
  @Output() search = new EventEmitter<string>();
  @Output() selectBuilding = new EventEmitter<Building>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  onSelect(building: Building): void {
    this.selectBuilding.emit(building);
  }
}
