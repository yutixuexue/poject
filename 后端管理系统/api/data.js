import axios from './axios'

//{username, password}
export const Login = (param) => {
    return axios({
        url: '/login',
        method: 'post',
        data: JSON.stringify(param)
    })
}

//获取图表的数据
export const getData = () => {
    return axios({
        url: '/getData',
        method: 'get'
    })
}

//{page: this.config.page, name} {用户列表的第几位，查询的用户名}
export const getUser = (params) => {
    return axios({
        url: '/getUser',
        method: 'get',
        params
    })
}

//要修改的用户的信息
export const edit = (params) => {
    return axios({
        url: '/edit',
        method: 'post',
        data: JSON.stringify(params)
    })
}

//要增加的用户的信息
export const add = (params) => {
    return axios({
        url: '/add',
        method: 'post',
        data: JSON.stringify(params)
    })
}

//要删除的用户的id
export const del = (params) => {
    return axios({
        url: '/del',
        method: 'post',
        params
    })
}