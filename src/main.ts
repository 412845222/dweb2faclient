import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import dwebUI from "dweb-ui/dist_com/es/"
import "dweb-ui/dist_com/es/style.css"
// import MyPlayer from "./components/"

createApp(App).use(dwebUI).mount('#app')
