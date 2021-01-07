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
          </div>

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

<script src="./Dashboard.js">
</script>

<style scoped>
</style>
