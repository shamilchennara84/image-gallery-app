import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { ImageData } from '../../models/imageData/image-data.model';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';


@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule,SpinnerComponent],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  images: ImageData[] = [];
  imagesub!: Subscription;

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.imagesub = this.imageService
      .getImages(1)
      .subscribe((data: ImageData[]) => {
        this.images = data;
        this.images.forEach((image) => (image.loaded = false));
      });
  }

  onImageLoad(image: ImageData) {
    image.loaded = true;
  }

  ngOnDestroy(): void {
    this.imagesub.unsubscribe();
  }
}
