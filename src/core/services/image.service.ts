import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ImageData } from '../models/imageData/image-data.model';
import { map } from 'rxjs';
import { FilterModel } from 'ag-grid-enterprise';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  getImages(page: number, limit: number = 30, filterModel?: FilterModel): Observable<ImageData[]> {
    return this.http
      .get<ImageData[]>(`${this.baseUrl}?page=${page}&limit=${limit}`)
      .pipe(map((images) => this.applyFilters(images, filterModel)));
  }

  private applyFilters(images: ImageData[], filterModel?: FilterModel): ImageData[] {
    if (!filterModel) {
      return images;
    }

    return images.filter((image) => {
      return Object.keys(filterModel).every((key) => {
        const filterValue = filterModel[key].filter;
        if (!filterValue) {
          return true;
        }
        return image[key]?.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }
}