import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '@/views/PostsView.vue'
import HomeView from '@/views/HomeView.vue'
import { authGuard } from '@auth0/auth0-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: authGuard
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
      beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
