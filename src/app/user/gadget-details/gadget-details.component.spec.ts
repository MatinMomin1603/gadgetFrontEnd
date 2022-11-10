import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetDetailsComponent } from './gadget-details.component';

describe('GadgetDetailsComponent', () => {
  let component: GadgetDetailsComponent;
  let fixture: ComponentFixture<GadgetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GadgetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GadgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
