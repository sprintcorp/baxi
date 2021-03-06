import { BASE_URL } from '../../../env'
import { getToken, logout } from '../../../config'
import Loading from "../../../components/Loader.vue";
export default {
    name:"VendorComponent",
    components: {
        Loading
      },
    data(){
        return{
            vendors:[],
            loading:false,
            states:[],
            lga:[],
            selected_state:'Select State',
            selected_lga:'Select LGA',
            notification:''
        }
    },
    methods:{
        getVendors() {
            this.local_product = [];
            this.loading = true
            fetch(BASE_URL + '/my/category/' + this.$route.params.id + '/businesses', {
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
                    this.vendors = res.data
                    this.loading = false;
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        },
        getState(){
            fetch(BASE_URL + '/states', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                this.states = res.data
                console.log(res.data);
            })
            .catch(err => console.log(err));
        },
        getLGA(){
            fetch(BASE_URL + '/states?search='+this.selected_state, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(res => res.json())
            .then(res => {
                this.lga = res.data[0].lgas
                console.log(res.data);
                // this. getLGAVendor();
            })
            .catch(err => console.log(err));
        },
        getLGAVendor(){
            this.loading = true
            this.local_product = [];
            // this.loading = true
            fetch(BASE_URL + '/my/category/' + this.$route.params.id + '/businesses?state_id='+this.lga[0].id+'&lga_id='+this.selected_lga, {
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
                    this.vendors = res.data
                    this.loading = false;
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        },
        getNotification(){
            this.loading = true
            fetch(BASE_URL + '/user/notifications', {
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
        this.getState();
        this.getVendors();
        this.getNotification();
        window.localStorage.setItem('vendor_category_id', this.$route.params.id);
        
    },
}