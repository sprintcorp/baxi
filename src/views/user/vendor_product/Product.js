import { BASE_URL } from '../../../env'
import { getToken, logout,getId } from '../../../config'
export default {
    name:"VendorComponent",
    data(){
        return{
            vendor_products:[],
            loading:false,
            product:'',
            quantity_value:0
        }
    },
    methods:{
        addToCart(product){
            this.product = product;
            console.log(product)
            // alert("hello")
        },
        increase(){
            this.quantity_value++
        },
        decrease(){
            if(this.quantity_value > 0)
            this.quantity_value--
        },

        getVendorProducts() {
            this.local_product = [];
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
                            amount: parseInt(data.recommended_price),
                            quantity: data.stock_quantity,
                            size: data.size,
                            image:data.public_image_url,
                            qty: data.stock_quantity,
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
    },
}