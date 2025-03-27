import Routing from './index.vue'

export const routes = [
  { path: '/', component: () => import('./auth') }
]

export { Routing }
