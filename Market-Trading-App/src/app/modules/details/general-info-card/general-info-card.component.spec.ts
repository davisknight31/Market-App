import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoCardComponent } from './general-info-card.component';

describe('InfoCardComponent', () => {
  let component: GeneralInfoCardComponent;
  let fixture: ComponentFixture<GeneralInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
