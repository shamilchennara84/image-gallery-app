import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { GridComponent } from './components/grid/grid.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

const routes: Routes = [
  { path: '', redirectTo: '/reports/grid', pathMatch: 'full' },
  {
    path: 'reports',
    component: ReportsComponent,
    children: [
      {
        path: 'grid',
        component: GridComponent,
      },
      { path: 'gallery', component: ImageGalleryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
