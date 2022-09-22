import axios from './axios'

export const getMenu = (param) => {
    return axios({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios({
        url: '/home/getData',
        method: 'get'
    })
}

export const getUser = (params) => {
    return axios({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

// export const getMenu = (params) => {
//     return axios.request({
//         url: '/permission/getMenu',
//         method: 'post',
//         data: param
//     })
// }