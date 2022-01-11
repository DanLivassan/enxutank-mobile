import React from "react";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORAGE_TOKEN } from "../constants/user.constants";
const API_URL = "http://ec2-3-142-52-18.us-east-2.compute.amazonaws.com"
const API_PORT = "8000"
const api = axios.create({
    baseURL: `${API_URL}:${API_PORT}`,
})

api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem(APP_STORAGE_TOKEN)
        config.headers.Authorization = token ? `Token ${token}` : null
        return Promise.resolve(config)
    },
    async error => {
        console.log("error", error.status_code)
        return Promise.reject(error)
    },
)

export default api



