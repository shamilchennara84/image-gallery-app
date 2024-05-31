import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, PaginationChangedEvent } from 'ag-grid-community';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ImageRowData } from '../../models/imageRowData/row-data.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit, OnDestroy {
  paginationSize:number = 30
  private imagesSubscription: Subscription | undefined;
  rowData: ImageRowData[] = [];
  colDefs: ColDef[] = [
    { headerName: 'Author', field: 'author' },
    {
      headerName: 'Dimensions',
      field: 'dimensions',
      // valueGetter: (params) => `${params.data.width} x ${params.data.height}`,
    },
    { headerName: 'URL', field: 'url' },{
      headerName: 'Download Link',field:'dLink'
    }
  ];

  paginationPageSize = 30;
  defaultColDef = {
    flex: 1,
    midWidth: 100,
  };
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.fetchData(1);
  }

  fetchData(page: number): void {
    this.imagesSubscription = this.imageService
      .getImages(page)
      .subscribe((images) => {
        console.log(images[0]?.width);
        this.rowData = images.map((image) => ({
          author: image.author,
          dimensions: image.width && image.height
         ? `${image.width.toString()} x ${image.height.toString()}`
          : 'N/A',
          url: image.url,
          dLink:image.download_url
        }));
      });
  }

  onPageChanged(event: PaginationChangedEvent<any, any>): void {
    const currentPage = event.api.paginationGetCurrentPage() + 1;
    const pageSize = event.api.paginationGetRowCount();
    const startRow = currentPage * pageSize + 1;
    const endRow = Math.min(
      startRow + pageSize - 1,
      event.api.getDisplayedRowCount()
    );

    console.log(`Show rows from ${startRow} to ${endRow}`);
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
