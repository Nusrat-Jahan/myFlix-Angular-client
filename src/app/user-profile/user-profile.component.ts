import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// API Call
import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService
} from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This component renders the User Profile view.
 */
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];
  // isLoaded = false;

  /**
   * @param fetchApiData
   * @param fetchMovies
   * @param deleteMovies
   * @param dialog
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: GetUserService,
    public fetchMovies: GetAllMoviesService,
    public deleteMovies: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * ngOnInit() is a place to put the code that we need to execute at very first as soon as the class is instantiated
   * This method will run the getUser method after the User Profile Component is initialised and rendered.
   * @returns User object.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This method will get User Profile details and array of user favorite movies
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.getMovies();
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * This method will Update user Profile details
   */
  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  /**
   * Open dialog/modal to Delete user Profile
   */
  deleteUserDialog(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }

  /**
   * This method will get user favorite movie array
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }
  /**
   *  This method will filter movie from movies array to user favorite movies array
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    // this.isLoaded = true;
    // console.log(this.isLoaded);
    return this.favorites;

  }
  /**
   *  This method will delete movie from user favorite movies array.
   */
  deleteFavorites(id: string, title: string): void {
    this.deleteMovies.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }
}