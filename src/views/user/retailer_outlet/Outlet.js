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
            outlets:[],
            selected_outlet:'',
            total_transaction:0,
            chartOptions: {
                chart: {
                  id: 'vuechart-example'
                },
                xaxis: {
                  categories: ['Product one', 'product 2', 'product 3', 'product 5', 'product 4', 'product 6', 'product 7', 'product 9']
                }
              },
              series: [{
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 201]
              }],
              products:[],
            



        }
    },
    computed: {
        filerTransactions() {
            return this.transactions.filter((transaction) => new Date(this.start_date).getTime() < new Date(transaction.updated_at).getTime() &&
                new Date(transaction.updated_at).getTime() < new Date(this.end_date).getTime())
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        goToProduct(){            
            this.$router.push({ name: 'productOverview' });
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
        getBusinessOutlets() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses/' + this.$route.params.id + '/outlets ', {
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
                    this.outlets = res.data;
                    this.getOutletTransaction(this.outlets[0].id)
                    this.selected_outlet = this.outlets[0].id;
                    
                    console.log(this.outlets);
                })
                .catch((err) => {

                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        getOutletTransaction(id) {
            // alert(id)
            this.total_transaction = 0;
            this.loading = true;
            fetch(BASE_URL + '/my/outlets/' + id + '/transactions', {
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
                    this.transactions = res.data.transactions;
                    console.log(this.transactions);
                    let sum = this.transactions.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    console.log(sum);
                    this.total_transaction = sum;
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
        getOutletInformation(){
            this.getOutletTransaction(this.selected_outlet)
        }

    },

    mounted() {
        
        this.getBusinessOutlets();
        this.getUserBusiness();
        this.getOutletTransaction();
        this.name = getName();
        console.log(this.$router.currentRoute.name);
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        
    }
}