import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Movie } from '../interfaces/movie.interface';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: "./movie-detail.html",
  styleUrl: "./movie-detail.scss"
})
export class MovieDetail implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Загружаем фильм с ID:', id);
    
    this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        console.log('Фильм загружен:', data);
        this.movie = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки фильма:', err);
        this.movie = null;
        this.cdr.detectChanges();
      }
    });
  }
  goBack() {
    this.router.navigate(['']);
  }
}