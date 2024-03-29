import { getName, logout, getToken, getOutlet,checkUserPermission, getRole } from '../../../config'
import { BASE_URL,CASHIER_BUSINESS } from '../../../env';
import Dropdown from 'vue-simple-search-dropdown';
import Loading from "../../../components/Loader.vue";
import Select2 from 'v-select2-component';
import Vue from 'vue';
Vue.use(require('vue-moment'));
// import { ImageBarcodeReader } from "vue-barcode-reader";
// import { CREATE_ORDER, CREATE_PRODUCT } from "../../../store/action";
export default {
    name: "ProductComponent",
    components: {
        "vue-select": require("vue-select"),
        Dropdown,
        Loading,
        Select2
      },
    data() {
        return {
            myValue: 'Search Products',
            myOptions: [],
            products: '',
            user_form: false,
            loading: true,
            local_product: [],
            search: '',
            start_date: '',
            end_date: '',
            saving: false,
            categories: '',
            product: {
                barcode: '',
                recommended_price: '',
                price: '',
                outlet_qty: '',
                category_id: '',
                category:[],
                restock_level: '',
                name: '',
                image:'../../../assets/icon/noun_Upload_2321446.png',                
                outlet: '',
                minimum_order_quantity:'',
                pack_price:'',
                pack_qty:'',
                qty:'',
                id:'',
                unit_price:"100",
                unit_qty:10,
                product_id:''
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
            outlets:[],
            retailer_product:{
                barcode: '',
                price: '',
                unit_price: '',
                pack_price: '',
                outlet_qty: '',
                category_id: '',
                restock_level: '',
                category:'',
                name: '',                
                outlet: '',
                quantity:'',
                restock:'',
                product_id:'',
                qty:'',
                image:''
            },
            restock_product:{
                qty: '',
                restock_level: '',
                product_id:'',
                type:'',
                pack_qty:'',
                unit_qty:''
            },
            page:'',
            distributor:false,
            system_products:[],
            list_products:[],
            selected_product:'',
            url:'',
            per_page: 50,
            select2Options: {
                ajax : {
                    url: BASE_URL + '/my/products',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": getToken()
                    },
                    // Query parameters will be ?search=[term]&page=[page]
                    data: function (params) {
                        return {
                            search: params.term,
                            type: 'name',
                            via: 'api',
                            page: params.page || 1
                        }
                    },
                    processResults: function (data, params) {
                        let res = [];
                        data.data.results.data.filter(item => {
                            res.push({
                                id: item.id,
                                text: item.size?`${item.name} (${item.size})`:`${item.name}`,
                                name: item.name,
                                amount: parseInt(item.recommended_price),
                                quantity: item.stock_quantity,
                                category: item.categories[0] ?item.categories[0].name:'No Category',
                                category_id: item.categories[0] ?item.categories[0].id:'No Category',
                                size: item.size,
                                public_image_url: item.public_image_url?item.public_image_url:'../../../assets/icon/noun_Upload_2321446.png',
                                image: item.public_image_url?item.public_image_url:'../../../assets/icon/noun_Upload_2321446.png',
                                qty: item.stock_quantity,
                                restock_level:0,
                                sku: item.sku,
                                barcode: item.barcode?item.barcode:"",
                                date:item.created_at,
                                unit_price:"100",
                                unit_qty:10
                            });
                        });

                        params.page = params.page || 1;
                        return {
                            results: res,
                            pagination: {
                                more: (params.page * 10) < data.total_pages
                            }
                        };
                    },
                    delay: 200,
                },
                placeholder: 'Search Product',
                    allowClear:true,
                    minimumInputLength: 3
            }
        }
    },
    computed: {
        // filerProducts() {
        //     return this.local_product.filter((product) => (new Date(this.start_date).getTime() < new Date(product.date).getTime() &&
        //         new Date(product.date).getTime() < new Date(this.end_date).getTime()))
        // }
    },
    methods: {
        myChangeEvent(val){
            console.log(val);
        },
        selectedProduct(product){
            console.log(product)
            this.product = product;
        },

        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            this.local_product = [];
            console.log(this.start_date.toString());
            this.getProducts();
        },
        getQuatity(index, event) {
            console.log(event.target.value + " index " + index);


            var theQty = parseInt(event.target.value)
            this.local_product[index].qty = theQty;

        },

        getPageProducts(page) {
            this.local_product = [];
            if(checkUserPermission('order products') == false && this.distributor == false){
                this.loading = true;
                fetch(page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                        this.page = res.data;
                        this.products.forEach((data) => {
                            this.local_product.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.price),
                                quantity: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                date:data.product.created_at

                            });
                        });
                        console.log(this.local_product);
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
            if(checkUserPermission('order products') == true && this.distributor == false){

                this.loading = true;
                fetch(page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                            // console.log(res);
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                        this.loading = false;
                        this.products = res.data.data;
                        this.page = res.data;
                        // console.log(this.products);
                        this.products.forEach((data) => {
                            this.local_product.push({
                                sales_stat: data.sales_stat,
                                product_id: data.product.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.price),
                                price: parseInt(data.price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                category_id: data.product.categories[0] ?data.product.categories[0].id:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                restock_level: data.restock_level,
                                date:data.product.created_at

                            });
                        });
                        console.log(this.local_product);
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
            if(this.distributor == true){

                this.loading = true;
                fetch(page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                            // console.log(res);
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                        this.loading = false;
                        this.products = res.data.data;
                        this.page = res.data;
                        // console.log(this.products);
                        this.products.forEach((data) => {
                            this.local_product.push({
                                sales_stat: data.sales_stat,
                                product_id: data.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.pack_price),
                                price: parseInt(data.pack_price),
                                pack_price: parseInt(data.pack_price),
                                unit_price: data.unit_price,
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0].name,
                                category_id: data.product.categories[0].id,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sales:data.sales_stat?data.sales_stat.total_sold:0,
                                sales_amount:data.sales_stat?data.sales_stat.total_amount:0,
                                sku: data.product.sku,
                                pack_qty:data.pack_qty,
                                unit_qty:data.unit_qty,
                                restock_level: data.restock_level,
                                date:data.product.created_at

                            });
                        });
                        console.log(this.local_product);
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
        getProducts() {
            this.loading = true;
            this.local_product = [];
            if(checkUserPermission('order products') == false && this.distributor == false){
                this.loading = true;
                fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("cashier_business")+'/products?per_page='+this.per_page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                        this.page = res.data;
                        this.products.forEach((data) => {
                            this.local_product.push({
                                sales_stat: data.sales_stat,
                                product_id: data.id,
                                name: data.product.name,
                                amount: parseInt(data.price),
                                recommended_price: parseInt(data.price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sales:data.sales_stat?data.sales_stat.total_sold:0,
                                sales_amount:data.sales_stat?data.sales_stat.total_amount:0,
                                sku: data.product.sku,
                                date:data.product.created_at

                            });
                        });
                        console.log('here', this.local_product);
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
            if(checkUserPermission('order products') == true && this.distributor == false){

                this.loading = true;
                fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/products?per_page='+this.per_page+'&start_date='+this.start_date+'&end_date='+this.end_date, {
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
                            // console.log(res);
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                        this.loading = false;
                        this.products = res.data.data;
                        this.page = res.data;
                        // console.log(this.products);
                        this.products.forEach((data) => {
                            this.local_product.push({
                                sales_stat: data.sales_stat,
                                product_id: data.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.price),
                                price: parseInt(data.price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                category_id: data.product.categories[0] ?data.product.categories[0].id:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sales:data.sales_stat?data.sales_stat.total_sold:0,
                                sales_amount:data.sales_stat?data.sales_stat.total_amount:0,
                                sku: data.product.sku,
                                restock_level: data.restock_level,
                                date:data.product.created_at

                            });
                        });
                        console.log('there', this.local_product);
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

            if(this.distributor == true && checkUserPermission('distributor') == true){
                this.loading = true;
                fetch(BASE_URL + '/my/distributor/products?start_date='+this.start_date+'&end_date='+this.end_date, {
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
                            // console.log(res);
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                        this.loading = false;
                        this.products = res.data.data;
                        this.page = res.data;
                        // console.log(this.products);
                        this.products.forEach((data) => {
                            this.local_product.push({
                                sales_stat: data.sales_stat,
                                product_id: data.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.pack_price),
                                price: parseInt(data.pack_price),
                                pack_price: parseInt(data.pack_price),
                                unit_price: data.unit_price,
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0].name,
                                category_id: data.product.categories[0].id,
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sales:data.sales_stat?data.sales_stat.total_sold:0,
                                sales_amount:data.sales_stat?data.sales_stat.total_amount:0,
                                sku: data.product.sku,
                                pack_qty:data.pack_qty,
                                unit_qty:data.unit_qty,
                                restock_level: data.restock_level,
                                date:data.product.created_at

                            });
                        });
                        console.log('herererer', this.local_product);
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
        chooseFiles() {
            document.getElementById("fileUpload").click()
        },
        fileChange() {
            let input = this.$refs.fileInput
            let file = input.files
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.retailer_product.image = e.target.result
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        },
        addFiles() {
            document.getElementById("productUpload").click()
        },
        fileChanges() {
            let input = this.$refs.fileInputs
            let file = input.files
            console.log(file)
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.product.image = e.target.result
                }
                reader.readAsDataURL(file[0])
                this.$emit('input', file[0])
            }
        },
        editRetailerProduct(product){
            this.retailer_product = product;
        },
        updateProduct(){
            this.saving = true;
            if(getRole() == 'Distributor'){
                this.retailer_product.type = 'pack';
                delete this.retailer_product.qty
                this.retailer_product.unit_price = this.retailer_product.unit_price.toString();
                this.retailer_product.pack_price = this.retailer_product.pack_price.toString();
                this.page = '/my/distributor/product/' + this.retailer_product.product_id
            }else{
                this.page = '/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/product/' + this.retailer_product.product_id
            }
            if(this.retailer_product.image.includes('https://')){
                delete this.retailer_product.image;
            }
            fetch(BASE_URL + this.page, {
                method: 'PUT',
                body: JSON.stringify(this.retailer_product),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                this.saving = false;
                if(res.success){
                    this.$swal({
                        title: 'Success',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });
                }else{
                    this.$swal({
                        title: 'Warning',
                        text: res.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    });
                }
                this.getProducts();
                this.getCategories();
            })
            .catch(err => {
                this.$swal({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                this.saving = false;
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
        updateProductQuantity(){
                if(!this.distributor){
                    this.saving = true;
                    const payload = {
                        'qty':this.retailer_product.restock,
                        'price':this.retailer_product.price
                    };
                fetch(BASE_URL + '/my/outlet/' + window.localStorage.getItem("retailer_outlet") + '/product/'+this.retailer_product.product_id, {
                    method: 'PUT',
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
                    if(res.success){
                    this.$swal({
                        title: 'Success',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });
                }else{
                    this.$swal({
                        title: 'Warning',
                        text: res.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    });
                }
                    this.getProducts();
                    this.getCategories();
                })
                .catch(err => {

                    
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.saving = false;
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
            }else{
                this.saving = true;
                    const payload = {
                        'qty':this.retailer_product.restock,
                        'product_id':this.retailer_product.product_id,
                        'type': "pack",
                        'unit_qty':this.retailer_product.unit_qty,
                        'pack_qty':this.retailer_product.pack_qty,
                    };
                fetch(BASE_URL + '/my/distributor/product/'+payload.product_id, {
                    method: 'PUT',
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
                    
                    if(res.success){
                        this.$swal({
                            title: 'Success',
                            text: res.message,
                            icon: 'success',
                            confirmButtonText: 'ok'
                        });
                    }else{
                        this.$swal({
                            title: 'Warning',
                            text: res.message,
                            icon: 'warning',
                            confirmButtonText: 'ok'
                        });
                    }
                    this.getProducts();
                    this.getCategories();
                })
                .catch(err => {
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.$swal({
                        title: 'Error',
                        text: "Session Expired",
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    this.saving = false;
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
            }
        },
        getCategories() {
            // this.loading = true;
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
        createRetailerProduct(){
            if(this.product.pack_price && this.product.qty && this.product.restock_level){
            this.saving = true;
            delete this.product.sku;
            this.product.product_id = this.product.id;
            this.product.price = this.product.pack_price;
            const payload = {
                "products":[this.product]
            }
            fetch(BASE_URL +'/my/outlet/'+window.localStorage.getItem("retailer_outlet")+'/products/add', {
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
                if(res.success){
                    this.$swal({
                        title: 'Success',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });
                    this.product = '';
                }else{
                    this.$swal({
                        title: 'Warning',
                        text: res.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    });
                }
                console.log(res);
                this.getProducts();
                this.getCategories();
            })
            .catch(err => {
                this.saving = false;
                this.$swal({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
            });
        }else{
            this.$swal({
                title: 'Warning',
                text: 'Please fill in the product details',
                icon: 'warning',
                confirmButtonText: 'ok'
            });
        }
        },
        createProduct() {
            this.saving = true;
            if(!this.product != ''){
            fetch(BASE_URL + '/my/distributor/product/'+this.product.id+'/add', {
                    method: 'POST',
                    body: JSON.stringify(this.product),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    this.saving = false;
                   if(res.success){
                    this.$swal({
                        title: 'Success',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });
                    this.product = '';
                }else{
                    this.$swal({
                        title: 'Warning',
                        text: res.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    });
                }
                    this.getProducts();
                    this.getCategories();
                })
                .catch(err => {
                    this.saving = false;
                    this.$swal({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                    
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

            }else{
                this.$swal({
                    title: 'Warning',
                    text: "Please fill in the product details",
                    icon: 'warning',
                    confirmButtonText: 'ok'
                }); 
                this.saving = false;
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
        userPermission(){
            if(checkUserPermission('order products') == false && this.distributor == false){
                this.business_id = window.localStorage.getItem(CASHIER_BUSINESS);
            }else{
                this.business_id = window.localStorage.getItem("retailer_business");
            }
        }
    },
    

    mounted() {
        // this.getSystemProducts();
        if(getRole() == 'Distributor'){
            this.distributor = true;
        }
        this.userPermission();
        this.getProducts();
        this.create_product = checkUserPermission('create products');
        // this.distributor = checkUserPermission('distributor');
        
        // this.business_id = window.localStorage.getItem("retailer_business");
        this.name = getName();
        
        this.getCategories();
        this.outlet = getOutlet();
        // this.start_date = new Date("2015-08-21");
        // this.end_date = new Date().toString();
        if (JSON.parse(window.localStorage.getItem("orders"))) {
            this.product_orders = JSON.parse(window.localStorage.getItem("orders"));
        }        
        this.getBusinessOutlets();
    }, 
}