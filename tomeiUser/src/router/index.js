// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/forgot',
        name: 'Forgot',
        component: () => import('@/views/Forgot.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: '/travel',
        name: 'Travel',
        component: () => import('@/views/Travel.vue'),
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/views/Categories.vue'),
      },
      {
        path: '/myworkspace',
        name: 'MyWorkSpace',
        component: () => import('@/views/MyWorkSpace.vue'),
      },
      {
        path: '/create',
        name: 'Create',
        component: () => import('@/views/Create.vue'),
      },
      {
        path: '/messages',
        name: 'Messages',
        component: () => import('@/views/Messages.vue'),
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/Blog.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
