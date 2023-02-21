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
            // console.log(newBreadcrumb);
            state.menu = state.menu.filter(item => item.label !== newBreadcrumb.label)
            state.menu.push(newBreadcrumb);
        }
    }
}