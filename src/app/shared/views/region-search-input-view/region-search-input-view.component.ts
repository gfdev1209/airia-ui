import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Region } from '@map/models';

@Component({
  selector: 'app-region-search-input-view',
  templateUrl: './region-search-input-view.component.html',
  styleUrls: ['./region-search-input-view.component.scss'],
})
export class RegionSearchInputViewComponent implements OnInit {
  @Input() searchResults?: Region[] | null;
  @Output() search = new EventEmitter<string>();
  @Output() selectRegion = new EventEmitter<Region>();

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  onSelect(region: Region): void {
    this.selectRegion.emit(region);
  }
}
