import { Category } from './category';
import { Users } from './users';

export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'review' | 'completed' | 'deleted';
  assignedUserId: number;
  categoryId: number;
  assignedUser:Users;
  category: Category;
}