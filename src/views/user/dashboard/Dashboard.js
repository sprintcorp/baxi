// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout,getPermissions,checkUserPermission,getId,getRole } from '../../../config'
import { BASE_URL,CASHIER_BUSINESS } from '../../../env'
import Loading from "../../../components/Loader.vue"
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
            total_with_val:0,
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
            saving:false,
            distributor:false,
            notification_info:0,
            customer:{
                firstname:'',
                lastname:'',
                phone:'',
                email:''
            },
            scrollPosition: 0,
        }
    },
    computed: {
        filerResult() {
            return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()) || result.sku.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        addToCart(product,index){
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
        submitToCart(value,product){
            // product.quantity = value
            if(value > 0 && value <= product.quantity){
            product.qty = value
            product.price = value * product.sell_price 
            product.int_amount = product.amount
            product.amount = product.price.toString()
            // product.customer.name = 'web';
            // product.customer.replace = true;
            product.retailer_id = getId()
            if(checkUserPermission('order products') == true){
                product.outlet_id = window.localStorage.getItem("retailer_outlet");
            }else{
                product.outlet_id = window.localStorage.getItem("cahier_outlet");
            }
            if(!this.distributor){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            }
            this.pushToArray(this.cart, product);
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
            this.cart = [];
            this.quantity_value = 0;
            this.getCart();
            console.log(this.cart)
        }else{
            if (JSON.parse(window.localStorage.getItem("distributor_cart"))) {
                this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"))
            }
            this.pushToArray(this.cart, product);
            window.localStorage.setItem("distributor_cart", JSON.stringify(this.cart));
            this.cart = [];
            this.quantity_value = 0;
            this.getCart();
            console.log(this.cart)
        }
    }else{
        this.$swal({
            title: 'Action Denied',
            text: "Quantity must not be more than available quantity or less than One",
            icon: 'warning',
            confirmButtonText: 'ok'
        });
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
            if(checkUserPermission('order products') == false && getRole() !== 'Distributor'){
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
                        console.log(res.data.data);
                        this.loading = false;
                        this.getCart();
                        this.products = res.data.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                                

                            });
                        });
                        console.log(this.results);
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
            if(checkUserPermission('order products') == true && getRole() !== 'Distributor'){

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
                        this.products = res.data.data;
                        this.getCart();
                        console.log(this.products);
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at,
                               

                            });
                        });
                        console.log(this.products);
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

            if(getRole() == 'Distributor'){
                this.results = [];
                this.distributor = true;
                this.cat = false;
                fetch(BASE_URL + '/my/distributor/products', {
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
                this.products = res.data.data;
                this.products.forEach((data) => {
                    this.results.push({
                        product_id: data.product.id,
                        name: data.product.name,
                        amount: parseInt(data.pack_price),
                        sell_price: parseInt(data.pack_price),
                        quantity: data.pack_qty,
                        size: data.product.size,
                        public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                        qty: data.pack_qty,
                        sku: data.product.sku,
                        date:data.product.created_at,
                        minimum_order: data.minimum_order_qty,
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


        sumProduct() {
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length && !this.distributor) {
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                let sum_product = this.cart_order.map(o => parseFloat(o.qty)).reduce((a, c) => { return a + c });
                
                this.total_with_vat = sum * 7.5 /100;
                this.total = sum;
                this.total_product = sum_product;
            }

            if (JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length && this.distributor) {
                this.cart_order = JSON.parse(window.localStorage.getItem("distributor_cart"))
                let sum = this.cart_order.map(o => parseFloat(o.price)).reduce((a, c) => { return a + c });
                let sum_product = this.cart_order.map(o => parseFloat(o.qty)).reduce((a, c) => { return a + c });
                
                this.total_with_vat = sum * 7.5 /100;
                this.total = sum;
                this.total_product = sum_product;
            }
        },
        getCart(){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0 && !this.distributor) {
               
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
                this.sumProduct()
                this.show_cat = true;
            }

            if (JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0 && this.distributor) {
                this.show_cat = true;
                this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"));
                this.sumProduct()
                
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
                    window.localStorage.setItem("outlet_name", JSON.stringify(this.outlets[0].name));
                    this.selected_outlet = window.localStorage.getItem("retailer_outlet");
                    
                    console.log(this.outlets);
                })
                .catch((err) => {

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
                        console.log(res.data.data);
                        this.loading = false;
                        this.products = res.data.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.business_products[0].product_id,
                                name: data.name,
                                amount: parseInt(data.business_products[0].pack_price),
                                sell_price: parseInt(data.business_products[0].pack_price),
                                quantity: data.business_products[0].qty,
                                size: data.size,
                                public_image_url: data.public_image_url?data.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.business_products[0].qty,
                                sku: data.sku,
                                date:data.created_at,
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
        goBack(){
            this.results = [];
            this.getProductCategories();
        },
        changeOutlet(event){
            window.localStorage.setItem("retailer_outlet", JSON.stringify(this.selected_outlet));
            this.selected_outlet = window.localStorage.getItem("retailer_outlet");
            console.log(event.target.name)
            this.getProducts();
        },
        removeCart(){
            if(this.distributor){
                window.localStorage.removeItem("distributor_cart");
            }else{
                window.localStorage.removeItem("retailer_cashier_order");
            }
            this.show_cat = false;
            this.cart_order = [];
        },
        saveOrder(type) {
            this.saving = true;
            // if(checkUserPermission('order products') == true){
                if(this.distributor){
                    this.saved_orders = JSON.parse(window.localStorage.getItem("distributor_cart"))
                    var business =  JSON.parse(window.localStorage.getItem("cahier_business"))
                    var url = '/my/distributor/customer/order'
                }else{
                    this.saved_orders = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
                    business = ''
                    url = '/my/retailer/orders'
                }
            // }else{
            //     this.saved_orders = JSON.parse(window.localStorage.getItem("cashier_order"))
            // }
            // this.saved_orders.filter((v) =>{ 
            //     if(v.customer.replace == true){
            //         v.customer.name = this.customer;
            //     }
            // });
            const payload = {
                "orders": this.saved_orders,
                "business_id":business,
                "customer":this.customer,
                "payment_type":type        
            }
        this.loading = false
            console.log(payload);


            fetch(BASE_URL + url, {
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
                    if(!this.distributor){
                    window.localStorage.setItem("retailer_cashier_order",[]);                    
                    window.localStorage.removeItem("retailer_cashier_order");
                    }
                    if(this.distributor){
                    window.localStorage.removeItem("distributor_cart");
                    }
                    this.saving = false;
                    // console.log(res)
                    // this.$swal("Payment Successful",'success');
                    
                    if(res.success){
                        this.$swal({
                            title: 'Success',
                            text: "Payment Successful",
                            icon: 'success',
                            confirmButtonText: 'ok'
                        });
                    }else{
                        // let errors = '';
                        // res.message.errors.forEach((error)=>{
                        //     errors +=error;
                        // })
                        // console.log(errors.product_1);
                        this.$swal({
                            title: 'Error',
                            text: "Error saving order",
                            icon: 'error',
                            confirmButtonText: 'ok'
                        });
                    }
                    this.show_cat = false;
                    this.cart_order = [];
                    
                    
                    this.getProducts();
                })
                .catch(err => {
                    this.saving = false;
                    this.$swal();
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.getProducts();
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
        },
        getBalance() {
            
            fetch(BASE_URL + '/user/wallet-balance', {
                        headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': getToken()
                        }
                    })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data)
                    window.localStorage.setItem("wallet-balance",res.data.available_balance)
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.status == 401) {
                        this.saving = false;
                        
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
        },
        getOrderNotification(){
            fetch(BASE_URL + '/my/distributor/groupTransactions?status=pending', {
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.data)
                this.notification_info = res.data.total;
               
            })
            .catch(err => {
                console.log(err)              
                
            });
        },

    },

    mounted() {
        if (!this.distributor && JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
            this.getCart();
        }

        if (this.distributor && JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"));
            this.getCart();
            console.log(this.cart)
            
        }

        // if(this.distributor){
            this.getOrderNotification();
        // }
        this.getBalance();
        this.userPermission();
        this.checkPermission();
        this.checkColumn();
        this.getProducts();
        this.username = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        // if(getRole().toLowerCase == 'cashier'){
        //     this.getCashierOutlets()
        // }
    }
}