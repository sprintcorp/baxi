import { getName, logout, getToken,checkUserPermission,getFullName } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";
import Vue from 'vue';
import VueHtml2pdf from 'vue-html2pdf'

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
            current_time:''
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
        showDate(){
            this.transactions = [];
            // console.log(this.start_date.toString());
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
        getTransaction() {
                this.loading = true;
                fetch(BASE_URL + '/my/distributor/customer/transactions?paid=1&start_date='+this.start_date+'&end_date='+this.end_date, {
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
    },

    mounted() {
        this.distributor = checkUserPermission('distributor');
        this.getTransaction();
        this.name = getFullName();
        this.outlet_name = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        this.current_date = new Date().toISOString().slice(0,10);
        this.current_time = new Date(new Date().getTime() + 60*60).toLocaleTimeString();
    },
}