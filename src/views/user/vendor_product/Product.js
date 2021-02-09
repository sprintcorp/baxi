import { BASE_URL } from '../../../env'
import { getToken, logout,getId,checkUserPermission } from '../../../config'
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
            search:''
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
            products.business_id = parseInt(window.localStorage.getItem("retailer_business"))
            products.outlet_id = parseInt(window.localStorage.getItem("retailer_outlet"))
            products.amount = value * products.price
            if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
                this.cart = JSON.parse(window.localStorage.getItem("retailer_order"))
            }
            // product.qty = value;
            this.pushToArray(this.cart, products);
            window.localStorage.setItem("retailer_order", JSON.stringify(this.cart));
            this.show_cart = true;
            this.quantity_value = 0;
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
        const payload = {
            "orders": JSON.parse(window.localStorage.getItem("retailer_order")),
            "delivery":{"type": this.type, "date": this.date}
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
                this.$swal(res.message);
                this.getVendorProducts();
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

        getVendorProducts() {
            this.vendor_products = [];
            this.loading = true
            fetch(BASE_URL + '/my/products?category_id=' +
            window.localStorage.getItem("vendor_category_id") + '&business_id=' +
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
                    res.data.data.forEach((data) => {
                        this.vendor_products.push({
                            product_id: data.id,
                            business_id: parseInt(window.localStorage.getItem("business_id")),
                            name: data.name,
                            price: parseInt(data.business_product.pack_price),
                            quantity: data.business_product.qty,
                            size: data.size,
                            image:data.public_image_url,
                            qty: data.business_product.qty,
                            retailer_id: getId(),
                        });
                    });
                    console.log(this.local_product);
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
    },
    mounted() {
        this.getVendorProducts();
        this.order_products = checkUserPermission('order products')
        this.getCart();
    },
}