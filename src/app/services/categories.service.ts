import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private appUrl: string;
  private apiUrl: string;
  
 constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint;
    this.apiUrl = 'api/categories';
  }
  // Obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.appUrl}${this.apiUrl}`);
  }
  

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.appUrl}${this.apiUrl}/${id}`);
  }

  // Crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.appUrl}${this.apiUrl}`, category);
  }

  // Actualizar una categoría existente
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.appUrl}${this.apiUrl}/${id}`, category);
  }

  // Eliminar una categoría
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}/${id}`);
  }

 
}
