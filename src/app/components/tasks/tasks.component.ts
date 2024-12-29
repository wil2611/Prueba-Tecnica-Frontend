import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../interfaces/tasks';
import { TasksService } from '../../services/tasks.service';
import { Users } from '../../interfaces/users';
import { Category } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    standalone: false
})
export class TasksComponent implements OnInit {
  task: Tasks[] = [];
  selectedTask: Tasks | null = null;
  isEditing: boolean = false;
  searchTerm: string = '';
  filteredTasks: Tasks[] = [];
  categories: Category[] = [];
  users: Users[] =[];
  role: boolean | undefined;

  constructor(
    private taskService: TasksService,
    private categoryService: CategoriesService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    
    const aux = localStorage.getItem('role') || '';
    if (aux == 'true') {
      this.role=true;
      this.getUsers();
    this.getCategories();
    }else{
      this.role=false;
    }
    this.isEditing = false;
    this.selectedTask = {
      id: 0,
      title: '',
      description: '',
      status: 'pending',
      assignedUserId: 0,
      categoryId: 0,
      assignedUser: {} as Users,
      category: {} as Category,
    }; // Crear un nuevo objeto vac
  }
  getUsers(): void {
    this.UserService.getUsers().subscribe({
      next: (data: Users[]) => {
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]): void => {
        this.categories = data;
      },
      error: (error: any): void => {
        console.error('Error fetching categories', error);
      },
      complete: (): void => {
        console.log('Category fetch complete');
      },
    });
  }
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Tasks[]) => {
        this.task = data;
        console.log('Tasks', data);
        this.filteredTasks = data; // Inicialmente, mostrar todas las tareas
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
      complete: () => {
        console.log('Task fetch complete');
      },
    });
  }

  // Filtrar tareas por término de búsqueda
  filterTasks(): void {
    if (this.searchTerm.trim()) {
      this.filteredTasks = this.task.filter((task) =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getTasks();
    }
  }

  // Crear una nueva tarea
  createTask(task: Tasks): void {
    this.taskService.createTask(task).subscribe({
      next: (data) => {
        this.task.push(data);
        alert('¡Tarea creada exitosamente!');
        this.getTasks(); // Refrescar la lista de tareas
        this.selectedTask = null; // Limpiar la tarea seleccionada
      },
      error: (error) => {
        console.error('Error creating task', error);
      },
    });
  }

  // Seleccionar una tarea para editar
  selectTaskToEdit(task: Tasks): void {
    this.selectedTask = { ...task }; // Clonar para evitar mutación directa
    this.isEditing = true;
  }

  // Actualizar una tarea existente
  updateTask(): void {
    if (this.selectedTask) {
      console.log('Updating task', this.selectedTask);
      this.taskService
        .updateTask(this.selectedTask.id!, this.selectedTask)
        .subscribe({
          next: () => {
            this.getTasks(); // Refrescar la lista de tareas
            this.isEditing = false;
            console.log('Task updated', this.selectedTask);
            this.selectedTask = {
              id: 0,
              title: '',
              description: '',
              status: 'pending',
              assignedUserId: 0,
              categoryId: 0,
              assignedUser: {} as Users,
              category: {} as Category,
            }; // Crear un nuevo objeto vac
            alert('¡Tarea actualizada exitosamente!');
          },
          error: (error) => {
            console.error('Error updating task', error);
          },
        });
    }
  }

  // Eliminar una tarea
  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.getTasks(); // Refrescar la lista de tareas
          alert('¡Tarea eliminada exitosamente!');
        },
        error: (error) => {
          console.error('Error deleting task', error);
        },
      });
    }
  }

  // Cancelar edición
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedTask = {
      id: 0,
      title: '',
      description: '',
      status: 'pending',
      assignedUserId: 0,
      categoryId: 0,
      assignedUser: {} as Users,
      category: {} as Category,
    }; // Crear un nuevo objeto vac
  }
}
