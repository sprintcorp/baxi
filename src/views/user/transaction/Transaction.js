import { getName, logout, getToken, getOutlet,checkUserPermission } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";
export default {
    name: "TransactionComponent",
    components: {
        Loading
      },
    data() {
        return {
            transactions: [],
            page:[],
            name: '',
            loading: false,
            outlet: '',
            transaction_product: [],
            search: '',
            start_date: '',
            end_date: '',
            transaction_tab:true,
            total:0,
            delivery:0,
            status:'',
            progress:'progress-bar',
            color:'bg-warning',
            distributor:false,
            saving:false,
        }
    },
    computed: {
        filterTransactions() {
            return this.transactions.filter((transaction) => {
                return (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime())
            })
        },
        distributorTransactions() {
            return this.transactions.filter((transaction) => transaction.delivery_type.toLowerCase().includes(this.search.toLowerCase()) && (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        },
        // amount(){
        //     return this.transactions.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { a + c })
        // }
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
            console.log(this.transaction_tab)
            this.transaction_tab = true;
        },
        
        getTransaction() {
            if(checkUserPermission('distributor') == false){
                this.loading = true;
                fetch(BASE_URL + '/my/retailer/transactions', {
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
                        this.transactions = res.data.data;
                        this.page = res.data;
                        console.log(this.transactions);
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
                }else{
                    this.loading = true;
                fetch(BASE_URL + '/my/distributor/transactions', {
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
                        this.transactions = res.data.data;
                        this.page = res.data;
                        console.log(this.transactions);
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

        printReceipt(product){
            console.log(product)
            this.$htmlToPaper('printMe');
        },

        getPageTransaction(page) {
            this.transactions =[];
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
                    this.loading = false;
                    this.transactions = res.data.data;
                    this.page = res.data;
                    console.log(this.transactions);
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

        showTransaction(transaction){
            this.transaction_product = transaction;
            console.log(transaction)
        },

        saveOrder(type) {
            console.log(type + this.transaction_product.order_group_id)
            this.saving = true;
                if(this.distributor){
                    this.saved_orders = JSON.parse(window.localStorage.getItem("distributor_cart"))
                   
                    var url = '/my/distributor/customer/order'
                }else{
                    url = '/my/retailer/orders'
                }
            const payload = {
                "order_id": this.transaction_product.order_group_id,
                "payment_type":type,
    
            }
            this.loading = false
            console.log(payload);


            fetch(BASE_URL + url, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    
                    if(res.success){
                        this.$swal({
                            title: 'Success',
                            text: "Order Successful",
                            icon: 'success',
                            confirmButtonText: 'ok'
                        });

                    }else{
                        this.$swal({
                            title: 'Error',
                            text: "Error saving order",
                            icon: 'error',
                            confirmButtonText: 'ok'
                        });
                    }
                    
                    this.saving = false;

                    this.getTransaction();
                })
                .catch(err => {
                    this.saving = false;
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.getTransaction();
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
    },

    mounted() {
        this.distributor = checkUserPermission('distributor');
        this.getTransaction();
        this.name = getName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    },
}