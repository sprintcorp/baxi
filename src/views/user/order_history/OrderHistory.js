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
            status:'w-25',
            progress:'progress-bar',
            color:'bg-warning'
        }
    },
    computed: {
        filerTransactions() {
            return this.orders.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        changeTab() {
            console.log(this.order_tab)
            this.order_tab = true;
        },
        showOrder(order) {
            this.order_tab = false;
            this.order_product = order;
            console.log(order)

            // let sum = this.order_product.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            // this.delivery = this.order_product.orders.map(o => parseFloat(o.delivery)).reduce((a, c) => { return a + c });
            // this.total = sum + this.delivery;
            if(this.order_product.seen == 0){
                this.status = 'w-25'
            }
            if(this.order_product.seen == 1){
                this.status = 'w-50'
            }
            if(this.order_product.seen == 2){
                this.status = 'w-75'
            }
            if(this.order_product.seen == 3){
                this.status = 'w-100'
            }
            // console.log(transaction);
        },
        getOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/products/orders', {
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
                    this.orders = res.data;
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