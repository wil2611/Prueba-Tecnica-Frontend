import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tasks } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private appUrl: string;
  private apiUrl: string;
  
 constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint;
    this.apiUrl = 'api/tasks';
  }
  
  // Get all tasks
  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.appUrl}${this.apiUrl}`);
  }

  // Get task by ID
  getTaskById(id: number): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.appUrl}${this.apiUrl}/${id}`);
  }

  // Create a new task
  createTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.appUrl}${this.apiUrl}`, task);
  }

  // Update an existing task
  updateTask(id: number, task: Partial<Tasks>): Observable<Tasks> {
    console.log('prueba de tos', task); 
    return this.http.put<Tasks>(`${this.appUrl}${this.apiUrl}/${id}`, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    console.log('prueba de tos',id);
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}/${id}`);
  }
}
