import { createContext } from "react";
import { LoginType } from "../types/auth.types";
import { loginValue } from "../utils/constants";
import { FriendsType, UserType } from "../types/user.types";

type AuthContextType = {
    isAuthenticated : boolean
    isLoading : boolean
    login: LoginType
    user : UserType | null
}

const AuthContextValue = {
    isAuthenticated : false,
    isLoading : false,
    user : null,
    login: async () => loginValue,
}

const AuthContext = createContext<AuthContextType>(AuthContextValue)

export default AuthContext

