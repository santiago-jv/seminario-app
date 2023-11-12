import { create } from "zustand";
import {  ProductActions, ProductStore  } from "./product-store.interface";
import { getProductsByUserId } from "./product.actions";

const useProductStore = create<ProductStore & ProductActions>((set) => ({
  products: [],
  async getProductsByUserId(userId:string) {
    set(({
        products: await getProductsByUserId(userId),
    }));
  },
}));

export default useProductStore;
