import Cookies from "js-cookie";
import axios from 'axios'

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

        // setUserMessage(state, account, profile) {
        //     state.userMessage = { ...account, ...profile };
        // }
    },

    // actions: {
    //     getUserMessage(context) {
    //         if (!context.userMessage) {
    //             axios.get("/user/account").then((res) => {
    //                 if (res.status >= 200 && res.status < 300) {
    //                     context.commit('setUserMessage', { ...res.data.account, ...res.data.profile });
    //                 }
    //             })
    //         }
    //     }
    // }
}