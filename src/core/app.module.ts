import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ReportsComponent } from './pages/reports/reports.component';
import { GridComponent } from './components/grid/grid.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

@NgModule({
  declarations: [AppComponent, ReportsComponent, GridComponent, ImageGalleryComponent],
  imports: [BrowserModule, AppRoutingModule, AgGridAngular, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
