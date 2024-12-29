import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  login() {
    // Validamos que el usuario ingrese datos
    if (this.email == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el body
    const user: User = {
      email: this.email,
      password: this.password,
    };

    this.loading = true;
    this._userService.Login(user).subscribe({
      next: (token) => {
        const token2 = JSON.parse(JSON.stringify(token));
        localStorage.setItem('token', token2.token);
        this._userService.getUserByEmail(this.email).subscribe({
          next: (data) => {
            localStorage.setItem('role', (data.role == "admin").toString());
          },
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
        
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
    });
  }
}
