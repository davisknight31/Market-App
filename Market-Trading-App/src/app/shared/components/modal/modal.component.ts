import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isModalOpen: boolean;
  @Output() isModalOpenChange = new EventEmitter<boolean>();

  closeModal() {
    this.isModalOpenChange.emit(!this.isModalOpen);
  }
}
