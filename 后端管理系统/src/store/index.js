import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab.js';
import user from './user.js';
import asideMenu from './asideMenu';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tab,
        user,
        asideMenu,
    }
})