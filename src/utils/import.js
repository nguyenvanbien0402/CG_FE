import { defineAsyncComponent } from 'vue'
export function registerGlobalComponent(app) {
  // app.component(
  //   'default-layout',
  //   defineAsyncComponent(() => import('@/layouts/LoginLayout.vue'))
  // )

  app.component(
    'common-layout',
    defineAsyncComponent(() => import('@/layouts/CommonLayout.vue'))
  )
}
