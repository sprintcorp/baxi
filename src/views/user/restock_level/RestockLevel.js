import {BASE_URL} from '../../../env';
import { getToken, logout,getId,checkUserPermission } from '../../../config'
export default {
    data() {
        return {
            vendor_products:[],
            loading:false,
            outlet:'',
            retailer_product:{
                qty: '',
                restock_level: '',
                product_id:''
            },
            create_product:'',
            saving:false,
        }
    },
    methods:{
        editRetailerProduct(product){
            this.retailer_product = product;
        },
        updateProductQuantity(){
          this.saving = true;
            fetch(BASE_URL + '/my/outlet/' + window.localStorage.getItem("retailer_outlet") + '/product', {
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
                this.getRestockLevel();
                this.saving = false;
                this.$swal(res.message);
                
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
                            product_id: data.product.id,
                            business_id: parseInt(window.localStorage.getItem("business_id")),
                            name: data.product.name,
                            restock_level: data.product.restock_level,
                            size: data.product.size,
                            sku: data.product.sku,
                            image:data.product.public_image_url?data.product.public_image_url:'https://cdn.iconscout.com/icon/premium/png-512-thumb/add-product-5-837103.png',
                            qty: data.outlet_qty,
                            quantity: data.outlet_qty,
                            retailer_id: getId(),
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
    },
    mounted() {
        this.getRestockLevel()
        this.create_product = checkUserPermission('create products');
    },
}