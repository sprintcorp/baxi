import { getName, logout, getToken, getOutlet,checkUserPermission } from '../../../config'
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
            distributor:false,
        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => transaction.type.toLowerCase().includes(this.search.toLowerCase()) && (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        },
        distributorTransactions() {
            return this.transactions.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()) && transaction.status == 3)
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
                                this.$swal("Session Expired");
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
                                this.$swal("Session Expired");
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
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        }
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