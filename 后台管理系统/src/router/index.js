import VueRouter from "vue-router";
import Home from "@/components/body/Home"
import Mall from "@/components/body/Mall"
import User from "@/components/body/User"
import Page1 from "@/components/body/Page1"
import Page2 from "@/components/body/Page2"
import Login from "@/components/body/Login"
import store from "@/store";

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/mall',
            name: 'mall',
            component: Mall,
        },
        {
            path: '/user',
            name: 'user',
            component: User,
        },
        {
            path: '/page1',
            name: 'page1',
            component: Page1,
        },
        {
            path: '/page2',
            name: 'page2',
            component: Page2,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('getToken');
    const token = store.state.user.token;
    // console.log(!token, token);
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    }
    else next();
})

export default router;