export interface Users {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  status: 'active' | 'desactive';
}
