import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  role: boolean = false;
  constructor() {
   
    
  }
   ngOnInit(): void {
    const aux = localStorage.getItem('role') || '';
    if (aux == 'true') {
      this.role=true;
    }else{
      this.role=false;
    }
   }
}
