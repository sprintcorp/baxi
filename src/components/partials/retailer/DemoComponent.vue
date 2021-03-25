<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="height:70px;background-color:#facc48 !important;box-shadow: 0 0.5px 10px 0 #999;">
            <a class="navbar-brand" href="#">
                <img src="/images/baxi.png" alt="" width="50" height="45">
            </a>
            <div class="vl"></div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" style="z-index:10;" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mt-3">
                <li :class="[this.$router.currentRoute.name === 'dashboard' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'dashboard'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-home"></i> Dashboard</router-link>
                </li>
                <li :class="[this.$router.currentRoute.name === 'productOverview' || this.$router.currentRoute.name === 'restockLevel' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'productOverview'}"  class="nav-link font-weight-bold" href="#"><i class="fa fa-cube"></i> Product</router-link>
                </li>
                <li v-if="order_products && !distributor" :class="[this.$router.currentRoute.name === 'walletHistory' || this.$router.currentRoute.name === 'categoryOrder' || this.$router.currentRoute.name === 'productOrderOverview' || this.$router.currentRoute.name == 'categoryVendor' || this.$router.currentRoute.name == 'orderInformation' || this.$router.currentRoute.name == 'vendorProduct'  ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'categoryOrder'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-calendar"></i> Order </router-link>
                </li>

                <li :class="[this.$router.currentRoute.name === 'transactionOverview' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'transactionOverview'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-credit-card"></i>  Transaction</router-link>
                </li>
                <li v-if="order_products && !distributor" :class="[this.$router.currentRoute.name === 'outletOverview' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'outletOverview',params:{ id:outlet}}" class="nav-link font-weight-bold" href="#"><i class="fa fa-building"></i> Outlet</router-link>
                </li>
                <li v-if="distributor" :class="[this.$router.currentRoute.name === 'distributorOrders' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'distributorOrders'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-calendar"></i> Order</router-link>
                </li>
                <li v-if="order_products && distributor" :class="[this.$router.currentRoute.name === 'walletHistory' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'walletHistory'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-wallet"></i> Wallet History</router-link>
                </li>

                </ul>
                <!-- <form  class="form-inline search-form my-2 my-lg-0" v-if="(this.$router.currentRoute.name != 'categoryOrder')">
                    <input type="text" placeholder="Search Products" style="background-color:white;width:255%;border-radius:20px"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form> -->

                <div style="margin-right: 20px;">
                    <div v-if="!distributor && order_products" class="pull-right mt-2">
                        <h6 style="font-size:16px;text-align: right"><i class="fa fa-building"></i> <strong>{{name}}</strong></h6>
                        <!-- <h5 style="font-size:18px;">{{name}}</h5> -->
                    </div>

                    <div class="pull-right mr-4 mt-1 text-right">
                        <p class="m-0" style="line-height:25px;font-size:17px;color: #0e5a14;">
                            <i class="fa fa-wallet"></i> Available:
                            ₦ <strong>{{numberWithCommas(wallet)}}</strong>

                            <button @click="getBalance" v-if="!reload">
                                <i class="fa fa-spinner"></i>
                            </button>

                            <button v-if="reload">
                                <i class="fa fa-spinner fa-pulse fa-fw"></i>
                                <span class="sr-only">Loading...</span>
                            </button>
                        </p>

                        <p style="line-height:22px;font-size:14px;color:rgba(117, 59, 18, 0.93);margin-right:35px;">
<!--                            <i class="fa fa-money-bill"></i> -->
                            Ledger:
                            <strong>₦ {{numberWithCommas(ledger)}}</strong>
                        </p>
                    </div>
                </div>


