import { getName, logout, getToken, getOutlet,checkUserPermission, getFullName } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";
import VueHtml2pdf from 'vue-html2pdf'

import Vue from 'vue';
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
            user:'',
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
        }
    },
    computed: {
        filterTransactions() {
            return this.transactions.filter((transaction) => transaction.order_group_id.toLowerCase().includes(this.search.toLowerCase()) && (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
            new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()) 
           )
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
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        performPingRequest() {
            // ping the api via backend
            let url = "/user/order-payment/"+this.last_order_id+"/ping-response";

            fetch(BASE_URL + url, {
                method: 'GET',
                headers: this.api_headers
            })
                .then(res => res.json())
                .then(res => {
                    console.log('wallet response', res);

                    this.customerWalletResponse = res.data;
                })
                .catch(err => console.log(err));
        },

        checkingCustomerWalletResponse() {
            console.log("got here");
            let interval = setInterval(() => this.performPingRequest(), 1000);

            if(this.customerWalletResponse !== null) {
                clearInterval(interval);
            }
        },

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
                fetch(BASE_URL + '/my/retailer/transactions?paid=1', {
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
            fetch(page+'&paid=1', {
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
                    
                    if(res.success) {
                        this.last_order_id = res.data.transaction.order_group_id;

                        if(res.data.transaction.payment_type === "wallet") {
                            this.awaitingCustomerWalletResponse = true;

                            this.checkingCustomerWalletResponse()
                        } else {
                            this.$swal({
                                title: 'Success',
                                text: 'Payment successful',
                                icon: 'success',
                                confirmButtonText: 'ok'
                            });
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
        },
    },

    mounted() {
        // this.distributor = checkUserPermission('distributor');
        this.current_date = new Date().toISOString().slice(0,10);
        this.current_time = new Date(new Date().getTime() + 60*60).toLocaleTimeString();
        if(checkUserPermission('distributor')){
            // alert(true)
            this.getDistributorTransactions()
            this.distributor = true;
            // this.outlet_name = JSON.parse(window.localStorage.getItem("name"))
            this.outlet_name = window.localStorage.getItem("name")

        }else{
            // this.outlet_name = JSON.parse(window.localStorage.getItem("outlet_name"))
            this.outlet_name = window.localStorage.getItem("outlet_name")
            this.getTransaction();
        }

        this.name = getName();
        this.user = getFullName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        this.business_name = getName();
        this.outlet_name = JSON.parse(window.localStorage.getItem("outlet_name"))
        
        // alert(this.distributor);
    },
}