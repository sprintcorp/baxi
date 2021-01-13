<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="/images/baxi.png" alt="" width="50" height="45">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#"><i class="fa fa-home"></i> Dashboard <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fa fa-cube"></i> Product</a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#"><i class="fa fa-calendar"></i> Order </a>
                </li>

                <li class="nav-item ">
                    <a class="nav-link" href="#"><i class="fa fa-credit-card"></i>  Transaction</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fa fa-building"></i> Outlet</a>
                </li>

                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
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
        padding-bottom:0px !important;
        border-bottom: 4px solid rgb(255, 193, 7);
    }
    .a{
        font-family: 'Times New Roman', Times, serif;
        font-size: 40px
    }
</style>
