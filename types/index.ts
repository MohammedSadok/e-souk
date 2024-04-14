export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: Category;
  images: Image[];
  colors: Color[];
  sizes: Size[];
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  imageUrl: string;
}

export interface Color {
  id: number;
  name: string;
  hexValue: string;
}

export interface Size {
  id: number;
  name: string;
  value: string;
}

export interface User {
  email: string;
  userName: string;
  isLoggedIn: boolean;
}
export interface UserLogin {
  email: string;
  password: string;
}
