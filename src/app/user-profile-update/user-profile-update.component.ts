import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetUserService, EditUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})

/**
 * This component will render the Update User Profile form.
 */
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };
  // user: any = {};

  /**
   * @param data
   * @param fetchApiData
   * @param fetchUser
   * @param fetchEditUser
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchUser: GetUserService,
    public fetchEditUser: EditUserService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  /**
   * This method will will send input data to database and will upadate user account details
   */
  editUser(): void {
    this.fetchEditUser.editUser(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      localStorage.setItem('user', response.Username);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 2000,
      });
    }, response => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
