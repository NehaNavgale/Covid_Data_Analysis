import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizedDataComponent } from './hospitalized-data.component';

describe('HospitalizedDataComponent', () => {
  let component: HospitalizedDataComponent;
  let fixture: ComponentFixture<HospitalizedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
