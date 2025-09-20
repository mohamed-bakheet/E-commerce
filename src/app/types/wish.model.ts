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

export interface WishItem {
  _id: string;
  id?: string;
  title: string;
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
  sold?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
 
}

export interface WishResponse {
  count: number;
  data: WishItem[];
  status?: string;
 
}