import { createContext } from "react";
import * as authService from '../services/auth';

const userContext = createContext({ user: null })

const UserProvider = () => {

    const performLogin = ({ email, password }) => {
        const f = async () => {
            const token = await authService.create_token({ email, password })

        }
        f()
    }
}