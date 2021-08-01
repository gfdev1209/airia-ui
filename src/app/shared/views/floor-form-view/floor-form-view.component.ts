import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Floor, Building } from '@map/models';

@Component({
  selector: 'app-floor-form-view',
  templateUrl: './floor-form-view.component.html',
  styleUrls: ['./floor-form-view.component.scss'],
})
export class FloorFormViewComponent implements OnInit, OnChanges {
  @Input() building?: Building | null;
  @Input() floor?: Floor | null;
  @Input() floors?: Floor[] | null;
  @Input() loading?: boolean | null;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<Floor>();

  floorForm!: FormGroup;
  floorList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.floor && !changes.floor.firstChange) {
      this.floorForm.patchValue(changes.floor.currentValue);
    }
    if (changes.floors?.currentValue) {
      this.floorList = [];
      changes.floors.currentValue.forEach((floor: Floor) => {
        this.floorList.push({
          label: floor.floorId,
          value: floor.id,
        });
      });
    }
  }

  ngOnInit(): void {
    this.floorForm = this.fb.group({
      id: [this.floor?.id],
      buildingId: [
        this.floor?.buildingId ? this.floor?.buildingId : this.building?.id,
        Validators.required,
      ],
      floorId: [this.floor?.floorId, Validators.required],
      floorMaxOccupancy: [this.floor?.floorMaxOccupancy, Validators.required],
    });
  }

  onBuildingChange(): void {
    // console.log(this.floorForm.get('buildingId'));
  }

  onSave(): void {
    this.save.emit(this.floorForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
