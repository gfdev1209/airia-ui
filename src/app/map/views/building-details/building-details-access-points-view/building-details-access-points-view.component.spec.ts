/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuildingDetailsAccessPointsViewComponent } from './building-details-access-points-view.component';

describe('BuildingDetailsAccessPointsViewComponent', () => {
  let component: BuildingDetailsAccessPointsViewComponent;
  let fixture: ComponentFixture<BuildingDetailsAccessPointsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingDetailsAccessPointsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingDetailsAccessPointsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
