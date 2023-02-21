import Cookies from "js-cookie";

export default {
    state: {
        token: '',
        userMessage: {},
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
        },
    },
}