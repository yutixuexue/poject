export default {
    state: {
        isCollapse: false,
        menu: [{
            label: '首页',
            path: '/home'
        }],
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        addBreadcrumb(state, newBreadcrumb) {
            console.log(newBreadcrumb);
            state.menu = state.menu.filter(item => item.path !== newBreadcrumb.path)
            state.menu.push(newBreadcrumb);
            // console.log(state.menu);
        }
    }
}