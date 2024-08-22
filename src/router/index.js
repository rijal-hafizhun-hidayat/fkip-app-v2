import {
  createRouter,
  createWebHistory
} from 'vue-router'
import NProgress from 'nprogress';
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
import UserAccommodateTutorTeacherShowView from '../views/user/accommodate/tutor-teacher/ShowView.vue'
import UserAccommodateDplCreateView from '../views/user/accommodate/dpl/CreateView.vue'
import UserAccommodateDplShowView from '../views/user/accommodate/dpl/ShowView.vue'
import UserAccommodateCollegerCreateView from '../views/user/accommodate/colleger/CreateView.vue'
import UserAccommodateCollegerShowView from '../views/user/accommodate/colleger/ShowView.vue'
import ProfileIndexView from '../views/profile/IndexView.vue'
import ProfileUserPlpCreateView from '../views/profile/CreateUserPlp.vue'
import ProfileUserPlpShowView from '../views/profile/ShowUserPlp.vue'
import ProdiIndexView from '../views/prodi/IndexView.vue'
import ProdiCreateView from '../views/prodi/CreateView.vue'
import ProdiShowView from '../views/prodi/ShowView.vue'
import UserGuidanceIndexView from '../views/user/guidance/IndexView.vue'
import UserGuidanceCreateView from '../views/user/guidance/CreateView.vue'
import UserGuidanceShowView from '../views/user/guidance/ShowView.vue'

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
            path: 'accommodate-tutor-teacher',
            children: [{
              path: 'create',
              name: 'user.detail.accommodate-tutor-teacher.create',
              component: UserAccommodateTutorTeacherCreateView,
              meta: {
                requiresAuth: true
              }
            }, {
              path: ':accommodateId',
              name: 'user.detail.accommodate-tutor-teacher.show',
              component: UserAccommodateTutorTeacherShowView,
              meta: {
                requiresAuth: true
              }
            }]
          }, {
            path: 'accommodate-dpl',
            children: [{
              path: 'create',
              name: 'user.detail.accommodate-dpl.create',
              component: UserAccommodateDplCreateView,
              meta: {
                requiresAuth: true
              }
            }, {
              path: ':accommodateId',
              name: 'user.detail.accommodate-dpl.show',
              component: UserAccommodateDplShowView,
              meta: {
                requiresAuth: true
              }
            }]
          }, {
            path: 'accommodate-colleger',
            children: [{
              path: 'create',
              name: 'user.detail.accommodate-colleger.create',
              component: UserAccommodateCollegerCreateView,
              meta: {
                requiresAuth: true
              }
            }, {
              path: ':accommodateId',
              name: 'user.detail.accommodate-colleger.show',
              component: UserAccommodateCollegerShowView,
              meta: {
                requiresAuth: true
              }
            }]
          }]
        }, {
          path: 'guidance',
          children: [{
            path: '',
            name: 'user.guidance.index',
            component: UserGuidanceIndexView,
            meta: {
              requiresAuth: true
            }
          }, {
            path: 'create',
            name: 'user.guidance.create',
            component: UserGuidanceCreateView,
            meta: {
              requiresAuth: true
            }
          }, {
            path: ':guidanceId',
            name: 'user.guidance.show',
            component: UserGuidanceShowView,
            meta: {
              requiresAuth: true
            }
          }]
        }]
      }]
    },
    {
      path: '/profile',
      children: [{
        path: '',
        name: 'profile.index',
        component: ProfileIndexView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'create-user-plp',
        children: [{
          path: '',
          name: 'profile.create-user-plp',
          component: ProfileUserPlpCreateView,
          meta: {
            requiresAuth: true
          }
        }, {
          path: ':id',
          name: 'profile.show-user-plp',
          component: ProfileUserPlpShowView,
          meta: {
            requiresAuth: true
          }
        }]
      }]
    },
    {
      path: '/prodi',
      children: [{
        path: '',
        name: 'prodi.index',
        component: ProdiIndexView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: 'create',
        name: 'prodi.create',
        component: ProdiCreateView,
        meta: {
          requiresAuth: true
        }
      }, {
        path: ':id',
        name: 'prodi.show',
        component: ProdiShowView,
        meta: {
          requiresAuth: true
        }
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

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router