import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "RetailerOrderOverviewComponent",
    data() {
        return {
            retailer_orders: [],
            loading: false,
            name: '',
            outlet: '',
            search: '',
            start_date: '',
            end_date: ''
        }
    },
    computed: {
        filterOrder() {
            return this.retailer_orders.filter((order) => order.product.name.toLowerCase().includes(this.search.toLowerCase()) && (new Date(this.start_date).getTime() < new Date(order.updated_at).getTime() && new Date(order.updated_at).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        getRetailerOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/products/orders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        this.$swal({
                title: 'Error',
                text: "Session Expired",
                icon: 'error',
                confirmButtonText: 'ok'
            });
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    // this.retailer_orders = res;
                    res.data.forEach((data) => {
                        this.retailer_orders.push(data);
                    });
                    console.log(this.retailer_orders);
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
    mounted() {
        this.getRetailerOrders();
        this.name = getName();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    }
}