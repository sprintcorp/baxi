import { logout, getToken,checkUserPermission } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";

export default {
    name: "WalletComponent",
    components: {
        Loading
    },
    data(){
        return{
            loading:false,
            wallets:[],
            search:'',
            order:'',
            distributor:false,
        }
    },
    methods:{
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getWallet(wallet){
            this.order = wallet.retailer_distributor_transaction.orders;
        },
        getWalletHistory(){
            this.loading = true;
                fetch(BASE_URL + '/my/wallet-histories', {
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
                        this.wallets = res.data.data;
                        // this.page = res.data;
                        console.log(this.wallets);
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
        }
    },
    mounted(){
        this.distributor = checkUserPermission('distributor');
        this.getWalletHistory();
       
    }

}