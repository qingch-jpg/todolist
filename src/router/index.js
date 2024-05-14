import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: () => import('../views/sidebar.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/taskList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
