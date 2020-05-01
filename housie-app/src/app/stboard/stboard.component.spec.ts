import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StboardComponent } from './stboard.component';

describe('StboardComponent', () => {
  let component: StboardComponent;
  let fixture: ComponentFixture<StboardComponent>;

  beforeEach(async(() => {
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
