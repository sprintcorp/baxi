import { getName,getToken,logout} from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DistributorDashboardComponent",
    data(){
        return{
            name: '',
            categories:[],
        }
    },
    methods:{
        goToLink(link){
            this.$router.push({ name: link });
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
                })
                .catch(err => console.log(err));
        },
    },
    mounted(){
        this.name = getName();
        this.getProductCategories();
    }
}