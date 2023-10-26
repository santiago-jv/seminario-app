import { UserModel } from "../../../domain/models/auth/user.model";
import { firebaseService } from "../../../infrastructure/firebase/services/firebase.service";
import { LoginResponse } from "../../../infrastructure/firebase/responses/login.response";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";
import { DefaultValues, LocalDBKeys } from "../../../global.constants";
import { UserCollection } from "../../../infrastructure/firebase/config/schema/user.schema";

export const login = async (requestData: LoginRequest): Promise<UserModel | null> => {
  try {
    const data = (await firebaseService.getValueUsingWhereClause(UserCollection.COLLECTION_NAME, UserCollection.EMAIL_FIELD, requestData.email)) as LoginResponse;

    if (!data) {
      throw Error(DefaultValues.USER_NOT_FOUND_MESSAGE);
    }

    if (data.password != requestData.password) {
      throw Error(DefaultValues.USER_NOT_FOUND_MESSAGE);
    }

    localStorage.setItem(LocalDBKeys.AUTH, JSON.stringify(data));
    
    return {
      email: data.email,
      name: data.name,
      bussinessName: data.bussinessName,
      userId: data.userId,
      password: data.password,
    };
  } catch (error: any) {
    console.error(error);

    throw Error(DefaultValues.INTERNAL_ERROR_MESSAGE);
  }
};
