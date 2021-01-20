<template>
  <div>
    <div v-if="!loading">
     <div class="container-fluid bg-white">
       <div class="row" style="height:100vh">
         <div class="col-md-4 mr-5" style="margin-top:100px">
           <div class="mr-5">
           <div class="form-heading mt-5">
             <h3 class="mb-n1">Welcome to Baxi IMS.</h3> 
             <small class="text-warning">Your Payment plug</small>
           </div>

           <div class="form-group mt-5">
             <input type="email" class="form-control" placeholder="Username" v-model="credentials.username"> 
           </div>

           <div class="form-group mt-4">
              <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
           </div>
           <div class="form-group" style="margin-top:80px;margin-bottom:50px;">
             <button class="btn btn-warning btn-block" style="border-radius:20px" @click.prevent="switchToIMS()">Login</button>

           </div>
           <div class="form-group mb-5" style="text-align:center">
             <button class="btn btn-warning btn-sm"><i class="fa fa-comments"></i> Chat with us</button>
           </div>
           </div>

         </div>
         <div class="col-md-7" style="height:100vh">
            <div class="right-side-image">
             
              
            </div>

         </div>
       </div>
     </div>
   
    </div>

    <div v-if="loading">
      <div class="row text-center center">
        <div class="row">
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden"></span>
        </div>
        <div class="spinner-grow text-dark" role="status">
          <span class="visually-hidden"></span>
        </div>
        </div>
        
      </div>
      <div class="row" style="margin-left: 40%;">Authenticating {{credentials.username}}</div>
      
    </div>
  </div>
</template>

<script src="./WelcomeComponent.js">
</script>

<style scoped>
.center {
  margin: auto;
  width: 100%;
  padding: 10px;
   margin-left: 40%;
  /* margin-right: 50%; */
  margin-top: 20%;
}
.right-side-image {
  background-image: url(/images/background.png);
  width: 100%;
  height:100vh;
  background-size: cover;
  background-repeat: no-repeat;
  /* zoom:1 */
}
.container-fluid{
  margin-right: -60px !important;
}
body{
  overflow: hidden;
}
</style>
