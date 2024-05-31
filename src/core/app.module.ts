import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ReportsComponent } from './pages/reports/reports.component';
// import { GridComponent } from './components/grid/grid.component';
// import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [AppComponent, ReportsComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
