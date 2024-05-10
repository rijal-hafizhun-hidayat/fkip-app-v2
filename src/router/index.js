import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import RoleView from '@/views/role/RoleView.vue'
import RoleIndexComponent from '../views/role/components/RoleIndexComponent.vue'
import RoleCreateComponent from '../views/role/components/RoleCreateComponent.vue'

const router = createRouter({
  linkActiveClass: 'border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard.index',
      component: DashboardView
    },
    {
      path: '/role',
      component: RoleView,
      children: [{
          path: '',
          name: 'role.index',
          component: RoleIndexComponent
        },
        {
          path: 'create',
          name: 'role.create',
          component: RoleCreateComponent
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router