import { getName, getToken, getOutlet, getId, logout } from '../../../config'
import { BASE_URL } from '../../../env'
// import { CREATE_RETAILER_ORDER } from "../../../store/action";
export default {
    name: "RetailerOrderComponent",
    data() {
        return {
            categories: [],
            businesses: [],
            local_product: [],
            loading: false,
            message: '',
            retailer_orders: [],
            products: []

        }
    },
    methods: {
        getQuatity(index, event) {
            console.log(event.target.value + " index " + index);


            var theQty = parseInt(event.target.value)
            this.local_product[index].qty = theQty;

        },
        getBusinessOutlets(event) {
            console.log(event.target.value);
            window.localStorage.setItem('category_id', event.target.value);
            this.local_product = [];
            this.loading = true
            fetch(BASE_URL + '/my/category/' + event.target.value + '/businesses', {
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
                    }
                    this.businesses = res.data
                    this.loading = false;
                    this.message = 'N:B Select business you want to shop from'
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        },
        getBusinessProducts(event = 0) {
            // console.log(event.target.value);
            if (event != 0) {
                window.localStorage.setItem('business_id', event.target.value);
            }
            this.local_product = [];
            this.loading = true
            fetch(BASE_URL + '/my/products?category_id=' +
                    window.localStorage.getItem("category_id") + '&business_id=' +
                    window.localStorage.getItem("business_id"), {
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
                    }
                    res.data.data.forEach((data) => {
                        this.local_product.push({
                            product_id: data.id,
                            outlet_id: parseInt(getOutlet()),
                            business_id: parseInt(window.localStorage.getItem("business_id")),
                            name: data.name,
                            amount: parseInt(data.recommended_price),
                            quantity: data.stock_quantity,
                            size: data.size,
                            qty: 1,
                            retailer_id: getId(),
                        });
                    });
                    console.log(this.local_product);
                    this.loading = false;
                    this.message = 'There are no product for this business at the moment'

                })
                .catch(err => console.log(err));
        },
        saveOrder() {
            const payload = {
                "orders": JSON.parse(window.localStorage.getItem("order"))
            }
            console.log(payload);
            // this.$store.dispatch(CREATE_RETAILER_ORDER, payload).then((data) => {
            //     this.$swal(data.message);
            //     window.localStorage.removeItem("order");
            //     this.products = [];
            // }).catch(err => {
            //     this.$swal(err.response.data.message);
            //     this.saving = false;
            //     this.getBusinessProducts();
            //     console.log(err)
            //     if (err.response.status == 401) {
            //         this.$swal("Session Expired");
            //         // logout();
            //         // this.$router.push({ name: 'welcome' });
            //     }
            // });
            fetch(BASE_URL + '/my/distributor/orders', {
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
                    window.localStorage.removeItem("order");
                    this.saving = false;
                    this.$swal(res.message);

                    this.getBusinessProducts();
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

        getProductCategories() {
            this.loading = true
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
                    }
                    this.categories = res.data
                    this.loading = false;
                    this.message = 'N:B Select category then business you want to shop from'
                })
                .catch(err => console.log(err));
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
            this.pushToArray(this.retailer_orders, product);
            console.log(this.retailer_orders)
            window.localStorage.setItem('order', JSON.stringify(this.retailer_orders));
            this.products = JSON.parse(window.localStorage.getItem("order"));

        },
        // removeElement(array, elem) {
        //     var index = array.indexOf(elem);
        //     if (index > -1) {
        //         array.splice(index, 1);
        //     }
        // },
        removeFromCart(index) {
            console.log(index.product_id)
            this.products = JSON.parse(window.localStorage.getItem("order"));
            const removeProduct = this.products.map(function(product) { return product.product_id; }).indexOf(index.product_id);
            this.products.splice(removeProduct, 1);
            window.localStorage.setItem('order', JSON.stringify(this.products));
            this.products = JSON.parse(window.localStorage.getItem("order"));
        }
    },

    mounted() {
        this.getProductCategories();
        this.name = getName();
        if (JSON.parse(window.localStorage.getItem("order"))) {
            this.products = JSON.parse(window.localStorage.getItem("order"));
        }
    },



    computed: {

    }
}