<!--                <div style="height:20%"><i class="fa fa-building"></i> Outlet : <b>{{name}}</b> <br><i class="fa fa-wallet"></i> Wallet : <b>₦ {{numberWithCommas(wallet)}}</b> | <i class="fa fa-money-bill"></i> Ledger : <b>₦ {{numberWithCommas(ledger)}}</b><button @click="getBalance()" v-if="!reload"><img src="https://img.icons8.com/material/24/000000/synchronize&#45;&#45;v1.png"/></button>-->
<!--                   -->
<!--                    <div v-if="reload" class="spinner-border spinner-border-sm" role="status">-->
<!--                        <span class="sr-only">Loading...</span>-->
<!--                    </div>-->
<!--                </div>-->


                <!-- <div style="height:20%" v-if="!distributor && !order_products"><i class="fa fa-building"></i> Outlet : <b>{{name}}</b>
                   
                </div> -->
                

                <!-- <button class="mr-2" v-if="order_products" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart fs-25" style="color:#ffc107"></i></button> -->
                <div class="" v-if="!distributor">
                    <div class="icon-badge-container top-head-dropdown" data-toggle="dropdown" title="Notification" aria-haspopup="true" aria-expanded="false">
                      <i class="far fa-bell icon-badge-icon" style="color:rgb(90 90 90)"></i>
                        <div class="icon-badge" style="width:7px;height:7px"></div> 
                        <ul class="dropdown-menu dropdown-menu-right" style="width:350px;border:0px;background-color:white">
                            <li style="margin-bottom:30px;" v-for="(notifications,index) in notification" :key="index">
                                <router-link :to="{name:'orderInformation',params: { id: notifications.data.order_id }}" href="#" class="top-text-block" style="">
                                    <div class="top-text-heading notification-style fs-12" style="color:black;line-height:14px"> {{notifications.data.title}}</div>
                                    <!-- <div class="top-text-light">15 minutes ago</div> -->
                                </router-link> 
                            </li>
                            <li style="text-align:center" v-if="notification.length > 4"><router-link :to="{name:'notification'}"><button class="btn notification-button">View all notification</button></router-link></li>
                            
                        
                        <li>
                            <div class="loader-topbar"></div>
                        </li>
                        </ul>             
                    </div>

                </div>
                
                <div class="" v-if="distributor">
                    <div class="icon-badge-container top-head-dropdown" data-toggle="dropdown" title="Notification" aria-haspopup="true" aria-expanded="false">
                      <i class="far fa-bell icon-badge-icon" style="color:black"></i>
                        <div class="icon-badge" style="width:7px;height:7px"></div> 
                        <ul class="dropdown-menu dropdown-menu-right" style="width:330px;border:0px;background-color:white;align:justify">
                            <div class="">
                                <li style="margin-bottom:25px;margin-left:15px" v-for="(notifications,index) in notification" :key="index">
                                
                                        <div class="top-text-heading notification-style fs-12" style="color:black;line-height:15px"> {{notifications.data.title}}</div>
                                        
                                </li>
                            </div>
                            
                            
                        
                        <li>
                            <div class="loader-topbar"></div>
                        </li>
                        </ul>             
                    </div>

                </div>
                <!-- <div class="mr-3 ml-3">
                    <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                </div> -->
                
                <div class="mr-0 ml-3 mb-1">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <img :src="image" class="rounded-circle border" alt="" width="35" height="35"></a>
                    <ul class="dropdown-menu" style="">
                    <li><a title="" @click="logout()"><i class="fa fa-sign-out"></i> Logout</a></li>
                    <li></li>
                    </ul>
                </li>
                </div>
            </div>
        </nav>
        <div class="clearfix"></div>

    </div>
</template>

