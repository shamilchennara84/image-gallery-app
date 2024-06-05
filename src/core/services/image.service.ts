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
  // Base URL for fetching images
  private baseUrl = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  // Fetches images based on pagination and optional filters
  getImages(page: number, limit: number = 30, filterModel?: FilterModel): Observable<ImageData[]> {
    return this.http
      .get<ImageData[]>(`${this.baseUrl}?page=${page}&limit=${limit}`)
      .pipe(map((images) => this.applyFilters(images, filterModel)));
  }

  // Applies filters to the fetched images
  private applyFilters(images: ImageData[], filterModel: any): ImageData[] {
    if (!filterModel) {
      return images;
    }

    return images.filter((image) => {
      return Object.keys(filterModel).every((key) => {
        const filter = filterModel[key];
        const filterValue = filter.filter;

        if (filter.filterType === 'text') {
          const value = image[key]?.toString().toLowerCase();
          const filterText = filterValue?.toLowerCase();
          const filterCondition = filter.type || 'contains'; // Default to contains if no type specified

          // Switch statement for handling different filter conditions
          switch (filterCondition) {
            case 'contains':
              return value?.includes(filterText);
            case 'notContains':
              return !value?.includes(filterText);
            case 'equals':
              return value === filterText;
            case 'notEqual':
              return value !== filterText;
            case 'startsWith':
              return value?.startsWith(filterText);
            case 'endsWith':
              return value?.endsWith(filterText);
            case 'blank':
              return value == null || value === '';
            case 'notBlank':
              return value != null && value !== '';
            default:
              return true;
          }
        }

        return true;
      });
    });
  }
}