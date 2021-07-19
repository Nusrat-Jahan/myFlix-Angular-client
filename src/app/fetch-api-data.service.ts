import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movie-app.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
/**
 * API call to register new user account
 * @returns
 */
export class UserRegistrationService {
  /**
   * This constructor Inject the HttpClient module to the constructor params
   *This will provide HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) { }

  /**
   *  Making the api call for the user registration endpoint
   * @param userDetails Username, password, email and date of birth.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    /** .pipe() function is from RxJS, a reactive programming library for JavaScript, 
     *and is used to combine multiple functions into a single function
     */
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Handles errors to register new user account
  * @param error
  * @returns
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) { }

  /**
   * Making the api call for the user LOGIN endpoint
   * @param userDetails Username, password.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) { }

  /**
  * Making the API call to movies endpoint
  * @returns array of movies objects.
  */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetOneMoviesService {
  constructor(private http: HttpClient) { }

  /**
  * Making the API call to the movie title endpoint
  * @returns single movie object.
  */
  public getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetMovieDirectorService {
  constructor(private http: HttpClient) { }

  /**
   * Making the API call to director name endpoint
   * @returns single director details object
   */
  public getOneDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // non-typed response extraction
  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetMovieGenreService {
  constructor(private http: HttpClient) { }

  /**
   * Making the API call to genre name endpoint
   * @returns single genre details object
   */
  public getOneGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}


// API call to fetch user account details
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) { }

  /**
  * Making the API call to user endpoint
  * @returns user object
  */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    console.log(res);
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

// Get favourite movies for a user
@Injectable({
  providedIn: 'root',
})
export class GetFavoriteMoviesService {
  constructor(private http: HttpClient) { }

  /**
  * Making the API call to movieID endpoint
  * @returns user's favorite movies array.
  */
  getUserFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}/movies/:MovieID`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) { }

  /**
   * API call to add a movie from a users favorites
   * @param id
   * @returns
   */
  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${user}/movies/${id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) { }

  /**
  * API call to delete a movie from a users favorites
  * @param id
  * @returns
  */
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/movies/${id}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) { }

  /**
    * Making the API call to edit a user account information.
    * @param userDetails username, password, email and date of birth.
    * @returns user object
    */
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + user, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) { }

  /**
  * Making the API call to delete the user account.
  * @returns
  */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}