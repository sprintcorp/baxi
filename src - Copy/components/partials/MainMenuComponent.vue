<template>
    <div>
        <header class="horizontal-menu">
            <span class="open-hide-menu"><i class="fa fa-bars"></i></span>
            <nav>
                <ul>
                    <li class="menu-item-has-children">
                        <router-link :to="{name:'dashboard'}" title=""><i class="fa fa-home"></i> <span>My Businesses</span></router-link>
                    </li>
                    <li v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <router-link :to="{name:'retailerOrder',params:outlet}" title=""><i class="fa fa-cube"></i> <span>Place Order</span></router-link>
                    </li>
                    <li v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <router-link :to="{name:'retailerOrderOverview',params:outlet}" title=""><i class="fa fa-list"></i> <span>My Orders</span></router-link>
                    </li>

                    <li  v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <router-link :to="{name:'productOverview',params:outlet}" title=""><i class="fa fa-shopping-bag"></i> <span>My Products</span></router-link>
                    </li>

                    <li class="menu-item-has-children" v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <router-link :to="{name:'transactionOverview',params:outlet}" title=""><i class="fa fa-credit-card"></i> <span>Customer Transactions</span></router-link>
                    </li>
                    
                    <li class="menu-item-has-children" v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <router-link :to="{name:'outletOrder',params:outlet}"><i class="fa fa-list"></i> <span>Customer Order</span></router-link>
                    </li>

                    <!-- <li class="menu-item-has-children"  v-if="((this.$router.currentRoute.name != 'dashboard') && (this.$router.currentRoute.name != 'business'))">
                        <a title=""><i class="fa fa-users"></i> <span>My Customers</span></a>
                    </li> -->

                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
import {getOutlet} from '../../config';
    export default {
        name: "MainMenuComponent",
        data(){
            return{
                route:'',
                outlet:''
            }
        },
        mounted(){
            this.route = this.$router.currentRoute.name;
            this.outlet = getOutlet();
            console.log("route name: "+this.$router.currentRoute.name)
            if(this.route == 'dashboard'){
                console.log("yes")
            }else{
                console.log("no")
            }
        }
    }
</script>

<style scoped>

</style>
