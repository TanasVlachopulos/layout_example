import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterlogicComponent } from './meterlogic.component';

describe('MeterlogicComponent', () => {
  let component: MeterlogicComponent;
  let fixture: ComponentFixture<MeterlogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterlogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterlogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
