import Cookies from "js-cookie";
export default {
    state: {
        menu: [],
    },
    mutations: {
        clearMenu(state) {
            state.menu = [];
            Cookies.remove('asideMenu');
        },
        getMenu(state) {
            state.menu = JSON.parse(Cookies.get('asideMenu')) || state.menu;
        },
        addMenu(state, data) {
            state.menu = data;
            Cookies.set('asideMenu', JSON.stringify(data));
        }
    }
}