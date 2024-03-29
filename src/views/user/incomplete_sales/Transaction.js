import { getName, logout, getToken,checkUserPermission,getFullName } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";
import Vue from 'vue';
import VueHtml2pdf from 'vue-html2pdf'
import Mpos from "../../../services/providers/mpos";

Vue.use(require('vue-moment'));

export default {
    name: "DistributorTransactionsComponent",
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
            outlet_name: '',
            search: '',
            start_date: '',
            end_date: '',
            distributor:false,
            transaction:'',
            show_receipt:false,
            current_date:'',
            current_time:'',
            awaitingCustomerWalletResponse: false,
            customerWalletResponse: null,
            last_order_id: null,
            wallet_transaction_response: false,
            customer:{
                firstname:'',
                lastname:'',
                phone:'',
                email:'',
                baxi_username:''
            },
            saving:false,
            status:'',
            mpos: new Mpos(),
            walletCheckInterval: null
        }
    },
    computed: {
        filterTransactions() {
            return this.transactions.filter((transaction) => transaction.order_group_id.toLowerCase().includes(this.search.toLowerCase()))
        },
    },
    methods: {
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
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
        getDate(date){
            const res = new Date(date);
            return res.getDate() +' '+this.days[res.getDay()] +' '+this.months[res.getMonth()]+' '+ res.getFullYear();
        },
        showTransaction(transaction){
            this.show_receipt = true;
            this.transaction = transaction;
            console.log(transaction)
            console.log(this.show_receipt)
        },
        closeReceipt(){
            this.show_receipt = false;
            this.transaction = [];
        },
        titleCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
            fetch(BASE_URL + '/my/distributor/customer/transactions/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
                .then(res => res.json())
                .then(res => {
                    this.loading = false;
                    console.log(res);
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
        getTransaction() {
                this.loading = true;
                fetch(BASE_URL + '/my/distributor/customer/transactions?paid=0&start_date='+this.start_date+'&end_date='+this.end_date, {
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
            this.closeReceipt();
            this.transactions =[];
            this.loading = true;
            fetch(page+'&paid=0', {
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
        async saveOrder(type) {
            console.log(type + this.transaction.order_group_id)
            this.saving = true;
                if(this.distributor){
                    this.saved_orders = JSON.parse(window.localStorage.getItem("distributor_cart"))
                   
                    var url = '/my/distributor/customer/order'
                }else{
                    url = '/my/retailer/orders'
                }
            const payload = {
                "order_id": this.transaction.order_group_id,
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

                        if(res.data.transaction.payment_type === "wallet") {
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
                            this.getTransaction();
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
        performPingRequest() {
            // ping the api via backend
            let url = "/user/order-payment/"+this.last_order_id+"/ping-response";

            fetch(BASE_URL + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log('wallet response', res);

                    this.customerWalletResponse = res.data;
                    // this. closeReceipt()
                    // this.getTransaction()
                })
                .catch(err => console.log(err));
        },
        checkingCustomerWalletResponse() {
            this.walletCheckInterval = setInterval(() => this.performPingRequest(), 20000);

            if(this.customerWalletResponse !== null) {
                this.clearWalletCheckInterval(this.walletCheckInterval);
            }
        },
        clearWalletCheckInterval(interval) {
            console.log('cleared_interval', clearInterval(interval));
        },
        confirmPayment(){
            this.awaitingCustomerWalletResponse = false;
            this.customerWalletResponse = false;
            this.getTransaction();
            this.closeReceipt()
            console.log('hello ' + this.awaitingCustomerWalletResponse);
        },
    },

    mounted() {
        this.distributor = checkUserPermission('distributor');
        this.getTransaction();
        this.name = getFullName();
        this.outlet_name = getName();
        // this.start_date = new Date("2015-08-21").getTime();
        // this.end_date = new Date().getTime();
        this.current_date = new Date().toISOString().slice(0,10);
        this.current_time = new Date(new Date().getTime() + 60*60).toLocaleTimeString();
    },
}