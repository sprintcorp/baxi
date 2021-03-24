<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Loading from "./components/Loader.vue"
export default {
  // components:{
  //       Loading
  //   },
  name: 'App',
  methods:{
    getBalance(value){
      console.log(value)
    }
  },
  created(){
    this.$on('wallet_balance');
  }
  
}
</script>


<!--Start of Tawk.to Script-->
<script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5e60059bc32b5c1917399a4e/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();
</script>
<!--End of Tawk.to Script-->

<style>
a{
  text-decoration: none !important;
  font-family: 'Rubik', sans-serif !important;
}
li,h4{

  font-family: 'Rubik', sans-serif;
}
body{
  background: white;
  font-family: 'Rubik', sans-serif !important;
}
.round-item{
border-radius: 10px;
}
.close-modal{
  border-radius:20px;color:red;position:absolute;right:0px;top:5px;z-index: 99999;
}

.link-line{
        padding-bottom:5px !important;
        border-bottom: 4px solid rgb(255, 193, 7);
        /* background-color: white; */
        
    }

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url("../public/css/style.css");
@import url("../public/css/sidebar.css");
/* @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.0.6/css/all.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"); */
</style>
