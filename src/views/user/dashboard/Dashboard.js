// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout,getPermissions,checkUserPermission,getId } from '../../../config'
import { BASE_URL,CASHIER_BUSINESS } from '../../../env'
export default {
    name: "DashboardComponent",
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
            product:'',
            quantity_value:0,
            error:false,
            cart:[],
            permission:false,
            business_id:'',
            selected_outlet:'',
            outlets:'',
            change_outlet:true,
            url:'',
            totat_product:0,
            saved_orders:'',
            saving:false
        }
    },
    computed: {
        filerResult() {
            return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()) || result.sku.toLowerCase().includes(this.search.toLowerCase()))
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
            // product.quantity = value
            product.qty = value
            product.price = value * product.sell_price 
            product.int_amount = product.amount
            product.amount = product.price.toString()
            product.customer.name = 'web'
            product.retailer_id = getId()
            if(checkUserPermission('order products') == true){
            product.outlet_id = window.localStorage.getItem("retailer_outlet");
            }else{
            product.outlet_id = window.localStorage.getItem("cahier_outlet");
            }
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            }
            // product.qty = value;
            this.pushToArray(this.cart, product);
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
            this.cart = [];
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

            if(checkUserPermission('order products') == false){
                this.selected_outlet = window.localStorage.getItem("cahier_outlet");
                this.results = [];
                this.loading = true;
                this.cat = false
                fetch(BASE_URL + '/my/outlet/'+this.selected_outlet+'/products', {
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
                        console.log(res.data.data);
                        this.loading = false;
                        this.getCart();
                        this.products = res.data.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
                                sell_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                                customer: {
                                    name: 'web',
                                }

                            });
                        });
                        console.log(this.results);
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
                
            }else{

                this.results = [];
                this.loading = true;
                this.cat = false
                fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/products', {
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
                        this.products = res.data.data;
                        this.getCart();
                        console.log(this.products);
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
                                sell_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                                customer: {
                                    name: 'web',
                                }

                            });
                        });
                        console.log(this.products);
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


        sumProduct() {
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length) {
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                let sum_product = this.cart_order.map(o => parseFloat(o.qty)).reduce((a, c) => { return a + c });
                this.total = sum;
                this.total_product = sum_product;
            }
        },
        getCart(){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0) {
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
        warning(message){
            this.$swal(message);
        },
        userPermission(){
            if(checkUserPermission('order products') == false){
                this.business_id = window.localStorage.getItem(CASHIER_BUSINESS);
                this.change_outlet = false;
            }else{
                this.business_id = window.localStorage.getItem("retailer_business");
                this.getBusinessOutlets();
            }
        },
        getBusinessOutlets() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses/' + this.business_id + '/outlets ', {
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
                    this.outlets = res.data;
                    // this.getOutletTransaction(this.outlets[0].id)
                    // window.localStorage.setItem("retailer_outlet", JSON.stringify(this.outlets[0].id));
                    this.selected_outlet = window.localStorage.getItem("retailer_outlet");
                    
                    console.log(this.outlets);
                })
                .catch((err) => {

                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        getCategoryProduct(category_id){
            // alert(category_id);
            if(checkUserPermission('order products') == false){
                this.selected_outlet = window.localStorage.getItem("cahier_outlet");
                this.results = [];
                this.loading = true;
                this.cat = false
                fetch(BASE_URL + '/my/outlet/'+this.selected_outlet+'/products', {
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
                        console.log(res.data.data);
                        this.loading = false;
                        this.products = res.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
                                sell_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                                customer: {
                                    name: 'web',
                                }

                            });
                        });
                        console.log(this.results);
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
                
            }else{
                
                this.results = [];
                this.loading = true;
                this.cat = false
                fetch(BASE_URL + '/my/products?category_id='+category_id+'&outlet_id='+this.selected_outlet, {
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
                        console.log(res.data.data);
                        this.loading = false;
                        this.products = res.data.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
                                sell_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                                customer: {
                                    name: 'web',
                                }

                            });
                        });
                        console.log(this.results);
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
        goBack(){
            this.results = [];
            this.getProductCategories();
        },
        changeOutlet(){
            window.localStorage.setItem("retailer_outlet", JSON.stringify(this.selected_outlet));
            this.selected_outlet = window.localStorage.getItem("retailer_outlet");
            this.getProducts();
        },
        saveOrder() {
            this.saving = true;
            // if(checkUserPermission('order products') == true){
                this.saved_orders = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            // }else{
            //     this.saved_orders = JSON.parse(window.localStorage.getItem("cashier_order"))
            // }
            const payload = {
                "orders": this.saved_orders                
            }
        
            console.log(payload);


            fetch(BASE_URL + '/my/retailer/orders', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    this.saving = false;
                    console.log(res)
                    this.$swal("Payment Successful");
                    this.show_cat = false;
                    window.localStorage.removeItem("retailer_cashier_order");
                    
                    this.getProducts();
                })
                .catch(err => {
                    this.saving = false;
                    this.$swal(err.response.data.message);
                    this.getProducts();
                    console.log(err)
                    if (err.response.status == 401) {
                        this.$swal("Session Expired");
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                });
        },

    },

    mounted() {
        if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
            this.getCart();
        }
        this.userPermission();
        this.checkPermission();
        this.checkColumn();
        this.getProducts();
        this.username = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        
    }
}