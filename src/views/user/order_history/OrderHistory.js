import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue"
import Vue from 'vue'

Vue.use(require('vue-moment'));

export default {
    name: "TransactionComponent",
    components:{
        Loading
    },
    data() {
        return {
            query:'',
            link:'',
            orders: [],
            information:'',
            page:[],
            name: '',
            loading: true,
            outlet: '',
            order_product: [],
            search: '',
            start_date: '',
            end_date: '',
            order_tab:true,
            total:'',
            delivery:0,
            status:'w-0',
            progress:'progress-bar progress-bar-striped progress-bar-animated',
            color:'bg-warning',
            hide:false,
            saving:false,
            order_groups:[],
            product_id:[],
            stats:'Select Order By Status',
            days:["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        }
    },
    computed: {
        // filterTransactions() {
        //     return this.orders.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
        //             new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        // },

        // createdAt() {
        //     return this.
        // }
    },
    methods: {
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            this.orders = [];
            console.log(this.start_date.toString());
            this.getOrders();
        },
        
        
        getOrderStatus(){
            // alert(this.query.length);
            this.getOrders();
        },
        getOrders() {
            this.loading = true;
            if(this.query.length < 1){
                this.link = '/my/distributor/groupTransactions?start_date='+this.start_date+'&end_date='+this.end_date
            }else{
                this.link = '/my/distributor/groupTransactions?status='+ this.query+'&start_date='+this.start_date+'&end_date='+this.end_date
            }

            fetch(BASE_URL + this.link, {
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
                    this.orders = res.data.data;
                    
                    this.page = res.data;
                    this.loading = false;
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
                });
        },
        orderInformation(){
            fetch(BASE_URL + '/my/businesses/stat/retailer-distributor-orders', {
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
                this.information = res.data;
                // this.loading = false;
                
            })
            .catch(err => {
                    console.log(err)
                    this.loading = false;
                }
            );
        },
        getDate(date){
            const res = new Date(date);
            return res.getDate() +' '+this.days[res.getDay()] +' '+this.months[res.getMonth()]+' '+ res.getFullYear();
        },
        getPageOrders(page) {
            this.loading = true;
            fetch(page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                    this.orders = res.data.data;
                    this.loading = false;
                    
                    this.page = res.data;
                    console.log(this.orders);
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
        
    },

    created() {
        this.orderInformation();
        this.getOrders();
        this.name = getName();
        this.outlet = getOutlet();
        // this.start_date = new Date("2015-08-21").getTime();
        // this.end_date = new Date().getTime();
    },
}