<script>
import {logout,getOutlet,checkUserPermission,getToken,getRole} from '../../../config';
import {BASE_URL} from '../../../env'
    // import MainMenuComponent from "./MainMenuComponent";
    
    export default {
        name: "HeaderComponent",
        // components: {MainMenuComponent},
        data(){
            return{
                route:'',
                outlet:'',
                name:'',
                show:false,
                cart_order:[],
                total:'',
                order_products:'',
                distributor:false,
                image:'',
                notification:'',
                wallet:'',
                ledger:'',
                reload:false,
            }
        },
         computed:{
            getCartItem(){
                // return "hello"
               return JSON.parse(window.localStorage.getItem("retailer_order"));
            }
        },
       
        methods: {
            numberWithCommas(x) {
            const num = parseFloat(x)
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
            logout() {
                logout();
                    this.$router.push({ name: 'welcome' });              
            },
            sumProduct() {
                if (JSON.parse(window.localStorage.getItem("retailer_order")) && JSON.parse(window.localStorage.getItem("retailer_order")).length) {
                    this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"))
                    let sum = this.cart_order.map(o => parseFloat(o.amount)).reduce((a, c) => { return a + c });
                    this.total = sum;
                }
            },
            getCart(){
                if (JSON.parse(window.localStorage.getItem("retailer_order"))) {
                    this.cart_order = JSON.parse(window.localStorage.getItem("retailer_order"));
                    this.sumProduct()
                }
            },
            removeFromCart(cart_order,index){
                const filteredItems = cart_order.slice(0, index).concat(cart_order.slice(index + 1, cart_order.length))
                window.localStorage.setItem("retailer_order", JSON.stringify(filteredItems));
                
                this.sumProduct();
                this.getCart();
                console.log(filteredItems)
            },
            getBalance() {
            this.reload = true;
            fetch(BASE_URL + '/user/wallet-balance', {
                        headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': getToken()
                        }
                    })
                .then(res => res.json())
                .then(res => {
                    window.localStorage.setItem("wallet-balance",res.data.available_balance)
                    window.localStorage.setItem("ledger-balance",res.data.ledger_balance)
                    this.wallet =  window.localStorage.getItem('wallet-balance');
                    this.ledger =  window.localStorage.getItem('ledger-balance');
                    this.name = JSON.parse(window.localStorage.getItem('outlet_name'))
                    this.reload = false;
                })
                .catch(err => {
                    console.log(err)
                    this.reload = false;
                });
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
                    this.notification = res.data.slice(0,5)
                    this.loading = false;
                })
                .catch(err => console.log(err));
        },
        
        },
         mounted(){
             this.getBalance();
             console.log(this.$router.currentRoute.name)
             this.getNotification();
            this.order_products = checkUserPermission('order products')
            this.image =  window.localStorage.getItem('image');
            this.wallet =  window.localStorage.getItem('wallet-balance');
            this.ledger =  window.localStorage.getItem('ledger-balance');
            if(getRole().toLowerCase() == 'distributor'){
                // alert('hhhh')
                this.distributor = true
            }else{
                this.name = JSON.parse(window.localStorage.getItem('outlet_name'))
            }

            
            
            this.outlet = getOutlet();
            
            
        },
        
    }
</script>

<style scoped>
    .active{
        padding-bottom:30px !important;
        border-bottom: 4px solid rgb(255, 193, 7);
        /* background-color: white; */
        
    }
    a{
        font-family: 'Rubik', Times, serif;
        font-size: 14px;
    }
    li{
        margin-right: 20px;
        height: 30px;
        list-style: none;
        font-family: 'Rubik', Times, serif;
        font-size: 20px;
    }
    .icon-badge-group .icon-badge-container {
  display: inline-block;
  margin-left: 15px;
}

.icon-badge-group .icon-badge-container:first-child {
  margin-left: 0
}

.icon-badge-container {
  margin-top: 10px;
  position: relative;
}

.icon-badge-icon {
  font-size: 25px;
  position: relative;
}

.icon-badge {
  background-color: red;
  font-size: 12px;
  color: white;
  text-align: center;
  width: 15px;
  height: 15px;
  border-radius: 35%;
  position: relative;
  top: -35px;
  left: 17px;
}
.vl {
  border-left: 2px solid #ccc;
  height: 60px;
  left: 50%;
  margin-left: 10px;
  margin-right: 10px;
  top: -70px;
}

.top-text-block{
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  color: #333;
  white-space: inherit !important;
  /* border-bottom:1px solid #f4f4f4; */
  position:relative;
}

.notification-style{
    background:rgb(228 228 225);
    color:white;
    font-weight:bold;
    width:300px;
    height: 40px;
    margin-bottom:-15px;
    padding:5px
    
}
.notification-style:hover{
       background:#bdbbb8;
    }
.notification-button{
    margin-left:10px;
    width:300px;
    background-color: #bdbbb8;
    color:white;
    border: 0px;
}
.notification-button:hover{
    background-color:rgb(255, 193, 7);;
    color:white;
    border: 0px;
}

.navbar-nav {
    margin-top: 0 !important;
}

/* .top-text-block:hover{
    content: '';
        width: 4px;
        background: #f05a1a;
        left: 0;
        top: 0;
        bottom: 0;
        position: absolute;
}

.top-text-light{
    /* // color:#ccc; */
    /* color: #999;
    font-size: 0.8em; */
/* }  */

</style>
