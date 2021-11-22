import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/menu/menuList").then(data => {
        if (data) {
            //格式化router
            let fmtRoutes = formatRoutes(data);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes', fmtRoutes);
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children,
        } = router;
        if (children && children instanceof Array) {
            //递归
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            meta: meta,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                require(['../views/' + component + '.vue'], resolve);
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
