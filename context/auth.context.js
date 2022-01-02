import { createContext, useContext, useEffect, useState } from "react";
import * as authService from '../services/auth';
import { APP_STORAGE_TOKEN } from '../constants/user.constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({ user: null })

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: {} })
    const [token, setToken] = useState(null)

    const performLogin = ({ email, password }) => {
        const f = async () => {
            const res = await authService.createToken({ email, password })
            if (res.token) {
                try {
                    await AsyncStorage.setItem(APP_STORAGE_TOKEN, res.token);
                    authService.updateToken(res.token);
                    setToken(res.token)
                    window.location.reload()
                }
                catch (e) {
                    return false
                }
            }
            return false

        }
        f()
    }

    const performLogout = () => {
        AsyncStorage.clear().then(() => {
            setUser({ name: "" });
            setToken(null);
        });
    }

    useEffect(() => {
        const f = async () => {
            const token = await AsyncStorage.getItem(APP_STORAGE_TOKEN)
            setToken(token)
            const user = await authService.getMe()
            setUser(user)
        }
        f();
    }, [])

    return (
        <UserContext.Provider
            value={{
                performLogin,
                user,
                token,
                setToken,
                performLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(UserContext);
    return context;
}