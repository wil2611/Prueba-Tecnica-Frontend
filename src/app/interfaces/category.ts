export interface Category {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'desactive';
  createdAt: Date;
  updatedAt: Date;
}