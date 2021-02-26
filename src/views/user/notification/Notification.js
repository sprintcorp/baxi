import { logout, getToken } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue";

export default {
    name: "NotificationComponent",
    components: {
        Loading
    },
    data(){
        return{
            loading:false,
            notification:[]
            
        }
    },
    methods:{
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
                    this.notification = res.data;
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
    },
    mounted(){
        this.getNotification()
    }

}