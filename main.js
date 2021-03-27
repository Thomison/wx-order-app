import Vue from 'vue'
import App from './App'
import request from './common/request.js'
import uView from 'uview-ui';

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.request = request

// 服务器
Vue.prototype.baseUrl = "http://82.156.28.45:8081"

// 本地
// Vue.prototype.baseUrl = "http://localhost:8081"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
