import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "TransactionComponent",
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
        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        },
        // amount(){
        //     return this.transactions.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { a + c })
        // }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        changeTab() {
            console.log(this.transaction_tab)
            this.transaction_tab = true;
        },
        showTransaction(transaction) {
            // this.transaction_tab = false;
            this.transaction_product = transaction;

            let sum = this.transaction_product.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
            this.delivery = this.transaction_product.orders.map(o => parseFloat(o.delivery)).reduce((a, c) => { return a + c });
            this.total = sum + this.delivery;
            if(this.transaction_product.paid == 0 && this.transaction_product.type != 'cash'){
                this.status = 'Unpaid'
            }
            if(this.transaction_product.paid == 1){
                this.status = 'Paid'
            }
            if(this.transaction_product.paid == 0 && this.transaction_product.type == 'cash'){
                this.status = 'Paid'
            }
            
            console.log(transaction);
        },
        getTransaction() {
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
                            this.$swal("Session Expired");
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
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        }
    },

    mounted() {
        this.getTransaction();
        this.name = getName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    },
}