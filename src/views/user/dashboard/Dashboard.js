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
            role: localStorage.getItem('role'),
            user: null,
            businesses: [],
            username: '',
            loading: true,
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
        }
    },
    computed: {
        order_id_last_for_digits() {
            if(this.last_order_id) return this.last_order_id.slice(-4);
        },

        filerResult() {
            console.log(isNaN(this.search))
            if(isNaN(this.search) || this.search.length < 1){                
                return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()) || result.sku.toLowerCase().includes(this.search.toLowerCase()))
            }
            if(this.search.length > 5 && !isNaN(this.search)){
                
                return this.results.filter((result) => result.barcode == this.search)
            }

        }
    },
    watch: {
        search(barcode){
            if(barcode.length > 11 && !isNaN(barcode)){
               this.myChangeFunctions(); 
            }
            if(barcode.length > 4 && barcode.length < 6){
                // this.search = '';
                this.getProducts();
            }
        }
    },
    methods: {
        myChangeFunctions(){
                // const data = this.results.filter((result) => result.barcode.toLowerCase().includes(this.search.toLowerCase()))
                // console.log(data);
                console.log(this.search)
                if(this.search.length > 10){
                    fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/products?barcode='+this.search, { headers: this.api_headers})
                    .then(response => response.json())
                    .then(response => {
                        
                        console.log(response.data)
                        this.products = response.data.data;
                        this.results = [];
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.id,
                                name: data.product.name,
                                amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                barcode: data.product.barcode ? data.product.barcode : 'No Barcode',
                                date:data.product.created_at,


                            });
                        });
                        this.submitToCart(this.results[0],'scan');
                    })
                    .catch(err => console.log(err));
                            
                            // this.submitToCart(data[0],'scan');
                            // this.search = '';
                    }
        },
        
        myChangeFunction(){
            // if(this.filerResult().length == 1){
                const data = this.results.filter((result) => result.barcode.toLowerCase().includes(this.search.toLowerCase()))
                console.log(data);
                // this.quantity_value = 1;
                if(this.search.length > 2){
                    this.submitToCart(data[0],'scan');
                    this.search = '';
                }
            // }
        },
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
        submitToCart(product,type,value = 1){
            // product.quantity = value
            // if(type == 'scan' && !value){
                // value = 1;
                console.log(type)
            // }
            if(value > 0 && value <= product.quantity){
            product.qty = value
            product.price = value * product.sell_price 
            product.int_amount = product.amount
            product.amount = product.price.toString()
            // product.customer.name = 'web';
            // product.customer.replace = true;
            product.retailer_id = getId()
            if(!this.distributor){
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"))
            }
            this.pushToArray(this.cart, product);
            window.localStorage.setItem("retailer_cashier_order", JSON.stringify(this.cart));
            this.cart = [];
            this.quantity_value = 1;
            this.getCart();
            console.log(this.cart)
            }else{
                if (JSON.parse(window.localStorage.getItem("distributor_cart"))) {
                    this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"))
                }
                this.pushToArray(this.cart, product);
                window.localStorage.setItem("distributor_cart", JSON.stringify(this.cart));
                this.cart = [];
                this.quantity_value = 1;
                this.getCart();
                console.log(this.cart)
            }
        }
        
        else{
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
            this.results = [];
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
                    // this.results = res.data
                    res.data.forEach((data) => {
                        this.results.push({
                            product_id: data.id,
                            name: data.name,
                            // amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                            // sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                            // quantity: data.qty,
                            // size: data.product.size,
                            public_image_url: data.public_image_url?data.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                            // qty: data.qty,
                            sku: data.uid,
                            // date:data.product.created_at,


                        });
                    });
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },

        getProducts(without_loading = null) {
            if(checkUserPermission('order products') == false && getRole() !== 'Distributor'){
                this.selected_outlet = window.localStorage.getItem("cashier_outlet");
                this.loading = !!without_loading;
                this.cat = false
                fetch(BASE_URL + '/my/outlet/'+this.selected_outlet+'/products?per_page='+this.per_page, {
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
                    this.getCart();
                    this.products = res.data.data;
                    this.results = [];
                    this.products.forEach((data) => {
                        this.results.push({
                            product_id: data.id,
                            name: data.product.name,
                            amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                            sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                            quantity: data.qty,
                            size: data.product.size,
                            public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                            qty: data.qty,
                            sku: data.product.sku,
                            barcode: data.product.barcode ? data.product.barcode : 'No Barcode',
                            date:data.product.created_at,


                        });
                    });
                    console.log(this.results);

                    this.loading = false;
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
                fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/products?per_page='+this.per_page, {
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
                                product_id: data.id,
                                name: data.product.name,
                                amount: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                sell_price: data.price > 0 ? parseInt(data.price) : parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                barcode: data.product.barcode ? data.product.barcode : 'No Barcode',
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

            if(getRole() == 'Distributor') {
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
                        product_id: data.id,
                        name: data.product.name,
                        amount: parseInt(data.pack_price),
                        sell_price: parseInt(data.pack_price),
                        quantity: data.qty,
                        size: data.product.size,
                        public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                        qty: data.qty,
                        sku: data.product.sku,
                        barcode: data.product.barcode ? data.product.barcode : 'No Barcode',
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
            if (JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0 && !this.distributor) {
                const cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order")).filter(cart => parseInt(cart.retailer_id) == getId());
                this.cart = cart;
                this.sumProduct()
                if(cart.length > 0){
                    this.show_cat = true;
                }
            }

            if (JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0 && this.distributor) {
                
                const cart = JSON.parse(window.localStorage.getItem("distributor_cart")).filter(cart => parseInt(cart.retailer_id) == getId());
                this.cart = cart;
                this.sumProduct()
                if(cart.length > 0){
                    this.show_cat = true;
                }
                
            }
        },
        increaseCart(cart,index){
            console.log(this.cart[index].qty)
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
            // this.loading = true;
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
                        console.log(err)
                    }

                );
        },
        getCategoryProduct(category_id){
            // alert(category_id);
            if(checkUserPermission('order products') == false){
                this.selected_outlet = window.localStorage.getItem("cashier_outlet");
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
                        this.products = res.data.results.data;
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
                        console.log(res.data.results.data);
                        this.loading = false;
                        this.products = res.data.results.data;
                        this.products.forEach((data) => {
                            this.results.push({
                                product_id: data.id,
                                name: data.name,
                                amount: parseInt(data.recommended_price),
                                sell_price: parseInt(data.recommended_price),
                                quantity: data.stock_quantity,
                                size: data.size,
                                public_image_url: data.public_image_url?data.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.stock_quantity,
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
            this.cart = [];
            if(this.distributor){
                window.localStorage.setItem("distributor_cart",[]);
                window.localStorage.removeItem("distributor_cart");
            }else{
                window.localStorage.setItem("retailer_cashier_order",[]);
                window.localStorage.removeItem("retailer_cashier_order");
            }
            this.show_cat = false;
            this.cart_order = [];
        },
        
        saveOrder(type,save = 0) {
            this.saving = true;
            this.loading = true;

            console.log(this.customer);
            if(this.distributor){
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


            fetch(BASE_URL + url, {
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
                        this.getProducts(true);
                        

                        this.removeCart();
                        this.customer = {
                            firstname:'',
                            lastname:'',
                            phone:'',
                            email:'',
                            baxi_username:''
                        };

                        this.show_cat = false;
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

    created() {
        // get fees
        
        this.checkPermission();
        this.getProducts();
        this.userPermission();
        this.fetchFees();

        if (!this.distributor && JSON.parse(window.localStorage.getItem("retailer_cashier_order")) && JSON.parse(window.localStorage.getItem("retailer_cashier_order")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("retailer_cashier_order"));
            this.getCart();
            // this.sumProduct()
        }

        if (this.distributor && JSON.parse(window.localStorage.getItem("distributor_cart")) && JSON.parse(window.localStorage.getItem("distributor_cart")).length > 0) {
            this.cart = JSON.parse(window.localStorage.getItem("distributor_cart"));
            this.getCart();
            // this.sumProduct()
            console.log(this.cart)

        }

        // if(this.distributor){
            this.getOrderNotification();
        // }
        this.getBalance();
        
        this.checkColumn();
        
        this.username = getName();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        // if(getRole().toLowerCase == 'cashier'){
        //     this.getCashierOutlets()
        // }
    }
}