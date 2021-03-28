import { BASE_URL } from '../../../env'
import { getToken, logout } from '../../../config'
import Loading from "../../../components/Loader.vue"
// import Dropdown from 'vue-simple-search-dropdown';
export default {
    name:"OrderCategoryComponent",
    components:{
        Loading
    },
    data(){
        return{
            categories:[],
            loading:false,
            search:'',
            notification:'',
            list_products:[],
            system_products:[],
            product:'',
            show_business:false,
            businesses:[],
            quantity_value:0,
            error:false,
            type:'pickup',
            date:'',
            show_cart:false,
            cart:[],
            wallet:'',
            total:'',
            businesses_product:[],
            show_date:false,
            saving:false,
            cart_order:[],
        }
    },
    methods:{
        checkfield(){
            // this.loading = true;
            if(this.search.length < 3){
                this.loading = false;
                this.show_business = false;
                
                this.getProductCategories();
            }else{
                this.loading = true;
            }
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
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                    this.categories = res.data
                    this.loading = false;
                    console.log(this.categories);
                })
                .catch(err => console.log(err));
        },
    searchProduct(){
        this.categories = [];
        this.list_products = [];
        this.loading = true;
        this.show_business = true;
        fetch(BASE_URL+'/my/products?search='+this.search+'&with_business=true', {
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
        // console.log(res.data.data);
        this.loading = false;
        this.system_products = res.data.results.data;
        this.system_products.forEach((product)=>{
            product.forEach((data)=>{
            this.list_products.push({
                    product_id: data.product.id,
                    business_id: data.business != '' ? data.business.id : '',
                    business_name: data.business != '' ? data.business.name : '',
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
                    // category:data.categories[0].name,
                });
            })
        })
        // this.page = res.data;
        // this.system_products.forEach((data) => {
        //     this.list_products.push({
        //         product_id: data.id,
        //         business_id: data.business_product.business != '' ? data.business_product.business.id : '',
        //         business_name: data.business_product.business != '' ? data.business_product.business.name : '',
        //         name: data.name,
        //         price: parseFloat(data.business_product.pack_price),
        //         pack: data.business_product.pack_label,
        //         minimum_order: data.business_product.minimum_order_qty,
        //         quantity: data.business_product.qty,
        //         size: data.size,
        //         image:data.public_image_url,
        //         qty: data.business_product.qty,
        //         pack_label:data.business_product.pack_label,
        //         pack_qty:data.business_product.pack_qty,
        //         category:data.categories[0].name,
        //     });
        // });
        console.log(this.list_products);
        this.getCart();
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
        });

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
    warning(){
        this.$swal({
            title: 'Out of stock',
            text: "This distributor is out of stock for this product",
            icon: 'warning',
            confirmButtonText: 'ok'
        })
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
    increaseCart(cart,index){
        if(this.cart_order[index].qty < this.cart_order[index].quantity){
        var size = ++this.cart_order[index].qty;
        }else{
            size = this.cart_order[index].qty;
            this.$swal({
                title: 'Action Denied',
                text: "Quantity exceed available quatity ",
                icon: 'warning',
                confirmButtonText: 'ok'
            });
        }
        cart[index].qty = size;
        cart[index].amount = cart[index].price * size;
        if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
            this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"))
        }

        this.pushToArray(this.cart, cart[index]);
        window.localStorage.setItem("retailer_order", JSON.stringify(this.cart));
        this.getCart();
        this.sumProduct();
    },
    decreaseCart(cart,index){
        if(this.cart_order[index].qty  > this.cart_order[index].minimum_order){
        var size = --this.cart_order[index].qty;
        }else{
            size = this.cart_order[index].qty;
            this.$swal({
                title: 'Action Denied',
                text: "Product quantity must be greater than minimum order quantity",
                icon: 'warning',
                confirmButtonText: 'ok'
            });
        }
        cart[index].qty = size;
        cart[index].amount = cart[index].price * size;
        if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
            this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"))
        }

        this.pushToArray(this.cart, cart[index]);
        window.localStorage.setItem("retailer_order", JSON.stringify(this.cart));
        this.getCart();
        this.sumProduct();
    },
    moq(){
        this.$swal({
            title: 'Action Denied',
            text: "product order quantity can't less than 5 (minimum order quantity)",
            icon: 'warning',
            confirmButtonText: 'ok'
        });
    },
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
            this.cart = [];
            window.localStorage.setItem("retailer_order",[]);
            window.localStorage.removeItem("retailer_order");
            this.show_cart = false;
            this.saving = false;
            console.log(res)
            // this.$swal(res.message);
            this.$swal({
                title: 'success',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'ok'
            });
            this.getProductCategories();
        })
        .catch(err => {

            this.$swal(err.response.data.message);
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
                    this.notification = res.data
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
    },
    mounted() {        
        this.getProductCategories();
        this.getNotification();
        this.wallet =  window.localStorage.getItem('wallet-balance');
        this.getCart();
    },
}