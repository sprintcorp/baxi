import { getName, logout, getToken, getOutlet } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "RetailerOrderComponent",
    data() {
        return {
            orders: [],
            loading: false,
            name: '',
            outlet: '',
            search:''
        }
    },
    computed:{
        fiilterSearch(){
            return this.orders.filter((order)=> order.product.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        // keymonitor(){
        //     if(this.search.length == 0){
        //         this.getRetailerOrders();
        //     }
        //     const search = this.search
        //     const orders = this.orders
        //     const search_order = orders.filter(function(order){
        //         return order.group_id == search || order.business.name == search || order.product.name == search;
                
        //     })
        //     console.log(search_order)
        //     this.orders = search_order;
            
        // },
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
                        this.$swal("Session Expired");
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    res.data.forEach((data) => {
                        this.orders.push(data);
                    });
                    // console.log(this.orders);
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