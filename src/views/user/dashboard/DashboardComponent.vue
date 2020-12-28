<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
        <div class="heading-sec">
          <div class="row">
            <div class="col-md-6 column">
              <div class="heading-profile">
                <h2>
                  Hi <span>{{ name }}</span
                  >, Welcome back
                </h2>
                <span>All Your Shops</span>
              </div>
            </div>
          </div>

          <div class="row dis-none">
            <!-- <div class="col-md-4 column">
                            <div class="heading-profile">
                        <span @click="switchDOM('BUSINESS_SECTION')" style="cursor: pointer">
                            <span><i class="fa fa-arrow-left"></i></span> Back to all Businesses
                        </span>
                                <h2 class="mt-2"> (Business Name)</h2>
                            </div>
                        </div> -->
            <!-- <div class="col-md-8 column">
                            <div class="top-bar-chart">
                                <div class="quick-report">
                                    <div class="quick-report-infos">
                                        <button @click="openCreateOutletModal()" type="button"
                                                class="btns yellow-skin shadow lrg-btn sml-radius">Create Outlet &nbsp; <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> -->
          </div>

          <!-- <div class="row dis-none">
                        <div class="col-md-4 column">
                            <div class="heading-profile">
                        <span @click="switchDOM('OUTLET_SECTION')" style="cursor: pointer">
                          <span><i class="fa fa-arrow-left"></i></span> Back to all outlets
                        </span>
                                <h2 class="mt-2"> (Business Name) - (Outlet Name) Dashboard</h2>
                            </div>
                        </div>
                        <div class="col-md-8 column">
                            <div class="top-bar-chart">
                            </div>
                        </div>
                    </div> -->

          <!-- <div class="row dis-none">
                        <div class="col-md-4 column">
                            <div class="heading-profile">
                                <h2>(Outlet Name) Outlet Users </h2>
                                <span>All Users</span>
                            </div>
                        </div>
                        <div class="col-md-8 column">
                            <div class="top-bar-chart">
                                <div class="quick-report">
                                    <div class="quick-report-infos">
                                        <div  class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Search for a User">
                                            <div class="input-group-append">
                                                <button @click="searchUser()" class="input-group-text">Search &nbsp;
                                                    <span class="three-quarters"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
        </div>

        <!-- All Businesses -->
        <section class="panel-content">
          <div class="row" v-if="businesses.length && !loading">
            <div
              class="col-md-4"
              v-for="business in businesses"
              :key="business.id"
            >
              <div class="widget">
                <div class="widget-controls">
                  <span class="refresh-content"
                    ><i class="fa fa-refresh"></i
                  ></span>
                  <span class="refresh-content"
                    ><i class="fa fa-external-link"><a></a></i
                  ></span>
                </div>
                <div class="product-stats">
                  <h3>{{ business.name }}</h3>
                  <span>{{ business.category.name }} <i>category</i></span>
                  <ul>
                    <li>
                      Number of Outlets<span>
                        {{ business.outlets_count }}</span
                      >
                    </li>
                    <li>Today's Transactions<span>&#8358; -</span></li>
                  </ul>
                  <router-link :to="{name: 'business', params: { id: business.id }}" class="yellow-skin">
                    <span class="fa fa-eye"></span>
                    View Business
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div  v-if="!businesses.length && loading" style="text-align:center">                  
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="sr-only">Loading...</span>
            </div>                                      
          </div> 


          <div class="card" v-if="!businesses.length && !loading">
              <div class="card-body text-center">
                No business available at the moment
              </div>
            </div>  
        </section>
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./DashboardComponent.js">
</script>

<style scoped>
</style>
