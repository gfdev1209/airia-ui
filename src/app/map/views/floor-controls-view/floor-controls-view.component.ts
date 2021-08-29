import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Floor } from '@map/models';

@Component({
  selector: 'app-floor-controls-view',
  templateUrl: './floor-controls-view.component.html',
  styleUrls: ['./floor-controls-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorControlsViewComponent implements OnInit {
  @Input() floors: Floor[] | null = [];
  @Input() selectedFloor?: Floor | null;
  @Output() selectFloor = new EventEmitter<Floor>();
  @Output() deselectFloor = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectFloor(floor: Floor): void {
    if (floor) {
      if (floor.id === this.selectedFloor?.id) {
        this.deselectFloor.emit();
      } else {
        this.selectFloor.emit(floor);
      }
    }
  }
}
