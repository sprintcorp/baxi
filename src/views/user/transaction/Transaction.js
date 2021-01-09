import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "TransactionComponent",
    data() {
        return {
            transactions: [],
            name: '',
            loading: false,
            outlet: '',
            transaction_product:[],
            search:'',
            start_date:'',
            end_date:''
        }
    },
    computed:{
        filerTransactions(){
            console.log(this.start_date.toString())
            return this.transactions.filter((transaction)=> transaction.type.toLowerCase().includes(this.search.toLowerCase()) || transaction.orders[0].product.name.toLowerCase().includes(this.search.toLowerCase()) && transaction.updated_at.includes(this.start_date.toString()))
        }
    },
    methods: {
        showDate(){
            console.log(this.start_date.toString());
        },
        showProducts(transaction){
            this.transaction_product = transaction;
        },
        getOutletTransaction() {
            this.loading = true;
            fetch(BASE_URL + '/my/outlets/' + this.$route.params.id + '/transactions', {
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
        this.getOutletTransaction();
        this.name = getName();
        this.outlet = getOutlet();
    },
}