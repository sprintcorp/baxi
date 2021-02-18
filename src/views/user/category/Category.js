import { BASE_URL } from '../../../env'
import { getToken, logout } from '../../../config'
import SearchComponent from "../../../components/Serach.vue"
import Dropdown from 'vue-simple-search-dropdown';
export default {
    name:"OrderCategoryComponent",
    components:{
        SearchComponent,
        "vue-select": require("vue-select"),
        Dropdown 
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
        getSystemProducts(){
            fetch(BASE_URL+'/my/products', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
        .then(res => res.json())
        .then(res => {
            if (res.message === 'Unauthenticated.') {
                this.$swal("Session Expired");
                console.log(res);
                logout();
                this.$router.push({ name: 'welcome' });
            }
            console.log(res.data.data);
            this.loading = false;
            this.system_products = res.data.data;
            // this.page = res.data;
            this.system_products.forEach((data) => {
                this.list_products.push({
                    id: data.id,
                    name: data.name,
                });
            });
            console.log(this.list_products);
        })
        .catch(err => {
                console.log(err)
                this.loading = false;
                if (err.response.status == 401) {
                    this.$swal("Session Expired");
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
            }

        ); 
    },
    myChangeEvent(val){
        console.log(val.id);
        if(val.id){
        this.show_business = true;
        console.log(val);
        this.loading = true;

            fetch(BASE_URL + '/my/product/'+val.id+'/businesses', {
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
                    this.businesses = res.data;
                    console.log(this.businesses)
                    this.loading = false;
                })
                .catch(err => console.log(err));
        }
    
    
   
    },
        getNotification(){
            this.loading = true
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
                    this.notification = res.data.data
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
        }
    },
    mounted() {
        
        this.getProductCategories();
        this.getNotification();
        this.getSystemProducts();
    },
}