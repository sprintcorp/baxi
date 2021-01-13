import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonCSV from 'vue-json-csv';
import Toasted from 'vue-toasted';
// import $ from 'jquery';

Vue.use(Toasted)
Vue.component('downloadCsv', JsonCSV)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')