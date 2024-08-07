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
  menuActive: boolean = true;
  // navLinkClasses: string;
  route: string;
  currentElement: HTMLElement;
  loggedIn: boolean = false;
  @ViewChild('home') homeElement: ElementRef;
  @ViewChild('nav-wrapper') navElement: ElementRef;

  constructor(private userService: UserService) {}

  // ngOnInit() {
  //   this.loggedIn = this.userService.loggedIn;
  // }

  ngAfterViewInit(): void {
    this.currentElement = this.homeElement.nativeElement;
    this.currentElement.classList.add('selected-link');
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

  setSelection(elementReference: HTMLElement): void {
    console.log(elementReference.classList);
    this.currentElement.classList.remove('selected-link');
    elementReference.classList.add('selected-link');
    this.currentElement = elementReference;
    // if (this.menuActive) {
    //   this.menuActive = !this.menuActive;
    // }
  }
}
