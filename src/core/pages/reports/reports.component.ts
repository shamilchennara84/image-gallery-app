import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  selectedTab = 'grid';

  constructor(private router: Router) {}

  onTabClick(tabName:string){
      this.selectedTab = tabName
      this.updateUrl(tabName)
  }

  updateUrl(tabName:string){
    if(tabName==='grid'){
      this.router.navigate(['/gallery'])
    }else{
      this.router.navigate(['/grid'])
    }
  }
}
