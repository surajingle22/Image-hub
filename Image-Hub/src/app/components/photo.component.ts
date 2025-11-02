import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="photo">
      <img [src]="photo.urls.regular" [alt]="photo.alt_description" />
      <div class="photo-info">
        <div>
          <h4>{{photo.user.name}}</h4>
          <p>{{photo.likes}} likes</p>
        </div>
        <a [href]="photo.user.portfolio_url" target="_blank">
          <img [src]="photo.user.profile_image.medium" [alt]="photo.user.name" class="user-img"/>
        </a>
      </div>
    </article>
  `,
  styles: [`
    .photo {
      height: 17.5rem;
      position: relative;
      overflow: hidden;
    }

    .photo > img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .photo-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0.5rem;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      transform: translateY(100%);
      transition: all 0.3s linear;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .photo:hover .photo-info {
      transform: translateY(0);
    }

    .photo-info h4 {
      margin-bottom: 0.3rem;
      font-size: 1rem;
    }

    .photo-info p {
      margin-bottom: 0;
      font-size: 0.8rem;
    }

    .user-img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  `]
})
export class PhotoComponent {
  @Input() photo: any;
}
