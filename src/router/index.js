import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login'
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
