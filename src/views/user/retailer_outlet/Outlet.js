// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DashboardComponent",
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
        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime())
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        goToProduct(){            
            this.$router.push({ name: 'productOverview' });
        },
        getUserBusiness() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        // console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.businesses = res.data.my_own_businesses;
                    window.localStorage.setItem("retailer_business", this.businesses[0].id);

                })
                .catch((err) => {
                        console.log("error log " +
                            err)
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
        showProducts(transaction) {
            this.transaction_product = transaction;
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getBusinessOutlets() {
            this.loading = true;
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
                    this.getOutletTransaction(this.outlets[0].id)
                    this.selected_outlet = this.outlets[0].id;
                    this.getTransaction(this.outlets[0].id);
                    this.getTopSellingProduct(this.outlets[0].id);
                    this.getRestockLevel(this.outlets[0].id);
                    
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
            this.total_transaction = 0;
            this.loading = true;
            fetch(BASE_URL + '/my/outlets/' + id + '/transactions', {
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
                    this.transactions = res.data.transactions;
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
            this.loading = true;
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
        getTransaction(id){
            this.loading = true;
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
                            product:data.product.name,
                            quantity:data.qty
                        })
                    })
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
            fetch(BASE_URL + '/my/businesses/stat/top-selling?outlet_id='+id, {
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
            this.outlet_transactions = [];
            this.chartOptions.xaxis.categories = [];
            this.series[0].data = [];
            this.getTransaction(this.selected_outlet);           
            this.getTopSellingProduct(this.selected_outlet);           
            this.getRestockLevel(this.selected_outlet);           
            this.getOutletTransaction(this.selected_outlet);
            
        }
        
    },

    mounted() {        
        this.getBusinessOutlets();
        this.getUserBusiness();
        this.getOutletTransaction();
        this.name = getName();
        this.getSecondaryUsers();
        // this.getTopSellingProduct();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        
    }
}