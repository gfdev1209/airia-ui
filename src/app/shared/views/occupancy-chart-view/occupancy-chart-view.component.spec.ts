/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OccupancyChartViewComponent } from './occupancy-chart-view.component';

describe('OccupancyChartViewComponent', () => {
  let component: OccupancyChartViewComponent;
  let fixture: ComponentFixture<OccupancyChartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyChartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
