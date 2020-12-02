import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USASummaryComponent } from './usasummary.component';

describe('USASummaryComponent', () => {
  let component: USASummaryComponent;
  let fixture: ComponentFixture<USASummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USASummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USASummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
