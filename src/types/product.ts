
export interface ProductSpecification {
  color: string;
  finish: string[];
  thickness: string[];
  sizes: string[];
}

export interface ProductApplication {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  origin: string;
  image: string;
  gallery?: string[];
  description: string;
  specifications: ProductSpecification;
  applications: ProductApplication[];
  isImported: boolean;
  isPopular?: boolean;
  inStock?: boolean;
  price?: number;
}
