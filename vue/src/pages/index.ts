import Routing from './index.vue'

export const routes = [
  { path: '/', component: () => import('./form-page') },
  { path: '/schedule-view', component: () => import('./schedule-view') }
]

export { Routing }
