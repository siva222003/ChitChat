import { createContext } from "react";
import { LoginType } from "../types/auth.types";
import { loginValue } from "../utils/constants";

type AuthContextType = {
    isAuthenticated : boolean
    login: LoginType
}

const AuthContextValue = {
    isAuthenticated : false,
    login: async () => loginValue
}

const AuthContext = createContext<AuthContextType>(AuthContextValue)

export default AuthContext

