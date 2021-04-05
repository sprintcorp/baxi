// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout,getPermissions,checkUserPermission,getId,getRole } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue"
import Mpos from "../../../services/providers/mpos";
export default {
    name: "DashboardComponent",
    components:{
        Loading
    },
    data() {
        return {
            user: null,
            businesses: [],
            username: '',
            loading: false,
            type: 'product',
            search: '',
            start_date: '',
            end_date: '',
            transaction_product: [],
            products: [],
            results: [],
            cat:true,
            cart_order:[],
            show_cat:false,
            total:0,
            total_with_vat:0,
            product:'',
            quantity_value:1,
            error:false,
            cart:[],
            permission:false,
            business_id:'',
            selected_outlet:'',
            outlets:'',
            change_outlet:true,
            url:'',
            total_product:0,
            per_page: 50,
            saved_orders:'',
            saving:false,
            distributor:false,
            notification_info:0,
            customer:{
                firstname:'',
                lastname:'',
                phone:'',
                email:'',
                baxi_username:''
            },
            scrollPosition: 0,
            fees: [],
            vat: 0.0,
            awaitingCustomerWalletResponse: false,
            customerWalletResponse: null,
            api_headers: {
                'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
            },
            last_order_id: null,
            wallet_transaction_response: false,
            mpos: new Mpos()
        }
    },
    computed: {
        // filerResult() {
            
        //     if(isNaN(this.search)){                
        //         return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()) || result.sku.toLowerCase().includes(this.search.toLowerCase()))
        //     }else{
        //         this.myChangeFunction();
        //         return this.results.filter((result) => result.sku.toLowerCase().includes(this.search.toLowerCase()))
        //     }
        // }
    },
    methods: {
        processMposPayment() {
            this.payment_type = "";

            let resp = this.saveOrder(this.payment_type,1);

            // check for order id
            resp.then(val => {
                let order = JSON.stringify(val);
                localStorage.setItem('order_for_mpos', order);
                this.mpos.instantiate();
            });
        },
        // myChangeFunction(){
        //     // if(this.filerResult().length == 1){
        //         const data = this.results.filter((result) => result.sku.toLowerCase().includes(this.search.toLowerCase()))
        //         console.log(data);
        //         // this.quantity_value = 1;
        //         // this.submitToCart(this.quantity_value,data[0]);
        //     // }
        // },
        fetchFees() {
          fetch(BASE_URL + '/fees', { headers: this.api_headers})
              .then(response => response.json())
              .then(response => {
                  this.fees = response.data;

                  this.fees.forEach(fee => {
                      if(fee.name === 'VAT') this.vat = fee.value;
                  });
                  console.log(this.vat)
              })
              .catch(err => console.log(err));
        },
        performPingRequest () {
            // ping the api via backend
            let url = "/user/order-payment/"+this.last_order_id+"/ping-response";

            fetch(BASE_URL + url, {
                method: 'GET',
                headers: this.api_headers
            })
            .then(res => res.json())
            .then(res => {
                console.log('wallet response', res);

                this.customerWalletResponse = res.data;
            })
            .catch(err => console.log(err));
        },
        checkingCustomerWalletResponse() {
            let interval = setInterval(() => this.performPingRequest(), 30000);

            if(this.customerWalletResponse !== null) {
                this.getProducts(true);
                clearInterval(interval);
            }
        },
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        addToCart(product,index){
            console.log('prod', product);
            this.product = product;
            this.key = index
            console.log(this.key)
            // if(this.distributor){
            //     this.quantity_value = product.minimum_order;
            // }
            // alert("hello")
        },
        increase(qty){
            if(qty >= this.quantity_value){
                this.quantity_value++
            }else{
                this.error = true
            }
        },
        decrease(qty){
            if(this.quantity_value > 0){
            this.quantity_value--
            }
            if(qty >= this.quantity_value){
                this.error = false
            }

        },
        pushToArray(arr, obj) {
            const index = arr.findIndex((e) => e.product_id === obj.product_id);

            if (index === -1) {
                arr.push(obj);
            } else {
                arr[index] = obj;
            }
        },
        
        getResponse() {
            this.results = [];
            if(this.type == 'product'){                
                this.getProducts();
                this.checkColumn();
            }
            if(this.type == 'category'){
                this.getProductCategories();
                this.checkColumn();
            }
        },
        goToProduct(){            
            this.$router.push({ name: 'productOverview' });
        },
        showProducts(transaction) {
            this.transaction_product = transaction;
        },
        sumProduct() {
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length && !this.distributor) {
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                let sum_product = this.cart_order.map(o => parseFloat(o.qty)).reduce((a, c) => { return a + c });

                this.total_with_vat = sum * this.vat/100;
                console.log('vat', this.vat);
                console.log('total_vat', this.total_with_vat);
                this.total = sum;
                this.total_product = sum_product;
            }

            if (JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length && this.distributor) {
                this.cart_order = JSON.parse(window.localStorage.getItem("distributor_cart"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                let sum_product = this.cart_order.map(o => parseFloat(o.qty)).reduce((a, c) => { return a + c });
                
                this.total_with_vat = sum * this.vat/100;
                this.total = sum;
                this.total_product = sum_product;
            }
        },
        getCart(){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0 && getRole().toLowerCase() !== 'distributor') {
                const cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order")).filter(cart => parseInt(cart.retailer_id) == getId());
                this.cart = cart;
                this.sumProduct()
                if(cart.length > 0){
                    this.show_cat = true;
                }
            }

            if (JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0 && getRole().toLowerCase() == 'distributor') {
                
                const cart = JSON.parse(window.localStorage.getItem("distributor_cart")).filter(cart => parseInt(cart.retailer_id) == getId());
                this.cart = cart;
                this.sumProduct()
                if(cart.length > 0){
                    this.show_cat = true;
                }
                
            }
        },
        increaseCart(cart,index){
            if(this.cart[index].qty < this.cart[index].quantity){
            var size = ++this.cart[index].qty;
            }else{
                size = this.cart[index].qty;
                this.$swal({
                    title: 'Action Denied',
                    text: "Quantity exceed available quatity ",
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
            }
            cart[index].qty = size;
            cart[index].price = cart[index].sell_price * size;
            const amount = cart[index].sell_price * size;
            cart[index].amount = amount.toString();
            if(!this.distributor){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            }

            this.pushToArray(this.cart, cart[index]);
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
        }else{
            if (JSON.parse(window.localStorage.getItem("distributor_cart"))) {
                this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"))
            }

            this.pushToArray(this.cart, cart[index]);
            window.localStorage.setItem("distributor_cart", JSON.stringify(this.cart));
        }

            this.getCart();
            this.sumProduct();
            this.checkColumn(); 
        },
        decreaseCart(cart,index){
            if(this.cart[index].qty > 1){
                var size = --this.cart[index].qty;
            }else{
                size = this.cart[index].qty;
                this.$swal({
                    title: 'Action Denied',
                    text: "Product quantity must be greater than 0",
                    icon: 'warning',
                    confirmButtonText: 'ok'
                });
            }
            cart[index].qty = size;
            cart[index].price = cart[index].sell_price * size;
            const amount = cart[index].sell_price * size;
            cart[index].amount = amount.toString();
            if(!this.distributor){
                if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                    this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                }
    
                this.pushToArray(this.cart, cart[index]);
                window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
            }else{
                if (JSON.parse(window.localStorage.getItem("distributor_cart"))) {
                    this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"))
                }
    
                this.pushToArray(this.cart, cart[index]);
                window.localStorage.setItem("distributor_cart", JSON.stringify(this.cart));
            }
            this.getCart();
            this.sumProduct();
            this.checkColumn(); 
        },
        removeFromCart(cart_order,index){
            if(!this.distributor){
            const filteredItems = cart_order.slice(0, index).concat(cart_order.slice(index + 1, cart_order.length))
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(filteredItems));
            this.getCart();
            this.sumProduct();
            this.checkColumn();
            }
            
            if(this.distributor){
                const filteredItems = cart_order.slice(0, index).concat(cart_order.slice(index + 1, cart_order.length))
                window.localStorage.setItem("distributor_cart", JSON.stringify(filteredItems));
                this.getCart();
                this.sumProduct();
                this.checkColumn(); 
            }
        },
        checkColumn(){
            
            if (!this.distributor && JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length && !this.cat) {
                this.show_cat = true;
             } else if (this.distributor && JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length && !this.cat) {
                this.show_cat = true;
            }else{
                this.show_cat = false;
            }
        },
        checkPermission(){
            const found = getPermissions().some(permission => permission.action == 'sell products');
            if (found){
                this.permission = true
              }
        },
        warning(message){
            // this.$swal(message);
            this.$swal({
                title: 'Warning',
                text: message,
                icon: 'warning',
                confirmButtonText: 'close'
            });
        },
        removeCart(){
            this.cart = [];
            if(getRole().toLowerCase() == 'distributor'){
                window.localStorage.setItem("distributor_cart",[]);
                window.localStorage.removeItem("distributor_cart");
            }
            if(getRole().toLowerCase() == 'retailer' || getRole().toLowerCase() == 'cashier'){
                window.localStorage.setItem("retailer_cashier_order",[]);
                window.localStorage.removeItem("retailer_cashier_order");
            }
            this.show_cat = false;
            this.cart_order = [];
            this.total_product = '0';
            this.total = '00';
        },
        async saveOrder(type,save = 0) {
            this.saving = true;
            this.loading = true;

            console.log(this.customer);
                if(getRole().toLowerCase() == 'distributor'){
                    this.saved_orders = JSON.parse(window.localStorage.getItem("distributor_cart"))
                    var business =  JSON.parse(window.localStorage.getItem("cashier_business"))
                    var url = '/my/distributor/customer/order'
                }else{
                    this.saved_orders = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                    business = JSON.parse(window.localStorage.getItem("retailer_business"))
                    url = '/my/retailer/orders'
                }
            const payload = {
                "orders": this.saved_orders,
                "business_id":business,
                "customer":this.customer,
                "payment_type":type,
                "outlet_id": checkUserPermission('order products') === true ? window.localStorage.getItem("retailer_outlet") : window.localStorage.getItem("cashier_outlet")
            }
            if(save == 1){
                var message = 'Order successfully saved'
            }else{
                message = 'Payment successful'
            }


            await fetch(BASE_URL + url, {
                    method: 'POST',
                    body: JSON.stringify(payload), headers: this.api_headers
                })
                .then(res => res.json())
                .then(res => {
                    this.loading = false;
                    this.saving = false;

                    if(res.success){
                        this.last_order_id = res.data.transaction.order_group_id;

                        console.log('type', type === "wallet");

                        if(type.toLowerCase() == "wallet") {
                            this.awaitingCustomerWalletResponse = true;
                            this.checkingCustomerWalletResponse()
                        }else{
                            this.$swal({
                                title: 'Success',
                                text: message,
                                icon: 'success',
                                confirmButtonText: 'ok'
                            });
                        }
                            // this.getProducts(true);
                        

                        this.removeCart();
                        this.customer = [];
                        // this.show_cat = false;
                        this.cart_order = [];
                    }else{
                        this.$swal({
                            title: 'Error',
                            text: res.data.errors,
                            icon: 'error',
                            confirmButtonText: 'ok'
                        });
                    }
                })
                .catch(err => {
                    console.log('error', err);
                    this.saving = false;
                    // this.$swal();
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.getProducts(true);
                    console.log(err)
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
                });

            payload.total_amount = this.getTotalOrdersAmount(payload.orders);
            payload.order_id = this.last_order_id;
            payload.merchant_username = localStorage.getItem('name');

            return payload;
        },
        getTotalOrdersAmount(orders) {
            let total = 0;
            orders.forEach(order => {
                total += order.price;
            })

            return total;
        },
    },

    created() {
        // get fees
        
        this.checkPermission();
        // this.userPermission();
        this.fetchFees();

        if (getRole().toLowerCase() == 'retailer' && JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
            this.getCart();
            // this.sumProduct()
        }

        if (getRole().toLowerCase() == 'distributor' && JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"));
            this.getCart();
            // this.sumProduct()
            console.log(this.cart)

        }

        // if(this.distributor){
            // this.getOrderNotification();
        // }
        // this.getBalance();
        
        this.checkColumn();
        
        this.username = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
       
    }
}