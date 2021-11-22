import {getRequest} from "./api";
import da from "element-ui/src/locale/lang/da";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/menu/menuList").then(data => {
        if (data) {
            //格式化router
            let fmtRoutes = formatRoutes(data,false);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes', fmtRoutes);
        }
    })
}
export const formatRoutes = (routes, childflag) => {
    let fmRoutes = [];
    let data = routes.data;
    if (childflag) {
        data = routes;
    }
    data.forEach(router => {
        let {
            url,
            component,
            menuName,
            meta,
            icon,
            children,
        } = router;
        if (children && children instanceof Array) {
            //递归
            children = formatRoutes(children, true);
        }
        let fmRouter = {
            path: url,
            name: menuName,
            meta: meta,
            icon: icon,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")){
                    require(['../views/Home/' + component + '.vue'], resolve);
                }else if (component.startsWith("system")) {
                    require(['../views'+url+'.vue'], resolve);
                } else if (component.startsWith("monitor")) {
                    require(['../views'+url], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
