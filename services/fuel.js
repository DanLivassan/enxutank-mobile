import api from "./api";

export const getAll = () => {
    return api.get('api/fuel/').then(res => {
        if (res.status == 200) {
            return res.data;
        }
    })
}