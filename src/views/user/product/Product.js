import { getName, logout, getToken, getOutlet,checkUserPermission } from '../../../config'
import { BASE_URL,CASHIER_BUSINESS } from '../../../env';
// import { ImageBarcodeReader } from "vue-barcode-reader";
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
                image:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',                
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
            outlets:[],
            retailer_product:{
                barcode: '',
                recommended_price: '',
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
            },
            page:'',
            distributor:false,
            
        }
    },
    computed: {
        filerProducts() {
            return this.local_product.filter((product) => (new Date(this.start_date).getTime() < new Date(product.date).getTime() &&
                new Date(product.date).getTime() < new Date(this.end_date).getTime()))
        }
    },
    methods: {
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            console.log(this.start_date.toString());
        },
        getQuatity(index, event) {
            console.log(event.target.value + " index " + index);


            var theQty = parseInt(event.target.value)
            this.local_product[index].qty = theQty;

        },
        getPageProducts(page) {
            this.local_product = [];
            if(checkUserPermission('order products') == false && checkUserPermission('distributor') == false){
                this.loading = true;
                fetch(page, {
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
                        this.page = res.data;
                        this.products.forEach((data) => {
                            this.local_product.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
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
                                this.$swal("Session Expired");
                                logout();
                                this.$router.push({ name: 'welcome' });
                            }
                        }

                    );
                
            }
            if(checkUserPermission('order products') == true && checkUserPermission('distributor') == false){

                this.loading = true;
                fetch(page, {
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
                                product_id: data.product.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                category_id: data.product.categories[0] ?data.product.categories[0].id:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                restock_level: data.product.restock_level,
                                date:data.product.created_at

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
            }
            if(checkUserPermission('distributor') == true){

                this.loading = true;
                fetch(page, {
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
                                product_id: data.product.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                category_id: data.product.categories[0] ?data.product.categories[0].id:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                restock_level: data.product.restock_level,
                                date:data.product.created_at

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
            }
        },
        getProducts() {
            this.local_product = [];
            if(checkUserPermission('order products') == false && checkUserPermission('distributor') == false){
                this.loading = true;
                fetch(BASE_URL + '/my/outlet/'+window.localStorage.getItem("cahier_outlet")+'/products', {
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
                        this.page = res.data;
                        this.products.forEach((data) => {
                            this.local_product.push({
                                product_id: data.product.id,
                                name: data.product.name,
                                amount: parseInt(data.product.recommended_price),
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
                                this.$swal("Session Expired");
                                logout();
                                this.$router.push({ name: 'welcome' });
                            }
                        }

                    );
                
            }
            if(checkUserPermission('order products') == true && checkUserPermission('distributor') == false){

                this.loading = true;
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
                                product_id: data.product.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: data.product.categories[0] ?data.product.categories[0].name:'No Category',
                                category_id: data.product.categories[0] ?data.product.categories[0].id:'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                restock_level: data.product.restock_level,
                                date:data.product.created_at

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
            }

            if(checkUserPermission('distributor') == true){
                this.loading = true;
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
                            this.$swal("Session Expired");
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
                                product_id: data.product.id,
                                name: data.product.name,
                                recommended_price: parseInt(data.product.recommended_price),
                                quantity: data.qty,
                                outlet_qty: data.qty,
                                category: 'No Category',
                                category_id: 'No Category',
                                size: data.product.size,
                                public_image_url: data.product.public_image_url?data.product.public_image_url:'data:image/png;base64,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',
                                image: data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                                qty: data.qty,
                                sku: data.product.sku,
                                restock_level: data.product.restock_level,
                                date:data.product.created_at

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
            // const formData = new FormData();
            // formData.append('image', this.retailer_product.public_image_url)
            // formData.append('name', this.retailer_product.name);
            // formData.append('catergory_id', this.retailer_product.catergory_id);
            // formData.append('restock_level', this.retailer_product.restock_level);
            // formData.append('qty', this.retailer_product.quantity);
            // formData.append('recommended_price', this.retailer_product.recommended_price);
            console.log(this.retailer_product)
            // formData.append('product_id', this.retailer_product.product_id);
            // for(var pair of formData.entries()) {
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }
            this.saving = true;
            if(this.retailer_product.image.includes('https://')){
                delete this.retailer_product.image;
            }
            fetch(BASE_URL + '/my/products/' + this.retailer_product.product_id, {
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
        updateProductQuantity(){
                if(!this.distributor){
                    this.saving = true;
                    const payload = {
                        'qty':this.retailer_product.restock,
                        'product_id':this.retailer_product.product_id
                    };
                fetch(BASE_URL + '/my/outlet/' + window.localStorage.getItem("retailer_outlet") + '/product', {
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
            }else{
                this.saving = true;
                    const payload = {
                        'qty':this.retailer_product.restock,
                        'product_id':this.retailer_product.product_id,
                        'type':this.retailer_product.type,
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
            }
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
                    this.saving = false;
                    this.$swal(err.response.data.message);
                    
                    console.log(err)
                    if (err.response.status == 401) {
                        this.saving = false;
                        this.$swal("Session Expired");
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                });



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
            if(checkUserPermission('order products') == false && checkUserPermission('distributor') == false){
                this.business_id = window.localStorage.getItem(CASHIER_BUSINESS);
            }else{
                this.business_id = window.localStorage.getItem("retailer_business");
            }
        }
    },
    

    mounted() {
        this.userPermission();
        this.create_product = checkUserPermission('create products');
        this.distributor = checkUserPermission('distributor');
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