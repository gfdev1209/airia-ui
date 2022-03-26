/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegionsTableViewComponent } from './regions-table-view.component';

describe('RegionsTableViewComponent', () => {
  let component: RegionsTableViewComponent;
  let fixture: ComponentFixture<RegionsTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
