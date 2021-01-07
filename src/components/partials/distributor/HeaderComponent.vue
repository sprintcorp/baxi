<template>
    <div>
        <div class="top-bar style2">
            <div class="logo">
                <a href="#" title=""><i class="fa fa-shopping-bag"></i> Inventory Management System</a>
            </div>

            <!-- <form class="search-form">
                <input type="text" v-model="search" placeholder="Search Here..." />
                <button type="submit" @keypress="search()"><i class="fa fa-search"></i></button>
            </form> -->

            <ul class="dis-none">
                <li><a title=""><i class="fa fa-plus"></i>New Tasks</a></li>
                <li><a title=""><i class="fa fa-cloud-upload"></i>Upload Files</a></li>
            </ul>
            <div class="quick-links">
                <ul>
                    <li><router-link title="" :to="{name:'retailerProfile'}" class="yellow-skin"><i class="fa fa-user"></i></router-link></li>
                    <li><a title="" id="toolFullScreen" class="black-skin" @click="logout()"><i class="fa fa-sign-out"></i></a></li>
                </ul>
            </div>
        </div>

        <header class="horizontal-menu">
            <span class="open-hide-menu"><i class="fa fa-bars"></i></span>
            <nav class="navbar">
                <ul>
                    <li class="menu-item-has-children">
                        <router-link :to="{name:'distributorDashboard'}" title=""><i class="fa fa-home"></i> <span>Dashboard</span></router-link>
                    </li>
                    
                    <li>
                        <router-link :to="{name:'distributorProductCategory'}" title=""><i class="fa fa-cube"></i> <span>Category</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'distributorOrder'}" title=""><i class="fa fa-list"></i> <span>Retailer Orders</span></router-link>
                    </li>

                    <li>
                        <router-link :to="{name:'distributorTransaction'}" title=""><i class="fa fa-money"></i> <span>Transactions</span></router-link>
                    </li>

                    <!--<li class="menu-item-has-children">
                        <router-link :to="{name:'transactionOverview',params:outlet}" title=""><i class="fa fa-credit-card"></i> <span>Customer Transactions</span></router-link>
                    </li>
                    
                    <li class="menu-item-has-children">
                        <router-link :to="{name:'outletOrder',params:outlet}"><i class="fa fa-list"></i> <span>Customer Order</span></router-link>
                    </li> -->

                    <!-- <li class="menu-item-has-children" >
                        <a title=""><i class="fa fa-users"></i> <span>My Customers</span></a>
                    </li> -->

                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
import {logout,getOutlet} from '../../../config';
    // import MainMenuComponent from "./MainMenuComponent";

    export default {
        name: "HeaderComponent",
        // components: {MainMenuComponent},
        data(){
            return{
                route:'',
                outlet:'',
                show:false
            }
        },
       
        methods: {
            logout() {
                logout();
                this.$router.push({ name: 'welcome' });
            }
        },
         mounted(){
            
            this.outlet = getOutlet();
            
        },
        
    }
</script>

<style scoped>

</style>
