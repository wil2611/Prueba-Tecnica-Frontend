import { Component, OnInit } from '@angular/core';
import { Users } from '../../interfaces/users';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    standalone: false
})
export class UserComponent implements OnInit {
  users: Users[] = [];
  selectedUser: Users | null = null;
  isEditing: boolean = false;
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.selectedUser = {
      id: 0,
      name: '',
      lastname: '',
      email: '',
      password: '',
      role: '',
      status: 'active',
    }; // Inicializar con un objeto vacío
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: Users[]) => {
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }
  searchTerms(): void {
    if (this.searchTerm.trim()) {
      this.users = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getUsers();

    }
  }

  selectUserToEdit(user: Users): void {
    this.isEditing = true;
    this.selectedUser = { ...user };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
    this.selectedUser = {
      id: 0,
      name: '',
      lastname: '',
      email: '',
      password: '',
      role: '',
      status: 'active',
    };
  }

  saveUser(): void {
    if (this.isEditing && this.selectedUser) {
      this.userService
        .updateUser(this.selectedUser.id!, this.selectedUser)
        .subscribe({
          next: () => {
            this.getUsers();
            this.cancelEdit();
          },
          error: (err) => console.error('Error updating user:', err),
        });
    } else if (this.selectedUser) {
      this.userService.createUser(this.selectedUser).subscribe({
        next: () => {
          this.getUsers();
          this.selectedUser = null;
          this.selectedUser = {
            id: 0,
            name: '',
            lastname: '',
            email: '',
            password: '',
            role: '',
            status: 'active',
          };
        },
        error: (err) => console.error('Error creating user:', err),
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => this.getUsers(),
      error: (err) => console.error('Error deleting user:', err),
    });
  }
}
