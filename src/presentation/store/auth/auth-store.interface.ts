import { UserModel } from "../../../domain/models/auth/user.model";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";

export interface AuthStore {
  user: UserModel | null;
}

export interface AuthActions {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}
