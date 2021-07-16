import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {
  /**
   * Data from the movie-card component
   * @param data
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      ImagePath: string;
      description: string;
      director: string;
      genre: string;
      releaseYear: number;
      imdbRating: number;
    }

  ) { }

  ngOnInit(): void {
  }

}