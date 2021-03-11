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
            // status:'w-25',
            progress:'progress-bar',
            color:'bg-warning',
            stats:0,
            applied_fees:[],
            order_groups:[],
            product_id:[],
            comment:'',
            other_info:'',
            saving:false,
            status:0,
            information:[],
            add_fee:false,
            query:'',
            link:'',
        }
    },
    computed: {
        filterTransactions() {
            return this.orders.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        },
        filerTransaction() {
            return this.orders.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()) && transaction.status == this.stats )
        }
    },
    methods: {
        addRow(){
            this.applied_fees.push({
                name:"",
                amount:""
            });
        },
        getOrderStatus(){
            // alert(this.query.length);
            this.getOrders();
        },
        confirmOrder(id){
            this.saving = true;
            const payload = {
                "status":id,
                "applied_fees":this.applied_fees,
                "order_groups":this.order_groups,
                "comment":this.comment,
                "other_info":this.other_info
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
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                
                this.getOrders();
                this.orderInformation();
            })
            .catch(err => {
                this.saving = false;
                this.$swal({
                    title: 'Error',
                    text: err.response.data.message,
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
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            console.log(this.start_date.toString());
        },
        changeTab() {
            console.log(this.order_tab)
            this.order_tab = true;
        },
        showOrder(order) {
            this.status = order.status
            
            this.order_product = order;
            if(order.delivery_type.toLowerCase() == 'delivery'){
                this.add_fee = true;
            }else{
                this.add_fee = false;
            }
            console.log(order)
            order.orders.forEach((data)=>{
                this.product_id.push({
                    id:data.product.id
                })
            })
            const product = this.sumArray(this.product_id)
            
            this.order_groups.push({
                id:order.order_group_id,
                selected_product_ids:product
            })
            console.log(this.order_groups)
            
        },
        orderInformation(){
            fetch(BASE_URL + '/my/businesses/stat/distributor-orders', {
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
        getOrders() {
            this.loading = true;
            if(this.query.length < 1){
                this.link = '/my/distributor/groupTransactions'
            }else{
                this.link = '/my/distributor/groupTransactions?status='+ this.query
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


        getPageOrder(page) {
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
        }
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