import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByDateComponent } from './cases-by-date.component';

describe('CasesByDateComponent', () => {
  let component: CasesByDateComponent;
  let fixture: ComponentFixture<CasesByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
