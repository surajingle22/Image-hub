import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header">
      <div class="logo">
        <img src="assets/logo.png" alt="ImageHub Logo" />
        <span>ImageHub</span>
      </div>
      <nav>
        <a routerLink="/" class="nav-link">Home</a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: #ffffff;
      padding: 1rem 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      animation: slideDown 0.5s ease-out;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo img {
      height: 40px;
      width: auto;
    }

    .logo span {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .nav-link {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #007bff;
    }
  `]
})
export class HeaderComponent { }