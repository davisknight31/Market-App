import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInfoCardComponent } from './financial-info-card.component';

describe('FinancialInfoCardComponent', () => {
  let component: FinancialInfoCardComponent;
  let fixture: ComponentFixture<FinancialInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
