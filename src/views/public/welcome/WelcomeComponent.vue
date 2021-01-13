<template>
  <div>
    <div v-if="!loading">
    <div class="site-wrap" id="home-section">
      <!-- <nav
        class="site-nav navbar navbar-expand-lg navbar-light fixed-top py-3 site-navbar-target"
        id="mainNav"
      >
        <div class="container">
          <div class="col-6 col-md-3 col-xl-4 d-block">
            <h1 class="mb-0 site-logo">
              <a class="text-black h2 mb-0"
                >BaxiPay<span class="text-yellow">.</span>
              </a>
            </h1>
          </div>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto my-2 my-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link js-scroll-trigger"
                  href="https://www.baxibox.com/"
                  target="_blank"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link js-scroll-trigger"
                  href="https://www.capricorndigi.com/products/"
                  >Features</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav> -->

      <div class="site-blocks-cover" style="overflow: hidden">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div
              class="col-md-12"
              style="position: relative"
              data-aos="fade-up"
              data-aos-delay="200"
            >
            <div class="">
              <img
                src="/images/background.png"
                alt="Image"
                class="img-fluid img-absolute"
              />
            </div>

              <!-- <div class="row mb-4" data-aos="fade-up" data-aos-delay="200"> -->
                <div class="col-md-6 mr-auto">
                  <h2 style="font-family:Sans-serif">Welcome to Baxi IMS</h2>
                    <h6 style="color:yellow">Your payment plug</h6>
                  <div class="mb-5">
                    <div class="row">
                        <div class="col-md-9 mt-5">
                          <input type="email" class="form-control" placeholder="Username" v-model="credentials.username">                        
                        </div>
                        <div class="col-md-9 mt-5">
                          <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="col-md-9 mt-3">
                          <button class="btn btn-warning btn-block text-black font-weight-bold" @click.prevent="switchToIMS()">Login</button>
                        </div>
                    </div>
                  </div>
                  <!-- <div>
                    <a
                      class="btn yellow-skin text-yellow shadow mr-2 mb-2"
                      style="color: white !important"
                      data-toggle="modal"
                      data-target="#loginModal"
                      >Switch to IMS</a
                    >
                  </div> -->

                  <span
                    class="col text-center k-form-error font-weight-bold"
                    :class="{
                      'text-danger': loginStatus === false,
                      'text-success': loginStatus === true,
                    }"
                    v-show="loginStatus !== null"
                  >
                    {{ message }}...
                  </span>
                </div>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <!-- Login Modal -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="login"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form
              class="login100-form validate-form"
            >
              <span class="login100-form-title p-b-33"> Account Login </span>
              <div class="row justify-content-center">
                <span
                  class="col text-center k-form-error font-weight-bold"
                  :class="{
                    'text-danger': loginStatus === false,
                    'text-success': loginStatus === true,
                  }"
                  v-show="loginStatus !== null"
                >
                  {{ message }}...
                </span>
              </div>
              <div class="wrap-input100 validate-input">
                <input
                  class="input100"
                  type="text"
                  formControlName="username"
                  placeholder="Your Username"
                  v-model="credentials.username"
                />
                <span class="focus-input100-1"></span>
                <span class="focus-input100-2"></span>
              </div>
              <div class="container-login100-form-btn m-t-20">
                <button class="login100-form-btn" data-dismiss="modal" @click.prevent="switchToIMS()">
                  Sign in &nbsp;
                  <span class="three-quarters dis-none" v-show="loading"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Register modal -->
   
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
</style>
