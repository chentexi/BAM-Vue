import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import UUID from "vue-uuid"
import store from './store/store'
import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false
// 安装ElementUI
Vue.use(ElementUI)
Vue.use(UUID)

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "@/utils/menus";
//插件
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    //token存在就跳转
    if (window.sessionStorage.getItem('tokenStr')) {
        initMenu(router, store);
        if (!window.sessionStorage.getItem('user')) {
            return getRequest('/admin/info').then(user => {
                if (user) {
                    window.sessionStorage.setItem('user', JSON.stringify(user))
                    next();
                }
            })
        }
        next();
    } else {
        // next({ name:'Login' });

        // if (to.path == '/') {
        // }
        next();
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')