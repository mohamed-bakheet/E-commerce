export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category?: string;
}

export interface Product {
  _id: string;
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  quantity?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  imageCover?: string;
  images?: string[];
  brand?: Brand;
  category?: Category;
  subcategory?: Subcategory[];
  [key: string]: any;
}

export interface CartItem {
  count: number;
  price: number;
  product: Product;
}

export interface Cart {
    satus: string;
    cartId: string;
 data:{ _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
 };
 numOfCartItems: number;

}