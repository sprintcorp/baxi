// import { mapGetters } from "vuex";
// import { GET_BUSINESS } from "../../../store/action";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env'
export default {
    name: "DashboardComponent",
    data() {
        return {
            user: null,
            businesses: [],
            name: '',
            loading: false,
        }
    },
    methods: {
        // getUserBusiness() {
        //     this.$store.dispatch(GET_BUSINESS).then(
        //         (data) => {
        //             this.businesses = data.data.my_own_businesses
        //         }
        //     ).catch((error) => {
        //         console.log(error.response)
        //         if (error.response.status == 401) {
        //             // logout();
        //             // this.$router.push({ name: 'welcome' });
        //         }
        //     });
        // },
        getUserBusiness() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses', {
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
                    this.loading = false;
                    this.businesses = res.data.my_own_businesses;
                })
                .catch((err) => {
                        console.log("error log " +
                            err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal("Session Expired");
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }

                );
        }

    },

    mounted() {
        this.getUserBusiness();
        this.name = getName();
        console.log(this.$router.currentRoute.name);
    },



    computed: {
        // ...mapGetters(['businesses']),
        // fullname: function() {
        //     return `${this.user.info.first_name} ${this.user.info.last_name}`;
        // }
    }
}