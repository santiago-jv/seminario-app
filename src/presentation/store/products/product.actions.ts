import { firebaseService } from "../../../infrastructure/firebase/services/firebase.service";
import { DefaultValues } from "../../../global.constants";
import { ProductCollection } from "../../../infrastructure/firebase/config/schema/product.schema";
import { ProductListResponse } from "../../../infrastructure/firebase/responses/product-list.response";
import { ProductModel } from "../../../domain/models/product/product.model";

export const getProductsByUserId = async (userId:string): Promise<ProductModel[]> => {
  try {
    const data = (await firebaseService.getValueUsingWhereClause(ProductCollection.COLLECTION_NAME, ProductCollection.USER_ID_FIELD, userId)) as ProductListResponse[];

    console.log(data);

    return []
  } catch (error: any) {
    console.error(error);

    throw Error(DefaultValues.INTERNAL_ERROR_MESSAGE);
  }
};
