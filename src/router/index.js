import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import RoleIndexView from '../views/role/IndexView.vue'
import RoleCreateView from '../views/role/CreateView.vue'
import RoleShowView from '../views/role/ShowView.vue'
import PlpIndexView from '../views/plp/IndexView.vue'
import PlpCreateView from '../views/plp/CreateView.vue'
import PlpShowView from '../views/plp/ShowView.vue'
import SchoolYearIndexView from '../views/school-year/IndexView.vue'
import SchoolYearCreateView from '../views/school-year/CreateView.vue'
import SchoolYearShowView from '../views/school-year/ShowView.vue'
import SchoolIndexView from '../views/school/IndexView.vue'
import SchoolCreateView from '../views/school/CreateView.vue'
import SchoolShowView from '../views/school/ShowView.vue'
import UserIndexView from '../views/user/IndexView.vue'
import UserCreateView from '../views/user/CreateView.vue'
import UserShowView from '../views/user/ShowView.vue'
import UserDetailView from '../views/user/DetailView.vue'
import UserAccommodateTutorTeacherCreateView from '../views/user/accommodate/tutor-teacher/CreateView.vue'
import UserAccommodateDplCreateView from '../views/user/accommodate/dpl/CreateView.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
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
      path: '/plp',
      children: [{
          path: '',
          name: 'plp.index',
          component: PlpIndexView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'create',
          name: 'plp.create',
          component: PlpCreateView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ':id',
          name: 'plp.show',
          component: PlpShowView,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/school-year',
      children: [{
          path: '',
          name: 'school-year.index',
          component: SchoolYearIndexView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'create',
          name: 'school-year.create',
          component: SchoolYearCreateView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ':id',
          name: 'school-year.show',
          component: SchoolYearShowView,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/school',
      children: [{
        path: '',
        name: 'school.index',
        component: SchoolIndexView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'create',
        name: 'school.create',
        component: SchoolCreateView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: ':id',
        name: 'school.show',
        component: SchoolShowView,
        meta: {
          requiresAuth: true
        }
      }]
    },
    {
      path: '/user',
      children: [{
        path: '',
        name: 'user.index',
        component: UserIndexView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'create',
        name: 'user.create',
        component: UserCreateView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: ':id',
        children: [{
          path: '',
          name: 'user.show',
          component: UserShowView,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'detail',
          children: [{
            path: '',
            name: 'user.detail',
            component: UserDetailView,
            meta: {
              requiresAuth: true
            }
          }, {
            path: 'create-accommodate-tutor-teacher',
            name: 'user.detail.create-accommodate-tutor-teacher',
            component: UserAccommodateTutorTeacherCreateView,
            meta: {
              requiresAuth: true
            }
          }, {
            path: 'create-accommodate-dpl',
            name: 'user.detail.create-accommodate-dpl',
            component: UserAccommodateDplCreateView,
            meta: {
              requiresAuth: true
            }
          }]
        }]
      }]
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