import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
 
} from 'ag-grid-community';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs/internal/Subscription';

import { CommonModule } from '@angular/common';
import { CustomCellRendererComponent } from '../../../shared/custom-cell-renderer/custom-cell-renderer.component';
import { ImageData } from '../../models/imageData/image-data.model';


interface CellRendererParams {
  value: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridModule, CommonModule, CustomCellRendererComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnDestroy {
  @ViewChild('myGrid') myGrid!: AgGridAngular;

  gridApi!: GridApi;
  imagesSubscription!: Subscription;

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      maxWidth: 100,
      valueGetter: 'node.id',
      cellRenderer: this.idCellRenderer,
    },
    {
      headerName: 'Author',
      field: 'author',
    },
    {
      headerName: 'Dimensions',
      field: 'dimensions',
    },
    {
      headerName: 'Image',
      field: 'url',
      cellRenderer: this.imageCellRenderer,
    },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    filter: true,
  };

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 30,
    rowBuffer: 30,
    rowSelection: 'multiple',
    rowModelType: 'infinite', // Virtual row model
    cacheBlockSize: 30, // Page size in cache
    cacheOverflowSize: 60, // Extra rows for vertical scroll
    maxConcurrentDatasourceRequests: 1, // Throttle requests during heavy scrolling
    infiniteInitialRowCount: 12, // Initial visible rows, includes a loading spinner row
    maxBlocksInCache: 4, // Cache size limit to prevent memory overflow
    debounceVerticalScrollbar: true,
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
      defaultToolPanel: 'columns',
    },
  };

  constructor(private imageService: ImageService) {}

  idCellRenderer(params: CellRendererParams): string {
    return params.value ? params.value : '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
  }

  imageCellRenderer(params: CellRendererParams): string {
    const url = params.value;

    if (!url) {
      return '<div class="image-cell"><img src="assets/loading.gif" alt="Placeholder"></div>';
    }

    const altText = 'Image Thumbnail';
    const width = 100;
    const height = 'auto';

    return `
    <div class="image-cell">
      <img
        src="${url}"
        alt="${altText}"
        width="${width}"
        height="${height}"
        class="loading"
        onload="this.classList.remove('loading');"
        onError="this.src='assets/placeholder.svg'; this.classList.remove('loading');"
      >
    </div>
  `;
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const pageSize = this.gridOptions.paginationPageSize || 30;
      const currentPage = Math.floor(params.startRow / pageSize) + 1;

      this.imagesSubscription?.unsubscribe();

      const observer = {
        next: (images: ImageData[]) => {
          const formattedImages = images.map((image) => ({
            id: image,
            author: image.author,
            dimensions: image.width && image.height ? `${image.width} x ${image.height}` : 'N/A',
            url: image.download_url,
          }));
          const lastRow = currentPage * pageSize >= 100 ? currentPage * pageSize : -1;
          params.successCallback(formattedImages, lastRow);
        },
        error: (error: Error) => {
          console.error('Error fetching images:', error);
          params.failCallback();
        },
      };

      this.imagesSubscription = this.imageService.getImages(currentPage, pageSize).subscribe(observer);
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
