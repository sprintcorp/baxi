// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DashboardComponent",
    data() {
        return {
            user: null,
            businesses: [],
            name: '',
            loading: false,
            type: 'category',
            search: '',
            start_date: '',
            end_date: '',
            transaction_product: [],
            products: [],
            results: [],
            cat:true,
        }
    },
    computed: {
        filerResult() {
            return this.results.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        getResponse() {
            this.results = [];
            if(this.type == 'product'){
                this.getProducts()   
            }
            if(this.type == 'category'){
                this.getProductCategories()
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
            fetch(BASE_URL + '/my/business/' + window.localStorage.getItem("retailer_business") +
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

    },

    mounted() {
        this.getUserBusiness();
        this.getProductCategories();
        this.name = getName();
        console.log(this.$router.currentRoute.name);
        this.start_date = new Date("2015-08-21").getTime();
        this.end_date = new Date().getTime();
    }
}