import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ImageData } from '../models/imageData/image-data.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  getImages(page: number, limit: number = 30): Observable<ImageData[]> {
    return this.http.get<ImageData[]>(
      `${this.baseUrl}?page=${page}&limit=${limit}`
    );
  }
}
