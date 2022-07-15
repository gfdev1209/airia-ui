import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Floor } from '@map/models';

@Component({
  selector: 'app-floor-controls-view',
  templateUrl: './floor-controls-view.component.html',
  styleUrls: ['./floor-controls-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorControlsViewComponent implements OnInit {
  @Input() floors: number[] | null = [];
  @Input() selectedFloorNumber?: number | null;
  @Output() selectFloor = new EventEmitter<number>();
  @Output() deselectFloor = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes:SimpleChanges){

    if(changes.floors.currentValue){
      this.floors?.sort(function(a, b) {
        return a - b;
      });
    }
   
  }

  onSelectFloor(floorNumber: number): void {
    if (floorNumber) {
      if (floorNumber === this.selectedFloorNumber) {
        this.deselectFloor.emit();
      } else {
        this.selectFloor.emit(floorNumber);
      }
    }
  }
}
