import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs/internal/Subscription';

import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

interface CellRendererParams {
  value: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridModule, CommonModule, SpinnerComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnDestroy {
  @ViewChild('myGrid') myGrid!: AgGridAngular;

  gridApi!: GridApi;
  imagesSubscription!: Subscription;
  loading: boolean = false;

  columnDefs: ColDef[] = [
    {
      headerName: 'Author',
      field: 'author',
      filter: 'agTextColumnFilter',
  
    },
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
    pagination: true,
    paginationPageSize: 30,
    rowModelType: 'infinite',
    cacheBlockSize: 30,
    maxConcurrentDatasourceRequests: 2,
    cacheOverflowSize: 2,
   
  };

  constructor(private imageService: ImageService) {}

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.loading = true;
      const pageSize = this.gridOptions.paginationPageSize || 30;
      const currentPage = params.startRow / pageSize + 1;

      if (this.imagesSubscription) {
        this.imagesSubscription.unsubscribe();
      }

      this.imagesSubscription = this.imageService.getImages(currentPage, pageSize).subscribe(
        (images) => {
          const formattedImages = images.map((image) => ({
            author: image.author,
            dimensions: image.width && image.height ? `${image.width} x ${image.height}` : 'N/A',
            url: image.url,
          }));

          const lastRow = currentPage * pageSize >= 100 ? currentPage * pageSize : -1;
          params.successCallback(formattedImages, lastRow);
          this.loading = false;
        },
        (error) => {
          params.failCallback();
          this.loading = false;
        }
      );
    },
  };

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.setGridOption('datasource', this.dataSource);
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
