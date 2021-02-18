
import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "TransactionComponent",
    data() {
        return {
            orders: [],
            page:[],
            name: '',
            loading: false,
            outlet: '',
            order_product: [],
            search: '',
            start_date: '',
            end_date: '',
            order_tab:true,
            total:0,
            delivery:0,
            status:'w-0',
            progress:'progress-bar progress-bar-striped progress-bar-animated',
            color:'bg-warning',
            hide:false,
            saving:false,
            order_groups:[],
            product_id:[],
            days:["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        }
    },
    computed: {
        filerTransactions() {
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
            console.log(this.order_groups);

            // let sum = this.order_product.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            this.delivery = order.applied_fees.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            // this.total = sum + this.delivery;
            if(order.status == 0){
                this.status = 'w-0'
                this.color = 'bg-danger'    
            }
            if(order.status == 1){
                this.status = 'w-50';
                this.color = 'bg-info'
                console.log(order.status)

            }
            if(order.status == 2){
                this.status = 'w-75'
                this.color = 'bg-info'
            }
            if(order.status == 3){
                this.status = 'w-100'
                this.color = 'bg-success'
            }
            // else{
            //     this.status = 'w-0'
                 
            // }
            // console.log(transaction);
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
                this.$swal("Order Accepted");
                
                this.getOrders();
            })
            .catch(err => {
                this.saving = false;
                this.$swal(err.response.data.message);
                this.getOrders();
                console.log(err)
                if (err.response.status == 401) {
                    this.$swal("Session Expired");
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
            });
        },
        getOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/distributor/groupTransactions', {
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
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
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
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }
                );
        },
        orderAction(action){
            this.saving = true;
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
                this.saving = false;
                console.log(res)
                this.$swal(res.message);                
                this.getOrders();
            })
            .catch(err => {
                this.saving = false;
                console.log(err)
                this.$swal(err.response.data.message);
                this.getOrders();
                if (err.response.status == 401) {
                    this.$swal("Session Expired");
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
            });
        },

        // getPageTransaction(page) {
        //     this.transactions =[];
        //     this.loading = true;
        //     fetch(page, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json',
        //                 'Authorization': getToken()
        //             }
        //         })
        //         .then(res => res.json())
        //         .then(res => {
        //             if (res.message === 'Unauthenticated.') {
        //                 console.log(res);
        //                 logout();
        //                 this.$router.push({ name: 'welcome' });
        //             }
        //             this.loading = false;
        //             this.transactions = res.data;
        //             this.page = res.data;
        //             console.log(this.transactions);
        //         })
        //         .catch(err => {
        //                 console.log(err)
        //                 this.loading = false;
        //                 if (err.response.status == 401) {
        //                     this.$swal("Session Expired");
        //                     logout();
        //                     this.$router.push({ name: 'welcome' });
        //                 }
        //             }

        //         );
        // }
    },

    mounted() {
        this.getOrders();
        this.name = getName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    },
}