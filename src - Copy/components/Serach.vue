<template>
    <div>
        <div class="row">
        <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
            <input type="text" v-model="search" @change="search()" placeholder="Search Products" style="background-color:white;width:90% !important;border-radius:20px"/>
               <button type="submit"><i class="fa fa-search"></i></button>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    name:'SearchComponent',
    props:['search'],
    data(){
        return{

        }
    },
    methods:{
        // search(){
        //     alert(search)
        // }
    }
}
</script>