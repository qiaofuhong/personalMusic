import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入封装的getVant()函数 这样不用频繁使用app.use()
import getVant from './plugins'

const app = createApp(App)
//通过getVant()函数引入组件
getVant(app)
app.use(store)
app.use(router).mount('#app')
