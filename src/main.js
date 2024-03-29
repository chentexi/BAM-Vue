import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import uuid from "vue-uuid"
import store from './store/store'
import 'font-awesome/css/font-awesome.min.css'
import * as echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
//引入图标选择器
import iconPicker from 'vue-fontawesome-elementui-icon-picker';


require('echarts/extension/bmap/bmap');

Vue.config.productionTip = false
// 安装ElementUI
Vue.use(ElementUI)
Vue.use(uuid)
Vue.use(iconPicker)
Vue.use(BaiduMap, {
    ak: 'mDkz7jueNCfMBZBnyQsxsiMBHxFD7Nek'    //这个地方是官方提供的ak密钥
})

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequestNoJson} from "./utils/api";
import {initMenu} from "@/utils/menus";
import Qs from "qs";
//引入全局css
import './assets/style/varibles.css'

//插件
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequestNoJson = getRequestNoJson;
Vue.prototype.$echarts = echarts;
Vue.prototype.qs=Qs;

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
        if (to.path == '/') {
            next();
        } else {
            next('/?redirect=' + to.path);
        }
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')