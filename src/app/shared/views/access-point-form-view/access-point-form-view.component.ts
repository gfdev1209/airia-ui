import {
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccessPoint, Building, Floor } from '@map/models';

@Component({
  selector: 'app-access-point-form-view',
  templateUrl: './access-point-form-view.component.html',
  styleUrls: ['./access-point-form-view.component.scss'],
})
export class AccessPointFormViewComponent implements OnInit, OnChanges {
  @Input() accessPoint?: AccessPoint | null;
  @Input() buildings?: Building[] | null;
  @Input() floors?: Floor[] | null;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<AccessPoint>();

  accessPointForm!: FormGroup;
  buildingList: any[] = [];
  floorList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accessPoint && !changes.accessPoint.firstChange) {
      this.accessPointForm.patchValue(changes.accessPoint.currentValue);
      // this.accessPointForm.controls.roles.patchValue(
      //   changes.user.currentValue.roles.id
      // );
    }
    if (changes.buildings?.currentValue) {
      this.buildingList = [];
      changes.buildings.currentValue.forEach((building: Building) => {
        this.buildingList.push({
          label: building.buildingName,
          value: building.id,
        });
      });
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
    this.accessPointForm = this.fb.group({
      name: [this.accessPoint?.name, Validators.required],
      buildingId: [this.accessPoint?.buildingId, Validators.required],
      floorId: [this.accessPoint?.floorId, [Validators.required]],
    });
  }

  onBuildingChange(): void {
    // console.log(this.accessPointForm.get('buildingId'));
  }

  onSave(): void {
    this.save.emit(this.accessPointForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
