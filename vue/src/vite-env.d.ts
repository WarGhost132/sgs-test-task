/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@stores' {
  export * from '@/app/providers/store'
}
