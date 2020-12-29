import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "OrderComponent",
    data() {
        return {
            orders: [],
            loading: false,
            name: '',
            outlet: '',
            group_orders: []
        }
    },
    methods: {
        showOrders(order) {
            console.log(order)
            this.group_orders = order;
        },
        acceptOrder(order) {
            alert(order)
        },
        getRetailerOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/retailer/groupedOrders', {
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
                    // this.orders = res.data;
                    console.log(this.orders)
                    res.data.forEach((data) => {
                        this.orders.push(data);
                    });
                    // console.log("order " + this.orders);
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