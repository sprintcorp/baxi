import { getName, logout, getToken, getOutlet,checkUserPermission } from '../../../config'
import { BASE_URL,CASHIER_BUSINESS } from '../../../env'
// import { CREATE_ORDER, CREATE_PRODUCT } from "../../../store/action";
export default {
    name: "ProductComponent",
    data() {
        return {
            products: '',
            user_form: false,
            loading: false,
            local_product: [],
            search: '',
            start_date: '',
            end_date: '',
            saving: false,
            categories: '',
            product: {
                barcode: '',
                recommended_price: '',
                outlet_qty: '',
                category_id: '',
                restock_level: '',
                name: '',

                
                outlet: '',
            },
            cart: {
                customer: {
                    name: '',
                    email: '',
                    phone: ''
                },
            },
            retailer_orders: [],
            product_orders: [],
            create_product:'',
            business_id:'',
            outlets:[]
        }
    },
    computed: {
        filerProducts() {
            return this.local_product.filter((product) => (new Date(this.start_date).getTime() < new Date(product.date).getTime() &&
                new Date(product.date).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        showDate() {
            console.log(this.start_date.toString());
        },
        getQuatity(index, event) {
            console.log(event.target.value + " index " + index);


            var theQty = parseInt(event.target.value)
            this.local_product[index].qty = theQty;

        },

        getProducts() {
            this.loading = true;
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
                        this.local_product.push({
                            product_id: data.product.id,
                            outlet_id: parseInt(getOutlet()),
                            name: data.product.name,
                            amount: parseInt(data.product.recommended_price),
                            quantity: data.product.qty,
                            size: data.product.size,
                            image: data.product.public_image_url,
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
        getCategories() {
            this.loading = true;
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
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.loading = false;
                    this.categories = res.data;
                    console.log(this.products);
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        },
        createProduct() {
            this.saving = true;
            const payload = {
                "barcode": this.product.barcode,
                "recommended_price": this.product.recommended_price,
                "outlet_qty": this.product.outlet_qty,
                "category_id": parseInt(this.product.category_id),
                "restock_level": this.product.restock_level,
                "name": this.product.name,
                "brand_id": 1
                    // "outlet": this.$route.params.id
            };
            console.log(payload);

            fetch(BASE_URL + '/my/outlet/' + this.product.outlet + '/products/new', {
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
                    this.$swal(res.message);
                    this.getProducts();
                    this.getCategories();
                })
                .catch(err => {

                    this.$swal(err.response.data.message);
                    this.saving = false;
                    console.log(err)
                    if (err.response.status == 401) {
                        this.saving = false;
                        this.$swal("Session Expired");
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                });



        },
        pushToArray(arr, obj) {
            const index = arr.findIndex((e) => e.product_id === obj.product_id);

            if (index === -1) {
                arr.push(obj);
            } else {
                arr[index] = obj;
            }
        },
        addToCart(product) {
            console.log(product)
            this.$toasted.show(product.name + ' added to cart', { duration: 2000, type: 'success' });
            product.customer.name = window.localStorage.getItem("customer_name")
            product.customer.email = window.localStorage.getItem("customer_email")
            product.customer.phone = window.localStorage.getItem("customer_phone")
            this.pushToArray(this.retailer_orders, product);
            console.log(this.retailer_orders)
            window.localStorage.setItem('orders', JSON.stringify(this.retailer_orders));
            this.product_orders = JSON.parse(window.localStorage.getItem("orders"));
        },
        removeFromCart(index) {
            console.log(index.product_id)
            this.product_orders = JSON.parse(window.localStorage.getItem("orders"));
            const removeProduct = this.product_orders.map(function(product) { return product.product_id; }).indexOf(index.product_id);
            this.product_orders.splice(removeProduct, 1);
            window.localStorage.setItem('orders', JSON.stringify(this.product_orders));
            this.product_orders = JSON.parse(window.localStorage.getItem("orders"));
        },
        clearCartItem() {
            window.localStorage.removeItem("orders");
            this.product_orders = [];
            this.$swal("Cart Item Cleared");

        },
        saveOrder() {
            const payload = {
                "orders": JSON.parse(window.localStorage.getItem("orders"))
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
                    this.$swal(res.message);
                    window.localStorage.removeItem("orders");
                })
                .catch(err => {
                    this.$swal(err.response.data.message);
                    this.saving = false;
                    console.log(err)
                    if (err.response.status == 401) {
                        this.$swal("Session Expired");
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                });
        },
        showUserForm() {
            this.user_form = true;
        },
        closeUserForm() {
            this.user_form = false;
        },
        addUserToProduct() {
            this.user_form = false;
            window.localStorage.setItem('customer_name', this.cart.customer.name);
            window.localStorage.setItem('customer_email', this.cart.customer.email);
            window.localStorage.setItem('customer_phone', this.cart.customer.phone);
            // this.getProducts();
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
        userPermission(){
            if(checkUserPermission('order products') == false){
                this.business_id = window.localStorage.getItem(CASHIER_BUSINESS);
            }else{
                this.business_id = window.localStorage.getItem("retailer_business");
            }
        }
    },
    

    mounted() {
        this.userPermission();
        this.create_product = checkUserPermission('create products');
        // this.business_id = window.localStorage.getItem("retailer_business");
        this.name = getName();
        this.getProducts();
        this.getCategories();
        this.outlet = getOutlet();
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
        if (JSON.parse(window.localStorage.getItem("orders"))) {
            this.product_orders = JSON.parse(window.localStorage.getItem("orders"));
        }        
        this.getBusinessOutlets();
    }, 
}