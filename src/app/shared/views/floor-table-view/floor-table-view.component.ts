import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Floor } from '@map/models';

@Component({
  selector: 'app-floor-table-view',
  templateUrl: './floor-table-view.component.html',
  styleUrls: ['./floor-table-view.component.scss'],
})
export class FloorTableViewComponent implements OnInit {
  @Input() floors: Floor[] | null = [];
  @Output() selectFloor = new EventEmitter<Floor>();
  @Output() deleteFloor = new EventEmitter<Floor>();

  selectedFloor?: Floor;

  constructor() {}

  ngOnInit(): void {}

  onRowSelect(event: any): void {
    this.onEdit(event.data);
  }
  onEdit(floor: Floor): void {
    this.selectFloor.emit(floor);
  }
  onDelete(floor: Floor): void {
    this.deleteFloor.emit(floor);
  }
}
