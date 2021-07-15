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
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];

  /**
   * @param fetchApiData
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

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * User Profile details
   **/
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      // this.favouriteMovies = this.movies.filter((movie: any) => this.user.FavouriteMovies.includes(movie._id));
      console.log(this.user);
      // console.log(this.favouriteMovies);
      return this.user;
      // this.favouriteMovies;
    });
  }

  /**
  * Updates Profile
  **/
  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  /**
  * Delete Profile
  **/
  deleteUser(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }

  /**
   * retrieve all favorited movies
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
   * removes movie from user's list of favorites
   * @param movie_id
   * @returns
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * delete favorites from user
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