<template>
    <div>
        <div class="top-bar style2">
            <div class="logo">
                <a href="#" title=""><i class="fa fa-shopping-bag"></i> Inventory Management System</a>
            </div>

            <form class="search-form">
                <input type="text" placeholder="Search Here..." />
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>

            <ul class="dis-none">
                <li><a title=""><i class="fa fa-plus"></i>New Tasks</a></li>
                <li><a title=""><i class="fa fa-cloud-upload"></i>Upload Files</a></li>
            </ul>
            <div class="quick-links">
                <ul>
                    <li><a title="" class="yellow-skin"><i class="fa fa-user"></i></a></li>
                    <li><a title="" id="toolFullScreen" class="black-skin" @click="logout()"><i class="fa fa-sign-out"></i></a></li>
                </ul>
            </div>
        </div>

        <MainMenuComponent></MainMenuComponent>
    </div>
</template>

<script>
import {logout} from '../../config';
    import MainMenuComponent from "./MainMenuComponent";

    export default {
        name: "HeaderComponent",
        components: {MainMenuComponent},
        methods: {
            logout() {
                logout();
                this.$router.push({ name: 'welcome' });
            }
        }
    }
</script>

<style scoped>

</style>
