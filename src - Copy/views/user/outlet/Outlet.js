import { getName, getToken, saveOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "OutletComponent",
    data() {
        return {
            outlet: '',
            product: '',
            loading: false,
            transactions: 0,
            transaction: '',
            total_transaction: 0,
            recent_transaction:[],
            per_page: 50
        }
    },
    methods: {
        getBusinessOutlets() {
            fetch(BASE_URL + '/my/outlets/' + this.$route.params.id, {
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
                    }

                    this.outlet = res.data;
                    console.log(this.outlets);
                })
                .catch(err => console.log(err));
        },

        getBusinessOutletsProduct() {
            fetch(BASE_URL + '/my/outlet/' + this.$route.params.id + '/products?per_page='+this.per_page, {
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
                    }

                    this.product = res.data;
                    console.log(this.product);
                })
                .catch(err => console.log(err));
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

                    this.loading = false;
                    this.transactions = res.data.count;
                    this.transaction = res.data.transactions;
                    console.log(this.transaction);
                    let sum = this.transaction.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    console.log(sum);
                    this.total_transaction = sum;
                    this.recent_transaction = res.data.transactions.slice(Math.max(res.data.transactions.length - 5, 0))
                    console.log(this.recent_transaction);
                   
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;

                    }

                );
        }
    },

    mounted() {
        this.getBusinessOutlets();
        this.getBusinessOutletsProduct();
        this.getOutletTransaction();
        this.name = getName();
        console.log(this.$router.currentRoute.name)
        saveOutlet(this.$route.params.id);
    },



    computed: {

    }
}