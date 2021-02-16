import { BASE_URL } from '../../../env'
import { getToken, logout } from '../../../config'
import SearchComponent from "../../../components/Serach.vue"
export default {
    name:"OrderCategoryComponent",
    components:{
        SearchComponent
    },
    data(){
        return{
            categories:[],
            loading:false,
            search:'',
            notification:''
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
        getNotification(){
            this.loading = true
            fetch(BASE_URL + '/my/notifications', {
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
                    this.notification = res.data.data
                    this.loading = false;
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.getProductCategories();
        this.getNotification();
    },
}