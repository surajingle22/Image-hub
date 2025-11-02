import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  constructor(private http: HttpClient) { }

  getPhotos(page: number = 1): Observable<any> {
    return this.http.get(`${environment.unsplashBaseUrl}photos/`, {
      params: {
        client_id: environment.unsplashApiKey,
        page: page.toString()
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching photos:', error);
        throw error;
      })
    );
  }

  searchPhotos(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.unsplashBaseUrl}search/photos`, {
      params: {
        client_id: environment.unsplashApiKey,
        query,
        page: page.toString()
      }
    }).pipe(
      map(response => response as { results: any[] }),
      catchError(error => {
        console.error('Error searching photos:', error);
        throw error;
      })
    );
  }
}
