export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  imgUrl?: string;
  bookIds?: string[];
  reviewIds?: string[];
}
