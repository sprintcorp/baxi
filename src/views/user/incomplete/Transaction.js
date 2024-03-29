import { getName, logout, getToken, getOutlet,checkUserPermission } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";
import VueHtml2pdf from 'vue-html2pdf'

import Vue from 'vue';
import Mpos from "../../../services/providers/mpos";
Vue.use(require('vue-moment'));

export default {
    name: "TransactionComponent",
    components: {
        Loading,
        VueHtml2pdf
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
            business_name:'',
            outlet_name:'',
            current_date:'',
            current_time:'',
            awaitingCustomerWalletResponse: false,
            customerWalletResponse: null,
            api_headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': getToken()
            },
            last_order_id: null,
            wallet_transaction_response: false,
            show_receipt:false,
            customer:{
                firstname:'',
                lastname:'',
                phone:'',
                email:'',
                baxi_username:''
            },
            mpos: new Mpos(),
            walletCheckInterval: null
        }
    },
    computed: {
        filterTransactions() {
            return this.transactions.filter((transaction) => transaction.order_group_id.toLowerCase().includes(this.search.toLowerCase()))
        },
        distributorTransactions() {
            return this.transactions.filter((transaction) => transaction.order_group_id.toLowerCase().includes(this.search.toLowerCase()) || transaction.delivery_type.toLowerCase().includes(this.search.toLowerCase()) || (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        },
        // amount(){
            // (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
            //         new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()) ||
        //     return this.transactions.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { a + c })
        // }
    },
    methods: {
        processMposPayment() {
            this.payment_type = "";

            let resp = this.saveOrder(this.payment_type,1);

            // check for order id
            resp.then(val => {
                let order = JSON.stringify(val);
                localStorage.setItem('order_for_mpos', order);
                this.mpos.instantiate();
            });
        },

        performPingRequest () {
            // ping the api via backend
            let url = "/user/order-payment/"+this.transaction_product.order_group_id+"/ping-response";

            fetch(BASE_URL + url, {
                method: 'GET',
                headers: this.api_headers
            })
                .then(res => res.json())
                .then(res => {
                    if(checkUserPermission('distributor')){
                        // alert(true)
                        this.getDistributorTransactions()                        
                    }else{
                        this.getTransaction();
                    }
                    console.log('wallet response', res);

                    this.customerWalletResponse = res.data;
                    console.log(res.data)
                })
                .catch(err => console.log(err));
        },
        checkingCustomerWalletResponse() {
            console.log(this.transaction_product)
            this.walletCheckInterval = setInterval(() => this.performPingRequest(this.transaction_product.order_group_id), 3000);

            if(this.customerWalletResponse) {

                this.clearWalletCheckInterval(this.walletCheckInterval);
                this.getTransaction
            }
        },
        clearWalletCheckInterval(interval) {
            console.log('cleared_interval', clearInterval(interval));
        },
        confirmDelete(id){
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
                    this.deleteTransaction(id)
                }
              })
            //   console.log(action)
        },
        deleteTransaction(id){
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/transactions/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    this.loading = false;
                    if(res.success){
                        this.$swal({
                            title: 'Success',
                            text: res.message,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        });
                    }else{
                        this.$swal({
                            title: 'Warning',
                            text: res.message,
                            icon: 'warning',
                            confirmButtonText: 'ok'
                        });
                    }
                    this.getTransaction();
                })
                .catch(err => console.log(err));
        },
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            console.log(this.start_date.toString() +' '+this.end_date.toString());
            this.transactions = [];
            this.getTransaction();
        },
        changeTab() {
            console.log(this.transaction_tab)
            this.transaction_tab = true;
        },
        getTransaction() {
            // if(checkUserPermission('distributor') == false){
                this.loading = true;
                fetch(BASE_URL + '/my/retailer/transactions?paid=0&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                // }
        },
        getDistributorTransactions(){
            // alert(true)
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
            
        },
        printReceipt(product){
            console.log(product)
            this.$htmlToPaper('printMe');
        },
        getPageTransaction(page) {
            this.transactions =[];
            this.loading = true;
            fetch(page+'&paid=0&start_date='+this.start_date+'&end_date='+this.end_date, {
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
        titleCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
        showTransaction(transaction){
            this.show_receipt = true;
            this.transaction_product = transaction;
            console.log(transaction)
        },
        closeReceipt(){
            this.show_receipt = false;
            this.transaction_product = [];
        },
        async saveOrder(type) {
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
                "customer": this.customer,
            }
            this.loading = false
            console.log(payload);


            await fetch(BASE_URL + url, {
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
                    
                    if(res.success) {
                        this.last_order_id = res.data.transaction.order_group_id;

                        if(type === "wallet") {
                            this.awaitingCustomerWalletResponse = true;

                            // disabled due to resource timeout issue
                            // this.checkingCustomerWalletResponse()
                        } else {
                            this.$swal({
                                title: 'Success',
                                text: 'Payment successful',
                                icon: 'success',
                                confirmButtonText: 'ok'
                            });
                            this.closeReceipt();
                        }
                    } else {
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

            payload.total_amount = this.getTotalOrdersAmount(payload.orders);
            payload.order_id = this.last_order_id;
            payload.merchant_username = localStorage.getItem('name');

            return payload;
        },
        getTotalOrdersAmount(orders) {
            let total = 0;
            orders.forEach(order => {
                total += order.price;
            })

            return total;
        },
    },

    mounted() {
        // this.distributor = checkUserPermission('distributor');
        console.log(checkUserPermission('distributor'))
        if(checkUserPermission('distributor')){
            // alert(true)
            this.getDistributorTransactions()
            this.distributor = true;
            this.outlet_name = JSON.parse(window.localStorage.getItem("name"))
            
        }else{
            this.outlet_name = window.localStorage.getItem("outlet_name")
            this.getTransaction();
        }
        
        this.name = getName();
        this.outlet = getOutlet();
        this.business_name = window.localStorage.getItem("name")
        this.outlet_name = window.localStorage.getItem("outlet_name")
        this.current_date = new Date().toISOString().slice(0,10);
        this.current_time = new Date(new Date().getTime() + 60*60).toLocaleTimeString();
}
}