import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  toggleAuth: (value: boolean) => null
});
