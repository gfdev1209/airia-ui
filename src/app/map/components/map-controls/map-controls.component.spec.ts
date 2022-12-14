/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapControlsComponent } from './map-controls.component';

describe('MapControlsComponent', () => {
  let component: MapControlsComponent;
  let fixture: ComponentFixture<MapControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
