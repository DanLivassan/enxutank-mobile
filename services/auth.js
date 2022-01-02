import api from './api';



export const createUser = (user_data) => {

    return api.post('api/user/create/', user_data).then(res => {
        return { errors: false, data: res.data };
    }).catch(e => {
        if (e.response) {
            return { errors: true, data: e.response.data }
        }
        return { errors: false, data: e }

    })
}

export const createToken = (data) => {
    return api.post('api/user/token/', data).then(response => {
        if (response.status == 200) {
            return response.data
        }
    }).catch(e => {
        if (e.response) {
            console.log(e.response)
        }
    })
}

export const getMe = () => {
    return api.get('api/user/me/').then((res) => {
        return res.data
    }).catch(e => {
        return false
    })
}

export const updateToken = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
