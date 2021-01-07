import { LOGIN_USER } from "../../../store/action";
import { getToken ,getRole} from '../../../config';

export default {
    name: "WelcomeComponent",
    data() {
        return {
            register: true,
            loading: false,
            loginStatus: null,
            message: null,
            login: false,
            credentials: {
                username: null,
                password: null,
            },
        };
    },


    methods: {
        showLoginin() {
            this.login = true;
        },
        switchToIMS() {
            this.loading = true;
            if (getToken()) {
                this.loading = false;
                if(getRole() == "Retailer"){
                    this.$router.push({ name: 'dashboard' });
                }
                if(getRole() == "Distributor"){
                    this.$router.push({ name: 'distributorDashboard' });
                }
            } else {
                const payload = {
                    'user_id': this.credentials.username
                };
                this.$store.dispatch(LOGIN_USER, payload).then(
                    (data) => {
                        this.message = data.message;
                        this.login = false;
                        this.loading = false;
                        if(data.data.user.role[0].name == "Retailer"){
                            this.$router.push({ name: 'dashboard' });
                        }
                        if(data.data.user.role[0].name == "Distributor"){
                            this.$router.push({ name: 'distributorDashboard' });
                        }
                    }
                ).catch((error) => {
                    this.loading = false
                    this.$swal(error.response.data.message);
                })
            }
        }
    },
};