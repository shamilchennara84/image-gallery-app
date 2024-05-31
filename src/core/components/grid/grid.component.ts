import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ImageRowData } from '../../models/imageRowData/row-data.model';

interface CellRendererParams {
  value: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnDestroy {
  @ViewChild('myGrid') myGrid!: AgGridAngular;

  gridApi!: GridApi;
  imagesSubscription!: Subscription;
  currentPage = 1;
  pageSize = 30;

  columnDefs: ColDef[] = [
    { headerName: 'Author', field: 'author', filter: 'agTextColumnFilter' },
    {
      headerName: 'Dimensions',
      field: 'dimensions',
    },
    {
      headerName: 'Image Link',
      field: 'url',
      cellRenderer: (params: CellRendererParams) =>
        `<a href="${params.value}" target="_blank" style="text-decoration:none">${params.value}</a>`,
      sortable: false,
    },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  gridOptions: GridOptions = {
    rowModelType: 'clientSide',
    paginationPageSize: this.pageSize,
  };

  constructor(private imageService: ImageService) {}

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.loadPage(this.currentPage);
  }
  loadPage(page: number): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }

    this.imagesSubscription = this.imageService.getImages(page, this.pageSize).subscribe((images) => {
      const formattedImages = images.map((image) => ({
        author: image.author,
        dimensions: image.width && image.height ? `${image.width} x ${image.height}` : 'N/A',
        url: image.url,
      }));

      this.gridApi.setRowData(formattedImages);
    });
  }

  onNextPage(): void {
    this.currentPage++;
    this.loadPage(this.currentPage);
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
