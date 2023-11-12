import { ProductModel } from "../../../domain/models/product/product.model";

export interface ProductStore {
  products: ProductModel[];
}

export interface ProductActions {
  getProductsByUserId: (userId: string) => Promise<ProductModel>;
}
