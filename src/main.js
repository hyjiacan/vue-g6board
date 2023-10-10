import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import App from '@/views/App'
import G6Editor from '@/components'

Vue.use(ElementUI)
Vue.use(G6Editor)

new Vue({
  render: h => h(App)
}).$mount('#app')
