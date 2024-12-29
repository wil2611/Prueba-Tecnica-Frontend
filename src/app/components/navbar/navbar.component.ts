import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  role: boolean | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const aux = localStorage.getItem('role') || '';
    if (aux == 'true') {
      this.role=true;
    }else{
      this.role=false;
    }
  }

  logOut() {
    
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
