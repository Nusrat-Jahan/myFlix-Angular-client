import { Component, OnInit } from '@angular/core';
// API Calls
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService,
  GetUserService,
} from '../fetch-api-data.service';
// Components
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

// Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];
  favoriteMoviesArray: string[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public addFavMovie: AddFavoriteMovieService,
    public fetchdeleteFavoriteMovie: DeleteFavoriteMovieService,
    public fetchUser: GetUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }


  ngOnInit(): void {
    this.getMovies();
    // this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      width: '580px',
      data: { name, description },
    });
    // console.log(this.genre);
  }
  showDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(MovieDirectorComponent, {
      width: '580px',
      data: { name, bio, birth, death },
    });
  }

  showDescriptionDialog(title: string, ImagePath: string, description: string, director: string, genre: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '580px',
      data: { title, ImagePath, description, director, genre },
    });
  }

  /**
  * check if movie is in favorites
  **/
  // getFavoriteMovies(): void {
  //   this.fetchUser.getUser().subscribe((resp: any) => {
  //     this.favoriteMovieIds = resp.favoriteMovies;
  //   });
  // }

  /**
* Adds or removes movie from user's list of favorites
* @param MovieID
* @returns
*/
  // isFavorite(MovieID: string): boolean {
  //   let favoriteMovies = localStorage.getItem('FavoriteMovies');
  //   if (favoriteMovies !== null)
  //     this.favoriteMoviesArray = JSON.parse(favoriteMovies);
  //   return this.favoriteMoviesArray.includes(MovieID);
  // }
  isFavorite(MovieID: string): boolean {
    // console.log("Movie ID " + movieID + "favorite check");
    return this.favoriteMovieIds.includes(MovieID);
  };

  /**
   * Adds or removes movie from user's list of favorites
   * @param id
   * @returns
   */
  // onToggleFavoriteMovie(_id: string): any {
  //   if (this.isFavorite(_id)) {
  //     this.fetchdeleteFavoriteMovie.deleteFavoriteMovie(_id).subscribe((resp: any) => {
  //       // localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies))
  //       this.snackBar.open('Removed from favorites!', 'OK', {
  //         duration: 2000,
  //       });
  //     });
  //     const index = this.favoriteMovieIds.indexOf(_id);
  //     return this.favoriteMovieIds.splice(index, 1);
  //   } else {
  //     this.addFavMovie.addFavoriteMovie(_id).subscribe((resp: any) => {
  //       // localStorage.setItem('FavoriteMovies', JSON.stringify(resp.FavoriteMovies));
  //       this.snackBar.open('Added to favorites!', 'OK', {
  //         duration: 2000,
  //       });
  //     });
  //   }
  //   return this.favoriteMovieIds.push(_id);
  // }
  onToggleFavoriteMovie(MovieID: string): any {
    if (this.isFavorite(MovieID)) {
      this.fetchdeleteFavoriteMovie.deleteFavoriteMovie(MovieID).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(MovieID);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.addFavMovie.addFavoriteMovie(MovieID).subscribe((resp: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(MovieID);
  }
}
