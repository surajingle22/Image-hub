import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PhotoComponent } from './photo.component';
import { UnsplashService } from '../services/unsplash.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule, PhotoComponent],
  template: `
    <main>
      <section class="search">
        <form (submit)="handleSubmit($event)">
          <input
            type="text"
            [ngModel]="query()"
            (ngModelChange)="query.set($event)"
            name="query"
            class="form-input"
            placeholder="Search for images..."
          />
          <button type="submit" class="submit-btn">
            <fa-icon [icon]="faSearch"></fa-icon>
          </button>
        </form>
      </section>
      <section class="photos">
        <div class="photos-center">
          <app-photo
            *ngFor="let photo of photos()"
            [photo]="photo"
          ></app-photo>
        </div>
        <h2 class="loading" *ngIf="loading()">Loading...</h2>
      </section>
    </main>
  `,
  styles: [`
    :host {
      min-height: 100vh;
      display: block;
    }

    .search {
      padding: 2rem 0;
      width: 90vw;
      max-width: 1170px;
      margin: 0 auto;
    }

    .search form {
      display: flex;
      gap: 1rem;
    }

    .form-input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 1rem;
      background: #f1f5f8;
    }

    .submit-btn {
      padding: 0.5rem 1rem;
      background: #2caeba;
      border: none;
      border-radius: 0.25rem;
      color: white;
      cursor: pointer;
      transition: all 0.3s linear;
    }

    .submit-btn:hover {
      background: #88ebf2;
    }

    .photos {
      padding: 2rem 0;
    }

    .photos-center {
      width: 90vw;
      max-width: 1170px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      place-items: center;
    }

    .loading {
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class HomeComponent {
  faSearch = faSearch;
  query = signal('');
  photos = signal<any[]>([]);
  loading = signal(false);
  page = signal(1);

  constructor(private unsplashService: UnsplashService) {
    // Set up infinite scroll
    effect(() => {
      const handleScroll = () => {
        if (
          !this.loading() &&
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
        ) {
          this.page.set(this.page() + 1);
          this.fetchImages();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });

    // Initial load
    this.fetchImages();
  }

  fetchImages() {
    this.loading.set(true);
    
    if (this.query()) {
      this.unsplashService.searchPhotos(this.query(), this.page()).subscribe({
        next: (data) => {
          if (this.page() === 1) {
            this.photos.set(data.results);
          } else {
            this.photos.update(prev => [...prev, ...data.results]);
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    } else {
      this.unsplashService.getPhotos(this.page()).subscribe({
        next: (data) => {
          if (this.page() === 1) {
            this.photos.set(data);
          } else {
            this.photos.update(prev => [...prev, ...data]);
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.page.set(1);
    this.photos.set([]);
    this.fetchImages();
  }
}
