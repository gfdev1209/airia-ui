import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Building } from '../../models';

@Component({
  selector: 'app-search-bar-view',
  templateUrl: './search-bar-view.component.html',
  styleUrls: ['./search-bar-view.component.scss'],
})
export class SearchBarViewComponent implements OnInit {
  @Input() searchResults?: Building[] | null;
  @Output() search = new EventEmitter<string>();
  @Output() selectBuilding = new EventEmitter<number>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  onSelect(building: Building): void {
    this.selectBuilding.emit(building?.id);
  }
}
