import {BASE_URL} from '../../../env';
import { getToken, logout,getId,checkUserPermission,getRole } from '../../../config'
import Loading from "../../../components/Loader.vue"
export default {
    components:{
        Loading
    },
    data() {
        return {
            vendor_products:[],
            loading:false,
            outlet:'',
            retailer_product:{
                qty: '',
                restock_level: '',
                product_id:'',
                pack_qty:''
            },
            create_product:'',
            saving:false,
            url:''
        }
    },
    methods:{
        editRetailerProduct(product){
            this.retailer_product = product;
        },
        updateProductQuantity(){
            if(getRole().toLowerCase() == 'distributor'){
                
                this.url = '/my/distributor/product/'+this.retailer_product.product_id
            }else{
                this.url = '/my/outlet/' + window.localStorage.getItem("retailer_outlet") + '/product'
            }
          this.saving = true;
          this.retailer_product.pack_qty = this.retailer_product.qty;
            fetch(BASE_URL + this.url, {
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
                this.getRestock();
                this.saving = false;
                this.$swal({
                    title: 'success',
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                });
                
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
        getRestockLevel(){
            this.vendor_products = [];
            if(checkUserPermission('order products') == true){
                this.outlet = window.localStorage.getItem("retailer_outlet") 
            }else{
                this.outlet = window.localStorage.getItem("cashier_outlet") 
            }
            this.loading = true
            fetch(BASE_URL + '/my/outlet/' +
            this.outlet+ '/products/restock-level', {
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
                    res.data.forEach((data) => {
                        this.vendor_products.push({
                            product_id: data.outlet_product.product.id,
                            business_id: parseInt(window.localStorage.getItem("business_id")),
                            name: data.outlet_product.product.name,
                            restock_level: data.outlet_product.restock_level,
                            size: data.outlet_product.product.size,
                            sku: data.outlet_product.product.sku,
                            image:data.outlet_product.product.public_image_url?data.outlet_product.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                            qty: data.outlet_product.qty,
                            quantity: data.outlet_product.qty,
                            retailer_id: getId(),
                        });
                    });
                    console.log(this.vendor_products);
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        getDistributorRestockLevel(){
            this.vendor_products = [];
            this.loading = true
            fetch(BASE_URL + '/my/distributor/business/'+window.localStorage.getItem("cashier_business") +'/products/restock-level', {
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
                    res.data.forEach((data) => {
                        this.vendor_products.push({
                            product_id: data.business_product.id,
                            business_id: data.business_product.business_id,
                            name: data.business_product.product.name,
                            restock_level: data.business_product.restock_level,
                            size: data.business_product.product.size,
                            sku: data.business_product.product.sku,
                            image:data.business_product.product.public_image_url?data.business_product.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                            qty: data.business_product.qty,
                            quantity: data.business_product.qty,
                            // retailer_id: getId(),
                        });
                    });
                    console.log(this.vendor_products);
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getRestock(){
            if(getRole().toLowerCase() == 'distributor'){
                this.getDistributorRestockLevel()
            }else{
                this.getRestockLevel()
            }
        }
    },
    mounted() {
        this.getRestock()
        this.create_product = checkUserPermission('create products');
    },
}