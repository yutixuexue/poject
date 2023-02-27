import Cookies from "js-cookie";

export default {
    state: {
        token: '',
        userMessage: {},
        adminRouter: {
            "/user": {
                path: '/user',
                name: 'user',
                component: 'User',
            },
            "/page1": {
                path: '/page1',
                name: 'page1',
                component: 'Page1',
            },
            "/page2": {
                path: '/page2',
                name: 'page2',
                component: 'Page2',
            }
        },
    },

    mutations: {
        setToken(state, value) {
            state.token = value;
            Cookies.set('token', value);
        },
        clearToken(state) {
            state.token = '';
            Cookies.remove('token');
        },
        getToken(state) {
            state.token = Cookies.get('token') || state.token;
        }
    },
}