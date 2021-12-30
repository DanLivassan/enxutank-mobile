import axios from 'axios';
import { api } from './api';
export const create_user = (user_data) => {

    api.post('api/user/create/', user_data).then(res => { console.log(res) })
}

export const create_token = (data) => {
    return api.post('api/user/token/', data).then(response => {
        return response.data
    }).catch(e => {
        return { error }
    })
}

export const get_me = (token) => {

}