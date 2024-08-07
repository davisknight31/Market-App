import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/interfaces/user';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
})
export class PersonalDetailsComponent {
  buttonString: string = 'Edit';
  isEditing: boolean = false;
  user: User;
  updatedUsername: string;
  updatedFirstName: string;
  updatedLastName: string;
  updatedEmail: string;
  updatedPhoneNumber: string;
  errorMessage: string;
  isUpdatingDetails: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.setUserValues();
  }

  handleActionClick(): void {
    if (this.buttonString === 'Edit') {
      this.edit();
    } else {
      this.submitNewDetails();
    }
  }
  edit(): void {
    this.isEditing = true;
    this.buttonString = 'Submit';
  }

  submitNewDetails(): void {
    this.isUpdatingDetails = true;
    this.userService
      .updatePersonalInfo(
        this.userService.userId,
        this.updatedUsername,
        this.updatedEmail,
        this.updatedFirstName,
        this.updatedLastName,
        this.updatedPhoneNumber
      )
      .subscribe(() => {
        this.userService.getUserById().subscribe(() => {
          this.user = this.userService.user;
          this.isUpdatingDetails = false;
        });
      });
    this.isEditing = false;
    this.buttonString = 'Edit';
  }

  handleCancelClick(): void {
    this.isEditing = false;
    this.setUserValues();
    this.buttonString = 'Edit';
  }

  setUserValues(): void {
    this.updatedUsername = this.user.username;
    this.updatedFirstName = this.user.firstname;
    this.updatedLastName = this.user.lastname;
    this.updatedEmail = this.user.email;
    this.updatedPhoneNumber = this.user.phonenumber;
  }
}
