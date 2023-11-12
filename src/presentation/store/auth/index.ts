import { create } from "zustand";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";
import { login } from "./auth.actions";
import { AuthActions, AuthStore } from "./auth-store.interface";

const useAuthStore = create<AuthStore & AuthActions>((set) => ({
  user: null,
  login: async (data: LoginRequest) => {
    set({
      user: await login(data),
    });
  },
  logout: () =>
    set(() => {
      localStorage.removeItem("auth");
      
      return {
        user: null,
      };
    }),
}));

export default useAuthStore;
