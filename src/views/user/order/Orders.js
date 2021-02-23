import { logout, getToken } from '../../../config'
import { BASE_URL } from '../../../env'
import Loading from "../../../components/Loader.vue"
export default {
    name: "OrderComponent",
    components:{
        Loading
    },
    data() {
        return {
            order: [],
            order_product: [],
            name: '',
            loading: true,
            total:'',
            delivery:0,
            status:'w-0',
            progress:'progress-bar progress-bar-striped progress-bar-animated',
            color:'bg-warning',
            hide:false,
            saving:false,
            order_groups:[],
            product_id:[],
            stats:'Select Order By Status',
            days:["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"],
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        }
    },
    computed: {
        
    },
    methods: {
        numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        showDate() {
            console.log(this.start_date.toString());
        },
        sumArray(objArr){
            console.log(objArr.length)

            let counts = objArr.reduce((prev, curr) => {
                let count = prev.get(curr.id) || 0;
                prev.set(curr.id + count);
                return prev;
              }, new Map());
              
              // then, map your counts object back to an array
              let reducedObjArr = [...counts].map(([id]) => {
                return {id}
              })

              const id = reducedObjArr.map(function(obj){
                return obj.id
            })
            return id
        },
        getDate(date){
            const res = new Date(date);
            return res.getDate() +' '+this.days[res.getDay()] +' '+this.months[res.getMonth()]+' '+ res.getFullYear();
        },
        confirmDelivery(action){
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.orderAction(action)
                }
              })
              console.log(action)
        },
        orderAction(action){
            
            this.saving = true;
            // alert(this.saving)
            // this.saving = true;
            const payload = {
                "status":action,
                "order_group_ids":this.order_groups[0].selected_product_ids,
            }
            console.log(payload)

            fetch(BASE_URL + '/my/distributor/orders/status', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': getToken()
                }
            })
            .then(res => res.json())
            .then(res => {
                window.localStorage.setItem("wallet-balance",res.data.wallet_balance);
                this.getRetailerOrders();
                // this.orderInformation();
                // this.order_tab = true;
                if(action == 1){
                    window.reload();
                }
                this.saving = false;
                console.log(res)
                this.$swal({
                    title: 'Success',
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                });               
                
            })
            .catch(err => {
                this.saving = false;
                console.log(err)
                this.$swal({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                // this.getOrders();
                if (err.response.status == 401) {
                    this.$swal({
                title: 'Error',
                text: "Session Expired",
                icon: 'error',
                confirmButtonText: 'ok'
            });
                    logout();
                    this.$router.push({ name: 'welcome' });
                }
            });
        },
        getRetailerOrders() {
            this.loading = true;
            fetch(BASE_URL + '/my/distributor/transactions/'+this.$route.params.id, {
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
                    this.order = res.data;
                    this.order_product = this.order;
                    console.log(this.order);

                    this.order.orders.forEach((data)=>{
                        this.product_id.push({
                            id:data.group_id
                        })
                    })
                    const product = this.sumArray(this.product_id)
                    // console.log(product)
                    this.order_groups.push({
                        id:this.order.order_group_id,
                        selected_product_ids:product
                    })
                    // console.log(this.order_groups);
        
                    let sum = this.order.orders.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    if(this.order.applied_fees){
                        this.delivery = this.order.applied_fees.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    }
                    this.total = sum;
                    console.log(sum);
                    this.loading = false;
                    
                  
                    
                })
                .catch(err => {
                        console.log(err)
                        this.loading = false;
                        if (err.response.status == 401) {
                            this.$swal({
                title: 'Error',
                text: "Session Expired",
                icon: 'error',
                confirmButtonText: 'ok'
            });
                            logout();
                            this.$router.push({ name: 'welcome' });
                        }
                    }
                );
           
        }
    },
    mounted() {
        // this.name = getName();
        this.getRetailerOrders();       
    }
}