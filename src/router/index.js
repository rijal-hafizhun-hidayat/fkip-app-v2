import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import RoleIndexView from '../views/role/IndexView.vue'
import RoleCreateView from '../views/role/CreateView.vue'
import RoleShowView from '../views/role/ShowView.vue'

const router = createRouter({
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
      component: DashboardView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/role',
      children: [{
          path: '',
          name: 'role.index',
          component: RoleIndexView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'create',
          name: 'role.create',
          component: RoleCreateView,
          meta: {
            requiresAuth: true
          }
        }, {
          path: ':id',
          name: 'role.show',
          component: RoleShowView,
          meta: {
            requiresAuth: true
          }
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

router.beforeEach((to) => {
  if (!sessionStorage.getItem('isLoggedIn') && to.meta.requiresAuth && to.name !== 'login') {
    return {
      name: 'login'
    }
  }
})

export default router