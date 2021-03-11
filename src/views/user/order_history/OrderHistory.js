import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue"
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
            loading: false,
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
        filterTransactions() {
            return this.orders.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            console.log(this.start_date.toString());
        },
        changeTab() {
            // this.loading = true;
            // this.getOrders();
            // this.loading = false;
            console.log(this.order_tab)
            this.order_product = [];
            this.order_product.status = [];
            this.order_tab = true;
            
        },
        sumArray(objArr){
            console.log(objArr.length)

            let counts = objArr.reduce((prev, curr) => {
                let count = prev.get(curr.id) || 0;
                prev.set(curr.id + count);
                return prev;
              }, new Map());
              
              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([id]) => {
                return {id}
              })

              const id = reducedObjArr.map(function(obj){
                return obj.id
            })
            return id
        },
        showOrder(order) {
            this.order_product = [];
            this.order_product.status = [];
            this.order_tab = false;
            this.order_product = order;
            console.log(order)

            order.orders.forEach((data)=>{
                this.product_id.push({
                    id:data.group_id
                })
            })
            const product = this.sumArray(this.product_id)
            // console.log(product)
            this.order_groups.push({
                id:order.order_group_id,
                selected_product_ids:product
            })
            // console.log(this.order_groups);

            let sum = order.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            if(order.applied_fees){
                this.delivery = order.applied_fees.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            }
            this.total = sum;
            console.log(sum);
        },
        updateStatus(){
            // alert('hello')
            this.saving = true;
            const payload = {
                "status":4,
            }
            console.log(payload)

            fetch(BASE_URL + '/my/distributor/orders/status', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                this.saving = false;
                console.log(res)
                this.$swal({
                    title: 'Success',
                    text: "Order Accepted",
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                
                this.getOrders();
            })
            .catch(err => {
                this.saving = false;
                this.$swal({
                    title: 'Error',
                    text: err.message[0],
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                this.getOrders();
                console.log(err)
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
        getOrderStatus(){
            // alert(this.query.length);
            this.getOrders();
        },
        getOrders() {
            
            if(this.query.length < 1){
                this.link = '/my/distributor/groupTransactions'
            }else{
                this.link = '/my/distributor/groupTransactions?status='+ this.query
            }
            this.loading = true;
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
                this.loading = false;
                
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
            fetch(page, {
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
        confirmDelivery(action){
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.orderAction(action)
                }
              })
              console.log(action)
        },
        orderAction(action){
            
            this.saving = true;
            // alert(this.saving)
            // this.saving = true;
            const payload = {
                "status":action,
                "order_group_ids":this.order_groups[0].selected_product_ids,
            }
            console.log(payload)

            fetch(BASE_URL + '/my/distributor/orders/status', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                window.localStorage.setItem("wallet-balance",res.data.wallet_balance);
                this.getOrders();
                this.orderInformation();
                this.order_tab = true;
                // window.reload();
                this.saving = false;
                console.log(res)
                this.$swal({
                    title: 'Success',
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                });               
                
            })
            .catch(err => {
                this.saving = false;
                console.log(err)
                this.$swal({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                this.getOrders();
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
    },

    mounted() {
        this.orderInformation();
        this.getOrders();
        this.name = getName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    },
}