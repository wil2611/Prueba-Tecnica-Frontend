import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    standalone: false
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  isEditing: boolean = false;
  searchTerm: string = '';
  role: boolean | undefined;


  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
    this.isEditing = false;
    this.selectedCategory = { id: 0, name: '', description: '', status: 'active', createdAt: new Date(), updatedAt: new Date() }; // Crear un nuevo objeto vacío
    const aux = localStorage.getItem('role') || '';
    if (aux == 'true') {
      this.role=true;
    }else{
      this.role=false;
    }
  }

  // Obtener todas las categorías
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

  filterCategories(): void {
    if (this.searchTerm.trim()) {
      this.categories = this.categories.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getCategories();
    }
  }

  // Crear nueva categoría
  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe(
      (data) => {
        this.categories.push(data);
        alert('Categoría creada exitosamente!');
        this.getCategories(); // Refrescar la lista de categorías
        this.selectedCategory = { id: 0, name: '', description: '', status: 'active', createdAt: new Date(), updatedAt: new Date() }; // Crear un nuevo objeto vacío

      },
      (error) => {
        console.error('Error creating category', error);
      }
    );
  }


  // Seleccionar categoría para editar
  selectCategoryToEdit(category: Category): void {
    this.selectedCategory = { ...category };
    this.isEditing = true;
  }

  // Actualizar categoría
  updateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService
        .updateCategory(this.selectedCategory.id!, this.selectedCategory)
        .subscribe(
          (data) => {
            this.getCategories(); // Refrescar la lista de categorías
            this.isEditing = false;
            alert('Categoría actualizada exitosamente!');
          },
          (error) => {
            console.error('Error updating category', error);
          }
        );
    }
  }

  // Eliminar categoría
  deleteCategory(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.getCategories(); // Refrescar la lista de categorías
          alert('Categoría eliminada exitosamente!');
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    }
  }

  // Cancelar edición
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedCategory = { id: 0, name: '', description: '', status: 'active', createdAt: new Date(), updatedAt: new Date() }; // Crear un nuevo objeto vacío
  }
}
