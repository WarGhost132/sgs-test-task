import { createPinia } from "pinia"
import { isDevEnv } from '@/shared/config'

export const setupStore = () => {
  const pinia = createPinia()

  if (isDevEnv) {
    pinia.use(({ store }) => {
      store.$onAction(({ name, args, after }) => {
        after(() => {
          console.log(`Action ${name} completed`, args)
        })
      })
    })
  }

  return pinia
}

export * from '@/entities/city'

export * from '@/features/counter'
