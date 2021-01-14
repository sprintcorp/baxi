// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DashboardComponent",
    data() {
        return {
            user: null,
            businesses: [],
            name: '',
            loading: false,
            transactions: [],
            search: '',
            start_date: '',
            end_date: '',
            transaction_product: [],
        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => transaction.type.toLowerCase().includes(this.search.toLowerCase()) ||
                transaction.orders[0].product.name.toLowerCase().includes(this.search.toLowerCase()) || new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime())
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        getUserBusiness() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses', {
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
                    this.businesses = res.data.my_own_businesses;
                    window.localStorage.setItem("retailer_business", this.businesses[0].id);

                })
                .catch((err) => {
                        console.log("error log " +
                            err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        showProducts(transaction) {
            this.transaction_product = transaction;
        },
        getOutletTransaction() {
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/groupTransactions', {
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
        this.getUserBusiness();
        this.getOutletTransaction();
        this.name = getName();
        console.log(this.$router.currentRoute.name);
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    }
}