import { getName, logout, getToken, getOutlet, getId } from '../../../config'
import { BASE_URL } from '../../../env'
// import { CREATE_ORDER, CREATE_PRODUCT } from "../../../store/action";
export default {
    name: "ProductComponent",
    data() {
        return {
            products: '',
            user_form: false,
            loading: false,
            local_product: [],
            saving: false,
            product: {
                barcode: '',
                recommended_price: '',
                outlet_qty: '',
                category_id: '',
                restock_level: '',
                name: '',

                categories: '',
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
        }
    },
    methods: {
        getQuatity(index, event) {
            console.log(event.target.value + " index " + index);


            var theQty = parseInt(event.target.value)
            this.local_product[index].qty = theQty;

        },

        getProducts() {
            this.loading = true;
            fetch(BASE_URL + '/my/outlet/' + this.$route.params.id + '/products', {
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
                            quantity: data.qty,
                            qty: 1,
                            retailer_id: getId(),
                            customer: {
                                name: this.cart.customer.name,
                                email: this.cart.customer.email,
                                phone: this.cart.customer.phone
                            }

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
            // this.$store.dispatch(CREATE_PRODUCT, payload).then((data) => {
            //         this.$swal(data.message);
            //         this.getProducts();
            //         this.saving = false;
            //     })
            //     .catch(err => {
            //         this.$swal(err.response.data.message);
            //         this.saving = false;
            //         console.log(err)
            //         if (err.response.status == 401) {
            //             this.$swal("Session Expired");
            //             logout();
            //             this.$router.push({ name: 'welcome' });
            //         }
            //     });

            fetch(BASE_URL + '/my/outlet/' + this.$route.params.id + '/products/new', {
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
        addToCart(product) {
            console.log(product)
            product.customer.name = window.localStorage.getItem("customer_name")
            product.customer.email = window.localStorage.getItem("customer_email")
            product.customer.phone = window.localStorage.getItem("customer_phone")
            console.log("Product " + product)
            this.retailer_orders.push(product);
            console.log(this.retailer_orders)
            window.localStorage.setItem('order', JSON.stringify(this.retailer_orders));
        },
        saveOrder() {
            const payload = {
                "orders": JSON.parse(window.localStorage.getItem("order"))
            }
            console.log(payload);
            // this.$store.dispatch(CREATE_ORDER, payload).then((data) => {
            //     this.$swal(data.message);
            //     window.localStorage.removeItem("order");
            // }).catch(err => {
            //     this.$swal(err.response.data.message);
            //     this.saving = false;
            //     console.log(err)
            //     if (err.response.status == 401) {
            //         this.$swal("Session Expired");
            //         // logout();
            //         // this.$router.push({ name: 'welcome' });
            //     }
            // });


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
                    window.localStorage.removeItem("order");
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
        }
    },

    mounted() {
        this.name = getName();
        this.getProducts();
        this.getCategories();
        this.outlet = getOutlet();
    },



    computed: {

    }
}