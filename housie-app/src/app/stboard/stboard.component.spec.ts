import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StboardComponent } from './stboard.component';

describe('StboardComponent', () => {
  let component: StboardComponent;
  let fixture: ComponentFixture<StboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
