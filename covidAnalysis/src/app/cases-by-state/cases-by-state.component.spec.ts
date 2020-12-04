import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByStateComponent } from './cases-by-state.component';

describe('CasesByStateComponent', () => {
  let component: CasesByStateComponent;
  let fixture: ComponentFixture<CasesByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
