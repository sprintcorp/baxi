import { getName, logout, getToken } from '../../../config'
import { BASE_URL } from '../../../env';
export default{
    data(){
        return{
            name:'',
            user:''
        }
    },
    methods:{
        getProducts() {
            fetch(BASE_URL + '/user/detail', {
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
                    
                    this.user = res.data;
                    
                    console.log(this.local_product);
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
    },
    mounted(){
        this.name = getName();
        this.getProducts()
    }
}