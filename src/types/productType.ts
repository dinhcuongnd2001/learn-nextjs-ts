
export type Product = {
  id: string;
  name: string;
  description?: string;
  thumbnail: string;
  baseCost: number;
  productVariations: ProductVariant[];
};

export type ProductVariant = {
  name: string, 
  value: string
}

export type ProductQueryParams = {
  pageNo: number, 
  pageSize: number;
  name?: string;
  slug?: string;
  categoryId?: string[];
  sortBy?: "id" | "name" | "baseCost"
}

export type ProductRequest = Omit<Product, 'id' | 'productVariations'> & {
  categories: string[];
  productVariations: ProductVariationRequest[]
};

export type ProductVariationRequest = {
  price: number;
  inventory: number;
  variantAttributes: {value: string, attribute: string}[];
};

