import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWatchlistModalComponent } from './manage-watchlist-modal.component';

describe('ManageWatchlistModalComponent', () => {
  let component: ManageWatchlistModalComponent;
  let fixture: ComponentFixture<ManageWatchlistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWatchlistModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageWatchlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
