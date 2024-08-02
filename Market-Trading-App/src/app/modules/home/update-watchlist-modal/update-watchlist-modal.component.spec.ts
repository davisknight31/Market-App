import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWatchlistModalComponent } from './update-watchlist-modal.component';

describe('UpdateWatchlistModalComponent', () => {
  let component: UpdateWatchlistModalComponent;
  let fixture: ComponentFixture<UpdateWatchlistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWatchlistModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWatchlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
