import { EventEmitter, OnChanges, Output } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Building, Floor } from '@map/models';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-building-form-view',
  templateUrl: './building-form-view.component.html',
  styleUrls: ['./building-form-view.component.scss'],
  providers: [ConfirmationService],
})
export class BuildingFormViewComponent implements OnInit, OnChanges {
  @Input() building?: Building | null;
  @Input() floors: Floor[] = [];
  @Input() loading?: boolean | null;

  @Output() updateBuilding = new EventEmitter<Building>();
  @Output() addFloor = new EventEmitter<Building>();
  @Output() removeShape = new EventEmitter<Building>();
  @Output() editShape = new EventEmitter<Building>();

  buildingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.building && !changes.building.firstChange) {
      this.buildingForm.patchValue(changes.building.currentValue);
    }
  }

  ngOnInit(): void {
    this.buildingForm = this.fb.group({
      id: [this.building?.id, Validators.required],
      buildingName: [this.building?.buildingName, Validators.required],
      buildingAddress: [this.building?.buildingAddress, Validators.required],
      buildingDescription: [
        this.building?.buildingDescription,
        Validators.required,
      ],
      buildingClassification: [
        this.building?.buildingClassification,
        Validators.required,
      ],
      mapboxId: [this.building?.mapboxId, Validators.required],
      floors: [this.building?.floors, Validators.required],
      maxOccupancy: [this.building?.maxOccupancy, Validators.required],
    });
  }

  onUpdate(): void {
    if (this.buildingForm.valid) {
      this.updateBuilding.emit(this.buildingForm.value);
    }
  }

  onAddFloor(): void {
    if (this.building) {
      this.addFloor.emit(this.building);
    }
  }

  onEditShape(): void {
    if (this.building) {
      this.editShape.emit(this.building);
    }
  }

  onRemoveShape(): void {
    if (this.building) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to remove this custom building shape?`,
        header: 'Delete Confirmation',
        acceptButtonStyleClass: 'p-mr-0',
        acceptIcon: 'fal fa-check',
        rejectIcon: 'fal fa-times',
        accept: () => {
          if (this.building) {
            this.removeShape.emit(this.building);
          }
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              console.log('rejected');
              break;
            case ConfirmEventType.CANCEL:
              console.log('cancelled');
              break;
          }
        },
      });
    }
  }
}
