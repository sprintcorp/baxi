// import { mapGetters } from "vuex";
import { getName, getToken, logout } from '../../../config'
import { BASE_URL } from '../../../env'
// import { GET_BUSINESS_OUTLETS } from "../../../store/action";
export default {
    name: "BusinessComponent",
    data() {
        return {
            user: null,
            outlets: [],
            name: '',
            loading: false,
        }
    },
    methods: {
        // getBusinessOutlets() {
        //     this.$store.dispatch(GET_BUSINESS_OUTLETS, this.$route.params.id);
        // },
        getBusinessOutlets() {
            this.loading = true;
            fetch(BASE_URL + '/my/businesses/' + this.$route.params.id + '/outlets ', {
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
                    this.outlets = res.data;
                    console.log(this.outlets);
                })
                .catch((err) => {

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
        this.getBusinessOutlets();
        this.name = getName();
    },



    // computed: {
    //     ...mapGetters(['outlets'])
    // }
}