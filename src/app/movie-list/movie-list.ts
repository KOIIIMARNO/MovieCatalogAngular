import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedMovie: Movie | null = null;

  constructor(private movieService: MovieService, private router: Router) {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
      },
      error: (err) => console.error('Ошибка загрузки:', err)
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredMovies = this.movies;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(term)
      );
    }
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }

  openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

  closeModal() {
    this.selectedMovie = null;
  }

  openMoviePage() {
    if (!this.selectedMovie) return;
    const id = this.selectedMovie.id;
    this.router.navigate(['/movie', id]).then(() => {
      this.closeModal();
    });
  }
}