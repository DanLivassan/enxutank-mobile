import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORAGE_TOKEN } from "../constants/user.constants";
const api = axios.create({
    baseURL: "http://localhost:8000",
})

api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem(APP_STORAGE_TOKEN)
        config.headers.Authorization = token ? `Token ${token}` : null
        return Promise.resolve(config)
    },
    error => {
        return Promise.reject(error)
    },
)

export default api



