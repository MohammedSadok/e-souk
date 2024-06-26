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
  id: number;
  email: string;
  userName: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserRegister {
  email: string;
  password: string;
  userName: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  size: Size;
  color: Color;
  product: Product;
}

export interface Order {
  id: number;
  dateCreated: string;
  status: string;
  orderItems: OrderItem[];
}
export interface OrderItemRequest {
  productId: number;
  quantity: number;
  sizeId: number;
  colorId: number;
}

export interface OrderRequest {
  userId: number;
  orderItemRequests: OrderItemRequest[];
  status: string;
}
