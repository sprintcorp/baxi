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
            group_orders: [],
            search: '',
            start_date: '',
            end_date: ''
                // data:[{ "empid": 1, "fname": "X", "lname": "Y" }, { "empid": 2, "fname": "A", "lname": "Y" }, { "empid": 3, "fname": "B", "lname": "Y" }, { "empid": 4, "fname": "C", "lname": "Y" }, { "empid": 5, "fname": "C", "lname": "Y" }]
        }
    },
    computed: {
        fiilterSearch() {
            return this.orders.filter((order) =>
                order.type.toLowerCase().includes(this.search.toLowerCase()) && (new Date(this.start_date).getTime() < new Date(order.updated_at).getTime() && new Date(order.updated_at).getTime() < new Date(this.end_date).getTime())
            )
        }
    },
    methods: {
        showDate() {
            // const ed = new Date(this.start_date).getTime()
            console.log(this.start_date);
        },
        showOrders(order) {
            this.group_orders = order;
            console.log(this.group_orders)
        },
        acceptOrder(order) {
            alert(order)
        },
        getRetailerOrders() {
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
                        this.$swal("Session Expired");
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    // this.orders = res.data;
                    console.log(this.orders)
                    res.data.data.forEach((data) => {
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
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    }
}