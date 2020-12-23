import MainLayoutComponent from "../../../components/layout/MainLayoutComponent";
import { getName, getToken, saveOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "OutletComponent",
    components: { MainLayoutComponent },
    data() {
        return {
            outlet: '',
            product: '',
            loading: false,
            transactions: 0,
            transaction: '',
            total_transaction: 0,
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
            fetch(BASE_URL + '/my/outlets/' + this.$route.params.id + '/products', {
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
        addTransaction(numbers) {

            // foreach(numbers as number) {

            //     total += number.amount;
            // }
            let total = 0;
            numbers.reduce(function(number) {
                total += parseInt(number.amount);
            });
            return total;
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
                    let total = 0;
                    this.total_transaction = this.transaction.forEach(trans => total += parseInt(trans));
                    console.log(this.total_transaction);
                    console.log(this.transactions);
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
        saveOutlet(this.$route.params.id);
    },



    computed: {

    }
}