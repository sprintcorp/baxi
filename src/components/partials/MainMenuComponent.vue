<template>
    <div>
        <header class="horizontal-menu">
            <span class="open-hide-menu"><i class="fa fa-bars"></i></span>
            <nav>
                <ul>
                    <li class="menu-item-has-children">
                        <router-link :to="{name:'dashboard'}" title=""><i class="fa fa-home"></i> <span>My Businesses</span></router-link>
                    </li>

                    <li  v-if="((route != 'dashboard') && (route != 'business'))">
                        <router-link :to="{name:'productOverview',params:outlet}" title=""><i class="fa fa-shopping-bag"></i> <span>My Products</span></router-link>
                    </li>

                    <li class="menu-item-has-children" v-if="((route != 'dashboard') && (route != 'business'))">
                        <router-link :to="{name:'transactionOverview',params:outlet}" title=""><i class="fa fa-credit-card"></i> <span>My Transactions</span></router-link>
                    </li>
                    
                    <li class="menu-item-has-children" v-if="((route != 'dashboard') && (route != 'business'))">
                        <a title=""><i class="fa fa-file"></i> <span>My Reports</span></a>
                    </li>

                    <li class="menu-item-has-children"  v-if="((route != 'dashboard') && (route != 'business'))">
                        <a title=""><i class="fa fa-users"></i> <span>My Customers</span></a>
                    </li>

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
        }
    }
</script>

<style scoped>

</style>
