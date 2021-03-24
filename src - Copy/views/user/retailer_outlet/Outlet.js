// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env';
import Loading from "../../../components/Loader.vue";
import Vue from 'vue';

Vue.use(require('vue-moment'));

export default {
    name: "DashboardComponent",
    components: {
        Loading
      },
    data() {
        return {
            user: null,
            saving:false,
            businesses: [],
            name: '',
            loading: false,
            transactions: [],
            search: '',
            start_date: '',
            end_date: '',
            transaction_product: [],
            outlets:[],
            selected_outlet:'',
            total_transaction:0,
            outlet_transactions:[],
            total_quantity:0,
            restock_level:[],
            duration:1,
            page:'',
            series: [{
                data: []
              }],
              chartOptions: {
                chart: {
                  type: 'bar',
                  height: 350,
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                  }
                },
                fill: {
                    colors: ['#ffc107']
                  },
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ['#fff']
                  }
                },
                xaxis: {
                  categories: [],
                }
              },
            products:[],
            chart:false,
            chart_data:false,
            users:[],       
            payload: {
                name:"",
                full_address:"",
                cashier:""
            },
            top_selling:[],
            product_info:0
        }
    },
    computed: {
        filterTransactions() {
            return this.transactions.filter((transaction) => new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime())
        },
        // amount(){
        //     return this.filterTransactions.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
        // }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
            const day = 1000 * 60 * 60 * 24 * this.duration;
            this.start_date = new Date().getTime()- day;
            this.total_transaction = this.filterTransactions.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
           
        },
        goToProduct(){            
            this.$router.push({ name: 'productOverview' });
        },
        // getUserBusiness() {
        //     this.loading = true;
        //     fetch(BASE_URL + '/my/businesses', {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json',
        //                 'Authorization': getToken()
        //             }
        //         })
        //         .then(res => res.json())
        //         .then(res => {
        //             if (res.message === 'Unauthenticated.') {
        //                 logout();
        //                 this.$router.push({ name: 'welcome' });
        //             }
        //             this.loading = false;
        //             this.businesses = res.data.my_own_businesses;
        //             window.localStorage.setItem("retailer_business", this.businesses[0].id);

        //         })
        //         .catch((err) => {
        //                 console.log("error log " +
        //                     err)
        //                 this.loading = false;
        //                 if (err.response.status == 401) {
        //                     this.$swal({
        //                     title: 'Error',
        //                     text: "Session Expired",
        //                     icon: 'error',
        //                     confirmButtonText: 'ok'
        //                 });
        //                     logout();
        //                     this.$router.push({ name: 'welcome' });
        //                 }
        //             }
        //         );
        // },
        showProducts(transaction) {
            this.transaction_product = transaction;
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getBusinessOutlets() {
            // this.loading = true;
            fetch(BASE_URL + '/my/businesses/' + this.$route.params.id + '/outlets ', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.outlets = res.data;
                    window.localStorage.setItem('retailer_outlet', this.outlets[0].id); 
                    // this.getOutletTransaction()
                    this.selected_outlet = this.outlets[0].id;
                    // this.getTransaction(this.outlets[0].id);
                    // this.getTopSellingProduct(this.outlets[0].id);
                    // this.getRestockLevel(this.outlets[0].id);
                    
                    // console.log(this.outlets);
                })
                .catch((err) => {

                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal({
                                title: 'Error',
                                text: "Session Expired",
                                icon: 'error',
                                confirmButtonText: 'ok'
                            });
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        getOutletTransaction(id) {
            // alert(id)
            var newDate = Date.now() + -parseInt(this.duration)*24*3600*1000;
            var day = new Date(newDate).getDate().toString();
            var month = parseInt(new Date(newDate).getMonth().toString()) + 1;
            var year = new Date(newDate).getFullYear().toString();
            const mon = month > 9 ? month : '0'+month;
            const period = year+'-'+mon+'-'+day;

            this.total_transaction = 0;
            this.loading = true;
            fetch(BASE_URL + '/my/outlets/' + id + '/transactions?start_date='+period, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.transactions = res.data.transactions.data
                    this.page = res.data.transactions;
                    // console.log(this.transactions);
                    let sum = this.transactions.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    // console.log(sum);
                    this.total_transaction = sum;
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        
                    }

                );
        },
        getPageOutletTransaction(page) {
            // alert(id)
            this.transactions = [];
            var newDate = Date.now() + -parseInt(this.duration)*24*3600*1000;
            var day = new Date(newDate).getDate().toString();
            var month = parseInt(new Date(newDate).getMonth().toString()) + 1;
            var year = new Date(newDate).getFullYear().toString();
            const mon = month > 9 ? month : '0'+month;
            const period = year+'-'+mon+'-'+day;

            this.total_transaction = 0;
            this.loading = true;
            fetch(page+'&start_date='+period, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.transactions = res.data.transactions.data
                    this.page = res.data.transactions;
                    // console.log(this.transactions);
                    let sum = this.transactions.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    // console.log(sum);
                    this.total_transaction = sum;
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        
                    }

                );
        },
        getSecondaryUsers(){
            // this.loading = true;
            fetch(BASE_URL + '/user/'+window.localStorage.getItem('name') +'/secondary-users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.users = res.data.data;
                    
                    
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal({
                                title: 'Error',
                                text: "Session Expired",
                                icon: 'error',
                                confirmButtonText: 'ok'
                            });
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        createOutlet(){
            this.saving = true;
              fetch(BASE_URL + '/my/outlets/new', {
                  method: 'POST',
                  body: JSON.stringify(this.payload),
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': getToken()
                  }
              })
              .then(res => res.json())
              .then(res => {
                  this.saving = false;
                  this.$swal({
                    title: 'Success',
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                  
              })
              .catch(err => {
                  this.$swal({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                  this.saving = false;
                  console.log(err)
                  if (err.response.status == 401) {
                      this.saving = false;
                      this.$swal({
                        title: 'Error',
                        text: "Session Expired",
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                      logout();
                      this.$router.push({ name: 'welcome' });
                  }
              });
          },
        getTransactionDuration(){
            // var newDate = Date.now() + -parseInt(this.duration)*24*3600*1000;
            // var day = new Date(newDate).getDate().toString();
            // var month = parseInt(new Date(newDate).getMonth().toString()) + 1;
            // var year = new Date(newDate).getFullYear().toString();
            // const mon = month > 9 ? month : '0'+month;
            // const period = year+'-'+mon+'-'+day; 
            // console.log(period)
            this.transactions = [];
            this.getOutletTransaction(window.localStorage.getItem('retailer_outlet'));
            
        },
        getTransaction(id){
            // this.loading = true;
            this.chart = false;
            this.outlet_transactions = [];
            fetch(BASE_URL + '/my/retailer/orders?outlet_id='+id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    res.data.forEach((data)=>{
                        this.outlet_transactions.push({
                            product:data.outlet_product.product.name,
                            quantity:data.qty
                        })
                    })
                    console.log(this.outlet_transactions);
                    this.sumArray(this.outlet_transactions);
                    
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal({
                        title: 'Error',
                        text: "Session Expired",
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        getTopSellingProduct(id){
            fetch(BASE_URL + '/my/businesses/stat/retailer-top-selling?outlet_id='+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.message === 'Unauthenticated.') {
                    console.log(res);
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
                this.loading = false;
                // res.data.transactions.slice(Math.max(res.data.transactions.length - 5, 0))
                this.top_selling = res.data.top_selling.slice(Math.max(res.data.top_selling.length -5,0));
                
            })
            .catch(err => {
                    console.log(err)
                    this.loading = false;
                    
                }

            );
        },
        getRestockLevel(id){
            
            fetch(BASE_URL + '/my/outlet/' +
            id+ '/products/restock-level', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                   this.restock_level = res.data;
                })
                .catch(err => console.log(err));
        },
        getProductInfo(id){            
            fetch(BASE_URL + '/my/outlets/' +id+ '/products/stat', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                   this.product_info = res.data;
                })
                .catch(err => console.log(err));
        },
        sumArray(objArr){
            console.log(objArr.length)
            if(objArr.length > 0){
                this.chart_data = true
            }
            this.chartOptions.xaxis.categories = [];
            this.series[0].data = [];
            let counts = objArr.reduce((prev, curr) => {
                let count = prev.get(curr.product) || 0;
                prev.set(curr.product, curr.quantity + count);
                return prev;
              }, new Map());
              
              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([product,quantity]) => {
                return {product,quantity}
              })

              const products = reducedObjArr.map(function(obj){
                return obj.product
            })
            const quantity = reducedObjArr.map(function(obj){
                return obj.quantity
            })
            console.log(products);
            console.log(quantity);
            const total = quantity.reduce((a, b) => a + b, 0);
            this.total_quantity = total;
            products.forEach((data) => {
                this.chartOptions.xaxis.categories.push(data);
            })

            quantity.forEach((data) => {
                this.series[0].data.push(data);
            })
            this.chart = true;
              
                console.log(this.chartOptions.xaxis.categories);
                // console.log(reducedObjArr2);
                console.log(this.series.data);
                
        },
        getOutletInformation(){ 
            this.transactions = [];
            this.outlet_transactions = [];
            this.chartOptions.xaxis.categories = [];
            this.series[0].data = [];
            this.getTransaction(this.selected_outlet);           
            this.getTopSellingProduct(this.selected_outlet);           
            this.getRestockLevel(this.selected_outlet);           
            this.getOutletTransaction(this.selected_outlet);
            this.getProductInfo(this.selected_outlet);
        }
        
    },

    created() {   
        this.getOutletTransaction(window.localStorage.getItem('retailer_outlet'));  
        this.getTransaction(window.localStorage.getItem('retailer_outlet')); 
        this.getRestockLevel(window.localStorage.getItem('retailer_outlet'));
        // this.getTransaction(window.localStorage.getItem('retailer_outlet'));  
        this.getTopSellingProduct(window.localStorage.getItem('retailer_outlet'));      
        this.getBusinessOutlets();
        this.getProductInfo(window.localStorage.getItem('retailer_outlet'));
        this.name = getName();
        this.getSecondaryUsers();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        this.showDate()
        
    }
}