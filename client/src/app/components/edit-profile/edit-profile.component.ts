import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  user: any;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.editProfileForm = new FormGroup({
      firstNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contactFormControl: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
      countryFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      stateFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      techFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      //mentorFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response.data;
    }, err => {
      return false;
    });
  }

  Save(): any {
    if (this.editProfileForm.valid) {
      let obs = this.authService.editProfile({
        firstName: this.editProfileForm.get('firstNameFormControl').value,
        lastName: this.editProfileForm.get('lastNameFormControl').value,
        email: this.user.email,
        contact: this.editProfileForm.get('contactFormControl').value,
        country: this.editProfileForm.get('countryFormControl').value,
        state: this.editProfileForm.get('stateFormControl').value,
        technology: this.editProfileForm.get('techFormControl').value
      });
      obs.subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open("Profile Data Saved", '', {
            duration: 1500
          });
        } else {
          this.snackBar.open(response.error, '', {
            duration: 1500
          });
        }
      })
    }
    else {
      if (this.editProfileForm.get('contactFormControl').invalid) {
        this.snackBar.open("Invalid Contact Number", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('countryFormControl').invalid) {
        this.snackBar.open("Invalid Country", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('stateFormControl').invalid) {
        this.snackBar.open("Invalid State", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('techFormControl').invalid) {
        this.snackBar.open("Invalid Technology", '', {
          duration: 1500
        });
      }
    }
  }
}
