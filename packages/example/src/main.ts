import { createApp } from 'vue'
import './style.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

import Drawer from './drawer.vue'
const app = createApp(Drawer)
app.config.performance = true
app.mount('#app')
