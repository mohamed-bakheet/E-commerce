export interface SubcategoriesResponse {
  status: number;
  results: number;
  data: Subcategory[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
}
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}