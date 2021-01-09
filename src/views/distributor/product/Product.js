import { BASE_URL } from '../../../env'
import { getToken, logout ,getId} from '../../../config'
export default {
    name:"ProductComponent",
    data(){
        return{
            local_product: [],
            loading: false,
            message: '',
        }
    },
    methods:{
        getBusinessProducts() {
            
            this.local_product = [];
            this.loading = true
            fetch(BASE_URL + '/my/products?category_id='+this.$route.params.id , {
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
                    res.data.data.forEach((data) => {
                        this.local_product.push({
                            product_id: data.id,
                            name: data.name,
                            amount: parseInt(data.recommended_price),
                            quantity: data.stock_quantity,
                            size: data.size,
                            qty: 1,
                            distributor_id: getId(),
                        });
                    });
                    console.log(this.local_product);
                    this.loading = false;
                    this.message = 'There are no product for this business at the moment'

                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.getBusinessProducts();
    },
}