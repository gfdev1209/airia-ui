import { EventEmitter, OnChanges, Output } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Region, Floor, Building } from '@map/models';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-region-form-view',
  templateUrl: './region-form-view.component.html',
  styleUrls: ['./region-form-view.component.scss'],
  providers: [ConfirmationService],
})
export class RegionFormViewComponent implements OnInit, OnChanges {
  @Input() region?: Region | null;
  @Input() buildings?: Building[] | null;
  @Input() floors: Floor[] = [];
  @Input() loading?: boolean | null;

  @Output() updateRegion = new EventEmitter<Region>();
  @Output() addFloor = new EventEmitter<Region>();
  @Output() removeShape = new EventEmitter<Region>();
  @Output() editShape = new EventEmitter<Region>();
  @Output() changeBuilding = new EventEmitter<number>();

  regionForm!: FormGroup;
  buildingList: any[] = [];
  floorList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.buildings?.currentValue) {
      this.buildingList = [];
      changes.buildings.currentValue.forEach((building: Building) => {
        this.buildingList.push({
          label: building.buildingName,
          value: building.id,
        });
      });
      this.buildingList = this.buildingList.sort(
        (a, b) => a.buildingName - b.buildingName
      );
    }
    if (changes.floors?.currentValue) {
      this.floorList = [];
      changes.floors.currentValue.forEach((buildingFloorId: Floor) => {
        this.floorList.push({
          label: buildingFloorId.floorId,
          value: buildingFloorId.id,
        });
      });
      this.floorList = this.floorList.sort((a, b) => a.floorId - b.floorId);
    }
    if (changes.region && !changes.region.firstChange) {
      this.regionForm.patchValue(changes.region.currentValue);
      this.regionForm.patchValue({
        buildingId: changes.region.currentValue?.buildingFloor?.buildingId,
      });
      this.regionForm.patchValue({
        buildingFloorId: changes.region.currentValue?.buildingFloorId,
      });
    }
  }

  ngOnInit(): void {
    this.regionForm = this.fb.group({
      id: [this.region?.id, Validators.required],
      regionName: [this.region?.regionName, Validators.required],
      buildingId: [this.region?.buildingFloor?.buildingId, Validators.required],
      buildingFloorId: [this.region?.buildingFloorId, Validators.required],
    });
  }

  onChangeBuilding(event: any): void {
    this.changeBuilding.emit(event?.value);
    // Reset the buildingFloorId
    this.regionForm.controls.buildingFloorId.setValue(null);
  }

  onUpdate(): void {
    if (this.regionForm.valid) {
      this.updateRegion.emit(this.regionForm.value);
    }
  }

  onAddFloor(): void {
    if (this.region) {
      this.addFloor.emit(this.region);
    }
  }

  onEditShape(): void {
    if (this.region) {
      this.editShape.emit(this.region);
    }
  }

  onRemoveShape(): void {
    if (this.region) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to remove this custom region shape?`,
        header: 'Delete Confirmation',
        acceptButtonStyleClass: 'p-mr-0',
        acceptIcon: 'fal fa-check',
        rejectIcon: 'fal fa-times',
        accept: () => {
          if (this.region) {
            this.removeShape.emit(this.region);
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
