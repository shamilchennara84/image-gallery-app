import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { ImageData } from '../../models/imageData/image-data.model';

@Component({
  selector: 'app-image-gallery',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
})
export class ImageGalleryComponent implements OnInit {
  images:ImageData[] = []

  constructor(private imageService:ImageService){

  }
  ngOnInit(): void {
      this.imageService.getImages(1).subscribe((data:ImageData[])=>{
        this.images = data
      })
  }


}
