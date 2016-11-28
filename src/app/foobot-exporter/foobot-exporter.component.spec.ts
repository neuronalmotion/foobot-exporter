/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FoobotExporterComponent } from './foobot-exporter.component';

describe('FoobotExporterComponent', () => {
  let component: FoobotExporterComponent;
  let fixture: ComponentFixture<FoobotExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoobotExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoobotExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
