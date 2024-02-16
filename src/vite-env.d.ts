/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  dweb2fa:{
    send:(msg:{event:string,data:object})=>void,
    onec:(channel:string,callback:Function)=>void
  }
}