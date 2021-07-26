/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FloorTableComponent } from './floor-table.component';

describe('FloorTableComponent', () => {
  let component: FloorTableComponent;
  let fixture: ComponentFixture<FloorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
