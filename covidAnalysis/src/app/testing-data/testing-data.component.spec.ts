import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDataComponent } from './testing-data.component';

describe('TestingDataComponent', () => {
  let component: TestingDataComponent;
  let fixture: ComponentFixture<TestingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
