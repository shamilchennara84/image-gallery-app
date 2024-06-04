import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-cell-renderer',
  standalone:true,
  templateUrl: './custom-cell-renderer.component.html',
  styleUrl: './custom-cell-renderer.component.scss',
})
export class CustomCellRendererComponent {
  eGui!: HTMLImageElement;

  init() {
    this.eGui = document.createElement('img');
    this.eGui.src = 'https://www.ag-grid.com/example-assets/loading.gif';
  }

  getGui() {
    return this.eGui;
  }
}
