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
                <li class="nav-item active">
                    <router-link :to="{name:'dashboard'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-home"></i> Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name:'productOverview'}"  class="nav-link font-weight-bold" href="#"><i class="fa fa-cube"></i> Product</router-link>
                </li>
                <li class="nav-item ">
                    <router-link :to="{name:'categoryOrder'}" class="nav-link font-weight-bold" href="#"><i class="fa fa-calendar"></i> Order </router-link>
                </li>

                <li class="nav-item ">
                    <a class="nav-link font-weight-bold" href="#"><i class="fa fa-credit-card"></i>  Transaction</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link font-weight-bold" href="#"><i class="fa fa-building"></i> Outlet</a>
                </li>

                </ul>
                <form class="form-inline search-form my-2 my-lg-0" v-if="(this.$router.currentRoute.name != 'categoryOrder')">
                    <input type="text" v-model="search" placeholder="Search Products" style="background-color:white;width:255%;border-radius:20px"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <div class="vl"></div>
                <div class="">
                    <div class="icon-badge-container">
                        <i class="far fa-bell icon-badge-icon" style="color:yellow"></i>
                        <div class="icon-badge">6</div>
                    </div>
                </div>
                <!-- <div class="mr-3 ml-3">
                    <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                </div> -->
                <div class="mr-3 ml-3 mb-3">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45"></a>
                    <ul class="dropdown-menu">
                    <li><a title="" @click="logout()"><i class="fa fa-sign-out"></i> Logout</a></li>
                    </ul>
                </li>
                </div>
            </div>
        </nav>
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
