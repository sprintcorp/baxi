import { LOGIN_USER } from "../../../store/action";
import { savePermission } from '../../../config';

export default {
    name: "WelcomeComponent",
    data() {
        return {
            register: true,
            loading: false,
            loginStatus: null,
            message: null,
            login: false,
            permission:[],
            credentials: {
                username: '',
                password: '',
            },
        };
    },


    methods: {
        showLoginin() {
            this.login = true;
        },
        switchToIMS() {
            this.loading = true;
            // if (getToken()) {
            //     this.loading = false;
            //     // if (getRole() == "Retailer") {
            //         this.$router.push({ name: 'dashboard' });
            //     // }
            //     // if (getRole() == "Distributor") {
            //     //     this.$router.push({ name: 'distributorDashboard' });
            //     // }
            // } else {
                const payload = {
                    'user_id': this.credentials.username,
                    'password': this.credentials.password
                };
                this.$store.dispatch(LOGIN_USER, payload).then(
                    (data) => {
                        const permissions = data.data.user.roles[0].permissions;
                        console.log(permissions)
                        permissions.forEach((data) => {
                            this.permission.push({
                                action: data.name,
                            });
                        });
                        console.log(data.data.user.roles[0].name)
                        savePermission(this.permission,data.data.user.roles[0].name);
                        this.message = data.message;
                        this.login = false;
                        this.loading = false;
                        // if (data.data.user.roles[0].name == "Retailer") {
                            this.$router.push({ name: 'dashboard' });
                        // }
                        // if (data.data.user.roles[0].name == "Distributor") {
                        //     this.$router.push({ name: 'distributorDashboard' });
                        // }
                    }
                ).catch((error) => {
                    this.loading = false
                    this.$swal(error.response.data.message);
                })
            // }
        }
    },
}