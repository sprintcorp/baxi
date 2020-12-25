import MainLayoutComponent from "../../../components/layout/MainLayoutComponent";
import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "OrderComponent",
    components: { MainLayoutComponent },
    data() {
        return {
            orders: [],
            loading: false,
            name: '',
            outlet: '',
        }
    },
    methods: {
        getRetailerOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        this.$swal("Session Expired");
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    res.data.forEach((data) => {
                        this.orders.push(data);
                    });
                    console.log(this.orders);
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
        this.getRetailerOrders();
        this.name = getName();
        this.outlet = getOutlet();
    }
}