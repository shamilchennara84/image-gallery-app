import { Component } from '@angular/core';

import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
  ,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];

  defaultColDef = {
    flex:1,
    midWidth:100
  }
}


  // template: `
  //   <!-- The AG Grid component -->
  //   <ag-grid-angular [rowData]="rowData" [columnDefs]="colDefs" [defaultColDef]="defaultColDef" style="height:500px; width:100vw" class="ag-theme-quartz">
  //   </ag-grid-angular>
    
  // `
