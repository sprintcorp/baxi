<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="height:70px;border-bottom:2px solid #ccc;background-color:white !important">
            <a class="navbar-brand" href="#">
                <img src="/images/baxi.png" alt="" width="50" height="45">
            </a>
            <div class="vl"></div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse bg-white" style="z-index:10" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mt-3">
                <li :class="[this.$router.currentRoute.name == 'dashboard' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'dashboard'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-home"></i> Dashboard</router-link>
                </li>
                <li :class="[this.$router.currentRoute.name == 'productOverview' || this.$router.currentRoute.name == 'restockLevel' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'productOverview'}"  class="nav-link font-weight-bold" href="#"><i class="fa fa-cube"></i> Product</router-link>
                </li>
                <li v-if="order_products" :class="[this.$router.currentRoute.name == 'categoryOrder' || this.$router.currentRoute.name == 'productOrderOverview' || this.$router.currentRoute.name == 'categoryVendor' || this.$router.currentRoute.name == 'vendorProduct'  ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'categoryOrder'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-calendar"></i> Order </router-link>
                </li>

                <li :class="[this.$router.currentRoute.name == 'transactionOverview' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'transactionOverview'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-credit-card"></i>  Transaction</router-link>
                </li>
                <li v-if="order_products" :class="[this.$router.currentRoute.name == 'outletOverview' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'outletOverview',params:{ id:outlet}}" class="nav-link font-weight-bold" href="#"><i class="fa fa-building"></i> Outlet</router-link>
                </li>
                <li v-if="distributor" :class="[this.$router.currentRoute.name == 'distributorOrders' ? 'nav-item active' : 'nav-item']">
                    <router-link :to="{name:'distributorOrders'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-calendar"></i> Order</router-link>
                </li>

                </ul>
                <form  class="form-inline search-form my-2 my-lg-0" v-if="(this.$router.currentRoute.name != 'categoryOrder')">
                    <input type="text" placeholder="Search Products" style="background-color:white;width:255%;border-radius:20px"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <div class="vl"></div>
                <button class="mr-2" v-if="order_products" data-toggle="modal" data-target="#cartModal"><i class="fa fa-shopping-cart fs-25" style="color:#ffc107"></i></button>
                <div class="">
                    <div class="icon-badge-container">
                        <i class="far fa-bell icon-badge-icon" style="color:#ffc107"></i>
                        <div class="icon-badge">6</div>
                    </div>
                </div>
                <!-- <div class="mr-3 ml-3">
                    <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                </div> -->
                <div class="mr-4 ml-3 mb-3">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45"></a>
                    <ul class="dropdown-menu" style="">
                    <li><a title="" @click="logout()"><i class="fa fa-sign-out"></i> Logout</a></li>
                    <li></li>
                    </ul>
                </li>
                </div>
            </div>
        </nav>

        <!-- Cart -->
            <div class="modal left fade" id="cartModal" tabindex="" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Cart</h5>
                            <button type="button" @click="getCart()" class="btn-close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
                        </div>
                        <div class="modal-body">
                            <div class="row p-3" style="margin-top:-17px;background-color:#d8d4d4">
                                <h5><i class="fa fa-shopping-cart"></i>  {{cart_order.length}} items in cart</h5>   
                            </div>
                            <div class="row" style="margin-top:-15px">
                                <div style="margin-top:-15px" class="col-md-12 d-flex justify-content-center" v-for="(product,index) in cart_order" :key="index">
                                        <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                        <div class="card p-2" style="width: 25rem;height:6.5rem;border-radius:0px">
                                            <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                            <div class="row g-0">
                                            <div class="col-md-2 mt-2"><img :src="product.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                            <div class="col-md-5 mt-4">
                                                <p class="fs-15 font-weight-bold text-black"> {{product.name}}</p>
                                                <p class="fs-10 font-weight-bold text-black" style="margin-top:-15px"> {{product.quantity}} Products</p>
                                            </div>
                                            <div class="col-md-3 mt-4">&#8358; {{ product.amount }}</div>
                                            <div class="col-md-2">
                                                <div class="mt-4">
                                                    <button @click="removeFromCart(cart_order,index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- </router-link> -->
                                </div>
                            </div>
                        </div>
                        <!-- <div class="modal-footer"> -->
                            <div class="row align-items-end p-3">
                                <div class="col-sm-6">
                                    Total : &#8358; {{total}}
                                </div>
                                <div class="col-sm-6 d-flex justify-content-end">
                                    <button type="button" class="btn btn-warning pl-4 pr-4" style="border-radius:15px" @click="saveOrder()">Order</button>
                                </div>
                            </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>

        <!-- End Cart -->
    </div>
</template>

<script>
import {logout,getOutlet,checkUserPermission,getToken} from '../../../config';
import {BASE_URL} from '../../../env'
    // import MainMenuComponent from "./MainMenuComponent";
    
    export default {
        name: "HeaderComponent",
        // components: {MainMenuComponent},
        data(){
            return{
                route:'',
                outlet:'',
                show:false,
                cart_order:[],
                total:'',
                order_products:'',
                distributor:''
            }
        },
         computed:{
            getCartItem(){
                // return "hello"
               return JSON.parse(window.localStorage.getItem("retailer_order"));
            }
        },
       
        methods: {
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
            saveOrder() {
            const payload = {
                "orders": JSON.parse(window.localStorage.getItem("retailer_order"))
            }
            console.log(payload);
            fetch(BASE_URL + '/my/distributor/orders', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': getToken()
                    }
                })
                .then(res => res.json())
                .then(res => {
                    window.localStorage.removeItem("retailer_order");
                    this.saving = false;
                    this.$swal(res.message);
                })
                .catch(err => {

                    this.$swal(err.response.data.message);
                    this.saving = false;
                    console.log(err)
                    if (err.response.status == 401) {
                        this.saving = false;
                        this.$swal("Session Expired");
                        logout();
                        this.$router.push({ name: 'welcome' });
                    }
                });
        },
        },
         mounted(){
            this.order_products = checkUserPermission('order products')
            this.distributor = checkUserPermission('distributor')
            this.getCart();
            this.outlet = getOutlet();
            
        },
        
    }
</script>

<style scoped>
    .active{
        padding-bottom:50px !important;
        border-bottom: 4px solid rgb(255, 193, 7);
        /* background-color: white; */
        
    }
    a{
        font-family: 'Times New Roman', Times, serif;
        font-size: 15px;
    }
    li{
        margin-right: 20px;
        height: 30px;
        list-style: none;
        font-family: 'Times New Roman', Times, serif;
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
  margin-top: 20px;
  position: relative;
}

.icon-badge-icon {
  font-size: 30px;
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
  border-left: 2px solid black;
  height: 60px;
  left: 50%;
  margin-left: 10px;
  margin-right: 10px;
  top: -70px;
}
</style>
