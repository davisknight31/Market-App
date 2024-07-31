import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuActive: boolean = false;
  // navLinkClasses: string;
  currentElement: HTMLElement;
  @ViewChild('home') homeElement: ElementRef;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.currentElement = this.homeElement.nativeElement;
    this.currentElement.classList.add('active');
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  checkIfLoggedIn(): boolean {
    if (this.userService.loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  closeMenu(elementReference: HTMLElement): void {
    console.log(elementReference.classList);
    this.currentElement.classList.remove('active');
    elementReference.classList.add('active');
    this.currentElement = elementReference;
    if (this.menuActive) {
      this.menuActive = !this.menuActive;
    }
  }
}
