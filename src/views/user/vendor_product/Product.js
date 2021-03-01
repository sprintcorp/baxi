import { BASE_URL } from '../../../env'
import { getToken, logout,checkUserPermission } from '../../../config'
export default {
    name:"VendorComponent",
    data(){
        return{
            vendor_products:[],
            loading:false,
            product:'',
            quantity_value:0,
            error:false,
            cart:[],
            key:'',
            show_cart:false,
            order_products:'',
            cart_order:[],
            total:'',
            type:'',
            date:'',
            show_date:false,
            saving:false,
            search:'',
            notification:'',
            wallet:'',
            page:''
        }
    },
    computed: {
        filerResult() {
            return this.vendor_products.filter((result) => result.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods:{
        showDate(){
            if(this.type == 'pickup'){
                this.show_date = false
            }else{
                this.show_date = true;
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
        submitToCart(value,products){

            // products.quantity = value
            products.qty = value
            // products.business_id = parseInt(window.localStorage.getItem("retailer_business"))
            products.outlet_id = parseInt(window.localStorage.getItem("retailer_outlet"))
            products.amount = value * products.price
            if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_order"))
            }
            // product.qty = value;
            this.pushToArray(this.cart, products);
            window.localStorage.setItem("retailer_order", JSON.stringify(this.cart));
            this.show_cart = true;
            // this.quantity_value = 0;
            this.quantity_value = products.minimum_order;
            this.getCart();
            console.log(this.cart)
            

        },
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        addToCart(product,index){
            this.product = product;
            this.key = index
            console.log(this.key)
            this.quantity_value = product.minimum_order;
            // alert("hello")
        },
        increase(qty){
            // alert(qty)
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
        sumProduct() {
            if (JSON.parse(window.localStorage.getItem("retailer_order")) && JSON.parse(window.localStorage.getItem("retailer_order")).length) {
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"))
                let sum = this.cart_order.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                this.total = sum;
                this.show_cart = true;
            }else{
                this.show_cart = false;
            }
        },
        getCart(){
            if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
                this.show_cart = true;
                this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"));
                this.sumProduct()
                console.log(this.cart_order)
            }else{
                this.show_cart = false;
            }
        },
        removeFromCart(cart_order,index){
            const filteredItems = cart_order.slice(0, index).concat(cart_order.slice(index + 1, cart_order.length))
            window.localStorage.setItem("retailer_order", JSON.stringify(filteredItems));
            
            this.sumProduct();
            this.getCart();
            console.log(filteredItems)
        },
        saveOrder() {
            this.saving = true;
            if(this.date.length > 0){
                var date = new Date();
                    const month = date.getMonth() + 1;
                    const day = date.getDate() + parseInt(this.date);
                    
                    var period = date.getFullYear()+'-'+ month +'-'+day;
            }

        
        const payload = {
            "orders": JSON.parse(window.localStorage.getItem("retailer_order")),
            "delivery":{"type": this.type, "date": period},
            "outlet_id":parseInt(window.localStorage.getItem("retailer_outlet"))
        }
        console.log(payload);
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
                window.localStorage.removeItem("retailer_order");
                this.show_cart = false;
                this.saving = false;
                this.$swal({
                    title: res.message,
                    text: 'Order *********'+res.data.group_id.slice(-4)+' sent to the distributor. You will receive a feedback shortly',
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                this.getVendorProducts();
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

        getVendorProducts() {
            this.vendor_products = [];
            this.loading = true
            fetch(BASE_URL + '/my/products/category/' +
            window.localStorage.getItem("vendor_category_id") + '/business/' +
            this.$route.params.id, {
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
                    this.page = res.data;
                    res.data.data.forEach((data) => {
                        this.vendor_products.push({
                            product_id: data.id,
                            business_id: this.$route.params.id,
                            name: data.product.name,
                            price: parseFloat(data.pack_price),
                            pack: data.pack_label,
                            minimum_order: data.minimum_order_qty,
                            quantity: data.qty,
                            size: data.size,
                            image:data.product.public_image_url,
                            qty: data.qty,
                            pack_label:data.pack_label,
                            pack_qty:data.pack_qty,
                        });
                    });
                    console.log(this.local_product);
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },

        getPageVendorProducts(page) {
            this.vendor_products = [];
            this.loading = true
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
                        console.log(res);
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.page = res.data;
                    res.data.data.forEach((data) => {
                        this.vendor_products.push({
                            product_id: data.id,
                            business_id: this.$route.params.id,
                            name: data.product.name,
                            price: parseFloat(data.pack_price),
                            pack: data.pack_label,
                            minimum_order: data.minimum_order_qty,
                            quantity: data.qty,
                            size: data.size,
                            image:data.product.public_image_url,
                            qty: data.qty,
                            pack_label:data.pack_label,
                            pack_qty:data.pack_qty,
                        });
                    });
                    console.log(this.local_product);
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        getNotification(){
            // this.loading = true
            fetch(BASE_URL + '/user/notifications/unread', {
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
                    this.notification = res.data.slice(0,5)
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        updateNotification(id){
            fetch(BASE_URL + '/user/notifications/'+id+'/mark-as-read', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                
                console.log(res)
                setTimeout(this.getNotification(),10000);
            })
            .catch(err => {
                this.saving = false;
                console.log(err)
                if (err.response.status == 401) {
                    this.saving = false;
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
            });
        },
        myDate(){
            var date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate() + parseInt(this.date);
            
        alert(date.getFullYear()+'-'+ month +'-'+day);
        }
    },
    mounted() {
        this.wallet =  window.localStorage.getItem('wallet-balance');
        this.getNotification();
        this.getVendorProducts();
        this.order_products = checkUserPermission('order products')
        this.getCart();
    },
}