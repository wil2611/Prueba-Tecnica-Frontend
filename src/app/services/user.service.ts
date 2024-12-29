import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from '../interfaces/users';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  signIn(user: Users): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  Login(user: User): Observable<string> {
    console.log(user);
    return this.http.post<string>(`${this.myAppUrl}api/login`, user);
  }

  getUserByEmail(email: string): Observable<Users> {
    return this.http.get<Users>(`${this.myAppUrl}${this.myApiUrl}/${email}`);
  }
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Crear un nuevo usuario
  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  // Actualizar un usuario
  updateUser(id: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.myAppUrl}${this.myApiUrl}/${id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}

