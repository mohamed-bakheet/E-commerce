export interface ProductDetails {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
 
  createdAt: string;
  updatedAt: string;
}