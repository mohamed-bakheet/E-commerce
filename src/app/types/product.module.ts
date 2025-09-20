export interface Products {
    sold: number;
    images: string[];
    subcategory: Cat[];
    ratingsQuantity: number;
    _id: string;
    description: string;
    title: string;
    slug: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface Cat {
    _id:string,
          name:string,
          slug: string,
          category: string,
}

interface Category {
    _id:string,
          name:string,
          slug: string,
          image: string,
}

