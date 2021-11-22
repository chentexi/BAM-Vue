import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login'
import Test1 from '../views/Test1/Test1'
import Test2 from '../views/Test2/Test2'
import Home from '../views/Home/Home'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
