import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Building } from '@map/models';

@Component({
  selector: 'app-building-search-input-view',
  templateUrl: './building-search-input-view.component.html',
  styleUrls: ['./building-search-input-view.component.scss'],
})
export class BuildingSearchInputViewComponent implements OnInit {
  @ViewChild('autoComplete') autoComplete:ElementRef<any> | undefined;
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

  onClear(event:any){
    console.log("onClear", event);
  }

  handleDropdown(event:any){
    const results = this.searchResults?.map((_arrayElement) => Object.assign({}, _arrayElement));
    console.log("searchResults", this.searchResults);
    this.searchResults = [];
    this.searchResults = results;

    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();
    if (this.autoComplete?.nativeElement?.panelVisible) {
      this.autoComplete?.nativeElement?.onDropdownBlur();
      this.autoComplete.nativeElement?.hide();
    } else {
      this.autoComplete?.nativeElement?.onDropdownFocus();
      this.autoComplete?.nativeElement?.show();
    }
  }
}
