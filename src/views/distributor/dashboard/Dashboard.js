import { getName} from '../../../config'
// import { BASE_URL } from '../../../env'
export default {
    name: "DistributorDashboardComponent",
    data(){
        return{
            name: '',
        }
    },
    methods:{
        goToLink(link){
            this.$router.push({ name: link });
        }
    },
    mounted(){
        this.name = getName();
    }
}