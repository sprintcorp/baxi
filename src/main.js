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
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import TrendChart from "vue-trend-chart";
// import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue-apexcharts';
import VueHtmlToPaper from 'vue-html-to-paper';
// import Select2 from 'v-select2-component';
// import Popper from 'popper.js';
// import $ from 'jquery';

// Vue.use($)
// Vue.use(Popper)
// import VueSweetalert2 from 'vue-sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js'

// import 'sweetalert2/src/sweetalert2.scss'
const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
  }
const option = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
  
Vue.use(VueSweetalert2, option);
// Vue.use(Swal);
Vue.use(VueApexCharts)
Vue.use(VueHtmlToPaper, options);
Vue.component('apexchart', VueApexCharts)
Vue.use(TrendChart);
Vue.use(Toasted)
Vue.component('downloadCsv', JsonCSV)
// Vue.use(VueSweetalert2);
Vue.config.productionTip = false
// Vue.component('Select2', Select2);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')