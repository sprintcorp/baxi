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
        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => (new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                    new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        changeTab() {
            console.log(this.transaction_tab)
            this.transaction_tab = !this.transaction_tab;
        },
        showProducts(transaction) {
            this.transaction_product = transaction;
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