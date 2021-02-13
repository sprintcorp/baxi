<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  
}
</script>

<style>
a{
  text-decoration: none !important;
  font-family: 'Rubik', sans-serif;
}
li,h4{

  font-family: 'Rubik', sans-serif;
}
body{
  background: white
}
.round-item{
border-radius: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url("../public/css/style.css");
@import url("../public/css/sidebar.css");
/* @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
@import url("https://use.fontawesome.com/releases/v5.0.6/css/all.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"); */
</style>
