import { createApp } from 'vue'
import { router, setupStore } from './providers'
import App from './index.vue'

export const app = createApp(App).use(router).use(setupStore())
