// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout,getPermissions,checkUserPermission } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DashboardComponent",
    data() {
        return {
            user: null,
            businesses: [],
            username: '',
            loading: false,
            type: 'category',
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
            product:'',
            quantity_value:0,
            error:false,
            cart:[],
            permission:false,
            business_id:'',
        }
    },
    computed: {
        filerResult() {
            return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        addToCart(product,index){
            this.product = product;
            this.key = index
            console.log(this.key)
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
        submitToCart(value,product){
            product.quantity = value
            product.price = value * product.amount
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            }
            // product.qty = value;
            this.pushToArray(this.cart, product);
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
            this.quantity_value = 0;
            // this.getProduct()
            this.getCart();
            console.log(this.cart)
            

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
        getUserBusiness() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses', {
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
                    this.businesses = res.data.my_own_businesses;
                    window.localStorage.setItem("retailer_business", this.businesses[0].id);

                })
                .catch((err) => {
                        console.log("error log " +
                            err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        showProducts(transaction) {
            this.transaction_product = transaction;
        },
        getProductCategories() {
            this.loading = true
            this.cat = true
            this.show_cat = false;
            fetch(BASE_URL + '/my/product_categories', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Unauthenticated.') {
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.results = res.data
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },

        getProducts() {
            this.loading = true;
            this.cat = false
            fetch(BASE_URL + '/my/business/' + this.business_id +
                    '/products', {
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
                    this.products = res.data;
                    this.products.forEach((data) => {
                        this.results.push({
                            product_id: data.product.id,
                            name: data.product.name,
                            amount: parseInt(data.product.recommended_price),
                            quantity: data.product.qty,
                            size: data.product.size,
                            public_image_url: data.product.public_image_url,
                            qty: data.qty,
                            sku: data.product.sku,
                            date:data.created_at
                            // customer: {
                            //     name: this.cart.customer.name,
                            //     email: this.cart.customer.email,
                            //     phone: this.cart.customer.phone
                            // }

                        });
                    });
                    console.log(this.local_product);
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
        },


        sumProduct() {
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length) {
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                this.total = sum;
            }
        },
        getCart(){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
                this.sumProduct()
                this.show_cat = true;
            }
        },
        removeFromCart(cart_order,index){
            const filteredItems = cart_order.slice(0, index).concat(cart_order.slice(index + 1, cart_order.length))
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(filteredItems));
            this.getCart();
            this.sumProduct();
            this.checkColumn();
        },
        checkColumn(){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length && !this.cat) {
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
        warning(){
            this.$swal("You are not permitted to execute this action");
        },
        userPermission(){
            if(checkUserPermission('order products') == false){
                this.business_id = 4
            }else{
                this.business_id = window.localStorage.getItem("retailer_business");
            }
        }

    },

    mounted() {
        if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length) {
            this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
            this.getCart();
        }
        this.userPermission();
        this.checkPermission();
        this.checkColumn();
        this.getUserBusiness();
        this.getProductCategories();
        this.username = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        
    }
}