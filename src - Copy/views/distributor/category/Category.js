import { BASE_URL } from '../../../env'
import { getToken, logout } from '../../../config'
export default {
    name:"CategoryComponent",
    data(){
        return{
            categories:[],
            loading:false,
        }
    },
    methods:{
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
                })
                .catch(err => console.log(err));
        },
    },
    mounted() {
        this.getProductCategories();
    },
}