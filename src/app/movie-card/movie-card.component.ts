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

/**
 * This component will render movie data.
 */
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public addFavMovie: AddFavoriteMovieService,
    public deleteMovies: DeleteFavoriteMovieService,
    public fetchUser: GetUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  /**
   * This method will run the getMovies and getFavoriteMovies method after the MovieCard Component is initialised and rendered.
   * @returns array of movies and favorite movies objects.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * This method will get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens modal with movie genre details
   * @param name
   * @param description
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      width: '580px',
      data: { name, description },
    });
  }

  /**
   * Opens modal with movie Director details
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  showDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(MovieDirectorComponent, {
      width: '580px',
      data: { name, bio, birth, death },
    });
  }

  /**
   * Opens modal with movie Description details
   * @param title
   * @param ImagePath
   * @param description
   * @param director
   * @param genre
   * @param releaseYear
   * @param imdbRating
   */
  showDescriptionDialog(title: string, ImagePath: string, description: string, director: string, genre: string, releaseYear: number, imdbRating: number): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '580px',
      data: { title, ImagePath, description, director, genre, releaseYear, imdbRating },
    });
  }

  /** 
   *  checks if movie is in user's list of favorites
   */
  getFavoriteMovies(): void {
    this.fetchUser.getUser().subscribe((response: any) => {
      this.favoriteMovieIds = response.FavoriteMovies;
      return this.favoriteMovieIds;
    });
  }

  /** 
   *  checks if movie is in user's list of favorites
   */
  isFavorite(movieID: string): boolean {
    // console.log("Movie ID " + movieID);
    const favmovie = this.favoriteMovieIds.includes(movieID);
    // console.log(this.favoriteMovieIds);
    // console.log(favmovie, movieID);
    return favmovie;
  };


  /** 
   * Adds or removes movie from user's list of favorites
   * @param id
   */

  onToggleFavoriteMovie(id: string): any {
    if (this.isFavorite(id)) {
      this.deleteMovies.deleteFavoriteMovie(id).subscribe((response: any) => {
        // this.getFavoriteMovies;
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.addFavMovie.addFavoriteMovie(id).subscribe((response: any) => {
        // this.getFavoriteMovies;
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
  }
}
