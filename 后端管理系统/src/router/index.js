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
            path: '/login',
            name: 'login',
            component: Login,
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('getToken');
    const token = store.state.user.token;
    const routerCom = {
        User,
        Page1,
        Page2
    }
    // console.log(!token, token);
    if (!token && to.name !== 'login') {
        next({ name: 'login' });
    }
    else {
        // if (token[0] == '1') {
        //     store.state.user.adminRouter.forEach(item => {
        //         item.component = routerCom[item.component];
        //         router.options.routes.push(item);
        //         router.addRoute(item);
        //         next({ path: item.path, replace: true })
        //         // console.log(item, router.options.routes);
        //     })
        //     store.commit("setToken", 'ok' + token);
        // }
        let temp = store.state.user.adminRouter;
        if (to.path === "/user" || to.path === "/page1" || to.path === "/page2") {
            if (token[0] == '1' && router.options.routes.every(item => item.name != temp[to.path].name)) {
                temp[to.path].component = routerCom[temp[to.path].component];
                router.options.routes.push(temp[to.path]);
                router.addRoute(temp[to.path]);
                next({ path: temp[to.path].path, replace: true });
            }
            next()
        }
        next();
    }
})

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => { return; })
}
// replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    // if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}
export default router;