<template>
  <div>
    <div class="site-wrap" id="home-section">
      <nav
        class="site-nav navbar navbar-expand-lg navbar-light fixed-top py-3 site-navbar-target"
        id="mainNav"
      >
        <div class="container">
          <div class="col-6 col-md-3 col-xl-4 d-block">
            <h1 class="mb-0 site-logo">
              <a class="text-black h2 mb-0"
                >BaxiPay - Mock<span class="text-yellow">.</span>
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
      </nav>

      <div class="site-blocks-cover" style="overflow: hidden">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div
              class="col-md-12"
              style="position: relative"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="/images/imsBanner.png"
                alt="Image"
                class="img-fluid img-absolute"
              />

              <div class="row mb-4" data-aos="fade-up" data-aos-delay="200">
                <div class="col-lg-6 mr-auto">
                  <h1>You're on BaxiPay! - Deborah Offor</h1>
                  <!--                                        <h1>Make Your Business More Profitable</h1>-->
                  <p class="mb-5">
                    We create a fully customizable product catalog that empowers
                    your businesses, with you taking complete control over their
                    sale and purchase processes, monitor the changing inventory
                    in real-time and effortlessly creating detailed reports on
                    your product performance.
                  </p>
                  <div>
                    <a
                      class="btn yellow-skin text-yellow shadow mr-2 mb-2"
                      style="color: white !important"
                      data-toggle="modal"
                      data-target="#loginModal"
                      >Switch to IMS</a
                    >
                    <!-- <a
                      class="btn yellow-skin text-yellow shadow mr-2 mb-2"
                      style="color: white !important"
                      @click="switchToIMS()"
                      >Switch to IMS</a
                    >
                    <a
                      class="btn btn-secondary shadow text-white mr-2 mb-2"
                      data-toggle="modal"
                      data-target="#loginModal"
                      >Login</a
                    > -->
                  </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="site-section dis-none" id="features-section">
        <div class="container">
          <div
            class="row mb-5 justify-content-center text-center"
            data-aos="fade-up"
          >
            <div class="col-7 text-center mb-5">
              <h2 class="section-title">
                Inventory Management System Features
              </h2>
              <!--          <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quos quaerat sapiente nam, id vero.</p>-->
            </div>
          </div>
          <div class="row align-items-stretch">
            <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span class="text-primary fa fa-refresh"></span
                  ></span>
                </div>
                <div>
                  <h3>Marketing Consulting</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4 mb-4 mb-lg-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span class="text-primary icon-store_mall_directory"></span
                  ></span>
                </div>
                <div>
                  <h3>Market Analysis</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4 mb-4 mb-lg-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span class="text-primary icon-shopping_basket"></span
                  ></span>
                </div>
                <div>
                  <h3>Easy Purchase</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span
                      class="text-primary icon-settings_backup_restore"
                    ></span
                  ></span>
                </div>
                <div>
                  <h3>Free Updates</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 col-lg-4 mb-4 mb-lg-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span class="text-primary icon-sentiment_satisfied"></span
                  ></span>
                </div>
                <div>
                  <h3>100% Satistified</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 col-lg-4 mb-4 mb-lg-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="unit-4 d-block">
                <div class="unit-4-icon mb-3">
                  <span class="icon-wrap"
                    ><span class="text-primary icon-power"></span
                  ></span>
                </div>
                <div>
                  <h3>Easy Plugin</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis quis molestiae vitae eligendi at.
                  </p>
                  <p><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer bg-white py-5 text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <p class="mb-0">
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              </p>
              <p class="mb-0">
                Copyright &copy; 2020 All rights reserved |
                <a href="https://www.capricorndigi.com/" target="_blank"
                  >Capricorn Digital</a
                >
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              </p>
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

              <div class="k-form-error mb-2 dis-none">
                <div>
                  Valid username / email / phone number is required: e.g. admin
                </div>
              </div>

              <!-- <div class="wrap-input100 rs1 validate-input">
                <input
                  class="input100"
                  formControlName="password"
                  type="password"
                  placeholder="Your Password"
                  v-model="credentials.password"
                />
                <span class="focus-input100-1"></span>
                <span class="focus-input100-2"></span>
              </div> -->
              <div class="k-form-error dis-none">
                <div>Password is required</div>
              </div>
              <div class="container-login100-form-btn m-t-20">
                <button class="login100-form-btn" data-dismiss="modal" @click.prevent="switchToIMS()">
                  Sign in &nbsp;
                  <span class="three-quarters dis-none" v-show="loading"></span>
                </button>
              </div>
              <!-- <div class="text-center p-t-45 p-b-4">
                <span class="txt1"> Forgot </span>
                <a href="#" class="txt2 hov1"> Password? </a>
              </div>
              <div class="text-center">
                <span class="txt1">Create an account? &nbsp;</span
                ><a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#registerModal"
                  class="txt2 hov1"
                  >Sign up</a
                >
              </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Register modal -->
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="register"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="jumbotron">
            <h1 class="display-4 text-white">
              Get started with baxi ims<span class="text-yellow">.</span>
            </h1>
            <p class="lead text-white-50">Inventory Management System</p>
          </div>
          <!--      Section 1 - Intro-->
          <section class="sectioning">
            <p>
              Create your business, and let us help you manage it, in three easy
              steps.
            </p>
            <!-- <p class="lead">
              <a class="btn btn-primary btn-lg mb-3 float-right" role="button"
                >Next <i class="fa fa-arrow-right"></i>
              </a>
            </p> -->
          </section>
          <!--      Section 2 - Create User-->
          <section class="sectioning" v-if="register">
            <p>Create An Account</p>
            <!-- <div class="row justify-content-center">
              <span class="col text-center k-form-error">(error message)</span>
            </div> -->
            <form>
              <div class="form-row mb-2">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="first_name"
                      type="text"
                      class="form-control"
                      placeholder="Your First Name"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="last_name"
                      type="text"
                      class="form-control"
                      placeholder="Your Last Name"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row mb-2">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="email"
                      type="email"
                      class="form-control"
                      placeholder="Your Email Address"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="username"
                      type="text"
                      class="form-control"
                      placeholder="Your Username"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row mb-2">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="password"
                      type="password"
                      class="form-control"
                      placeholder="Your Account password"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row mb-2">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      formControlName="phone_no"
                      type="tel"
                      class="form-control"
                      placeholder="Your Phone Contact Details"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <select formControlName="gender" class="form-control">
                      <option value="" disabled selected>
                        Select Gender...
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <p class="lead">
              <button
                class="btn btn-primary btn-lg mb-3 float-right ml-3"
                @click="registerUser()"
              >
                Next
                <i class="fa fa-arrow-right"
                  >&nbsp; <span class="three-quarters"></span
                ></i>
              </button>
              <!-- <button class="btn btn-secondary btn-lg mb-3 text-white">
                <i class="fa fa-arrow-left"></i> &nbsp;Back
              </button> -->
            </p>
          </section>
          <!--      Section 3 - Login User-->
          <section class="sectioning" v-if="!register">
            <p>Confirm Your Login</p>
            <!-- <div class="row justify-content-center">
              <span class="col text-center k-form-error"
                >Incorrect Username or/and Password</span
              >
            </div> -->
            <form>
              <div class="form-row mb-4">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <!--                <input formControlName="username" type="text" class="form-control-plaintext" value="{{this.state.createdUser['email']}}">-->
                    <input
                      formControlName="username"
                      type="text"
                      class="form-control"
                      placeholder="Your Account username / email / phone number"
                      v-model="credentials.username"
                    />
                  </div>

                  <!-- <div class="k-form-error">
                    <div>Username or Email or Phone Number is required</div>
                  </div> -->
                </div>
              </div>
              <div class="form-row mb-4">
                <div class="col">
                  <div class="input-group mb-2 mr-sm-2">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Your Account password"
                      v-model="credentials.password"
                    />
                  </div>
                  <!-- <div class="k-form-error">
                    <div>Password is required</div>
                  </div> -->
                </div>
              </div>
            </form>
            <p class="lead">
              <a
                class="btn btn-primary btn-lg mb-3 float-right ml-3"
                role="button"
                @click.prevent="loginUser()"
                >Login
                <i class="fa fa-arrow-right">
                  &nbsp; <span class="three-quarters"></span
                ></i>
              </a>
              <a
                class="btn btn-secondary btn-lg mb-3 text-white"
                role="button"
                @click="backToRegister()"
              >
                <i class="fa fa-arrow-left"></i> &nbsp; Create New Account</a
              >
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./WelcomeComponent.js">
</script>

<style scoped>
</style>
