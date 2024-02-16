import { createRouter, createWebHistory } from 'vue-router'
import Middleware from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'common'
      },
      component: () => import('../views/master/UserMasterView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/migration',
      name: 'Migration',
      component: () => import('../views/migrate/MigrationView.vue')
    },
    {
      path: '/user-list',
      name: 'User List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/UserMasterView.vue')
    },
    {
      path: '/contract-type-list',
      name: 'Contract Type Master',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/master/ContractTypeView.vue')
    },
    {
      path: '/finance-type-list',
      name: 'Finance Type List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/FinanceTypeView.vue')
    },
    {
      path: '/security-rights-list',
      name: 'Security Rights List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/SettingTypeView.vue')
    },
    {
      path: '/project-type-list',
      name: 'Project Type List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/ProjectTypeView.vue')
    },
    {
      path: '/upgrade-contract-type-list',
      name: 'Upgrade Contract Type List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/master/RegistrationTypeView.vue')
    },
    {
      path: '/key-list',
      name: 'Key List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/master/keyestate/KeyEstateView.vue')
    },
    {
      path: '/equity-list',
      name: 'Equity List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/EquityView.vue')
    },
    {
      path: '/location-list',
      name: 'Location List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/LocationView.vue')
    },
    {
      path: '/post-code-list',
      name: 'Post Code List',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/master/PostCodeView.vue')
    },
    {
      path: '/key-list-info',
      name: 'Key Info',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/master/keyestate/KeyEstateCreateView.vue')
    },
    // Process
    {
      path: '/long-term-non-return',
      name: 'Long Term Non Return',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/LongTermNonReturnView.vue')
    },
    {
      path: '/secular-stagnation',
      name: 'Secular Stagnation',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/SecularStagnationView.vue')
    },
    {
      path: '/record-call-log',
      name: 'Record Call Log',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/RecordCallLogView.vue')
    },
    {
      path: '/record-delivery',
      name: 'Record Delivery',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/RecordDeliveryView.vue')
    },
    {
      path: '/record-doc-stamped',
      name: 'Record Doc Stamped',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/RecordDocStampedView.vue')
    },
    {
      path: '/record-reg-app',
      name: 'Record Reg App',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/recordregapp/RecordRegAppView.vue')
    },
    {
      path: '/record-reg-app-detail/regis',
      name: 'Record Reg App Regis Detail',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ '../views/process/recordregapp/RecordRegAppRegisDetail.vue'
        )
    },
    {
      path: '/record-reg-app-detail/cancel',
      name: 'Record Reg App Cancel Detail',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ '../views/process/recordregapp/RecordRegAppCancelDetail.vue'
        )
    },
    {
      path: '/record-schedule-app-to-hgv',
      name: 'Record Schedule App To Hgv',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/RecordScheduleAppToHgvView.vue')
    },
    {
      path: '/record-reg-complete',
      name: 'Record Reg Complete',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/RecordRegCompleteView.vue')
    },
    {
      path: '/waiting-completion',
      name: 'Waiting Completion',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/WaitingCompletionView.vue')
    },
    {
      path: '/chart-call-status',
      name: 'Chart Call Status',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/chart/ChartCallStatusView.vue')
    },
    {
      path: '/chart-quantity-and-completed-app-form',
      name: 'Chart Quantity And Completed App Forms',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ '../views/chart/ChartQuantityAndCompletedAppFormsView.vue'
        )
    },
    {
      path: '/chart-quantity-of-app-forms-created',
      name: 'Chart Quantity Of App Forms Created',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ '../views/chart/ChartQuantityOfAppFormsCreatedView.vue'
        )
    },
    {
      path: '/chart-app-form-check-status',
      name: 'Chart App Form Check Status',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/chart/ChartAppFormCheckStatusView.vue')
    },
    {
      path: '/record-reg-final',
      name: 'Record Reg Final',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/process/recordregfinal/RecordRegFinalView.vue')
    },
    {
      path: '/record-reg-final/:projectNo',
      name: 'Record Reg Final Detail',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/recordregfinal/RecordRegFinalDetailView.vue')
    },
    {
      path: '/document',
      name: 'Document',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/process/DocumentView.vue')
    },
    {
      path: '/document/:projectNo',
      name: 'Document Detail',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/DocumentDetailView.vue')
    },
    {
      path: '/document/:projectNo/edit',
      name: 'Document Edit',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/DocumentEditView.vue')
    },
    {
      path: '/document_cancel/:projectNoCancel/:projectNo',
      name: 'Document Cancel Detail',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/DocumentCancelDetailView.vue')
    },
    {
      path: '/document_cancel/:projectNoCancel/:projectNo/edit',
      name: 'Document Cancel Edit',
      meta: {
        layout: 'common'
      },
      // route level code-splitting`
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/process/DocumentCancelEditView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  Middleware.doFilter(to, next)
})

export default router
