import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: () => import(/* webpackChunkName: "todo" */ '../views/Todo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
