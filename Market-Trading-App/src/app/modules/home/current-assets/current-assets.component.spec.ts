import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAssetsComponent } from './current-assets.component';

describe('CurrentAssetsComponent', () => {
  let component: CurrentAssetsComponent;
  let fixture: ComponentFixture<CurrentAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAssetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
