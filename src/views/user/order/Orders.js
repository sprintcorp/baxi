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
            search:'',
            // data:[{ "empid": 1, "fname": "X", "lname": "Y" }, { "empid": 2, "fname": "A", "lname": "Y" }, { "empid": 3, "fname": "B", "lname": "Y" }, { "empid": 4, "fname": "C", "lname": "Y" }, { "empid": 5, "fname": "C", "lname": "Y" }]
        }
    },
    methods: {
        keymonitor(){
            // const num = this.search
            console.log(this.orders);
            const orders = this.orders
            const search_order = orders.filter(function(order){
                return order[0].group_id ==  196398388;
                
            })
            console.log(search_order)
            
        },
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