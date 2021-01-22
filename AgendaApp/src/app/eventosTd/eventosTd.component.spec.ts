/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventosTdComponent } from './eventosTd.component';

describe('EventosTdComponent', () => {
  let component: EventosTdComponent;
  let fixture: ComponentFixture<EventosTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
