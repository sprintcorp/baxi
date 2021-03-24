<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
        <div class="heading-sec">
          <div class="row">
            <div class="col-md-12 column">
                
                   <router-link :to="{ name: 'dashboard' }"> <div class="heading-profile">
                        <span style="cursor: pointer">
                        <span><i class="fa fa-arrow-left"></i></span> Back to all Businesses</span>               
                   </div>
                   </router-link>
              <div class="heading-profile">
                <h2>
                   <span>{{ name }}</span>
                </h2>
                <div class="row" v-if="outlets.length && !loading">
                    <div v-for="(outlet,index) in outlets" :key="index" class="col-md-4 ng-star-inserted">
                        <router-link :to="{name: 'outletOverview', params: { id: outlet.id }}">
                            <div  class="widget shadow">
                                <div  class="widget-controls">
                                    <span  class="refresh-content" ng-reflect-tooltip="Edit" aria-describedby="tooltip-1">
                                        edit
                                        </span>
                                    </div>
                                <div  class="mini-stats">
                                    <span  class="yellow-skin">
                                        <i  class="fa fa-building"></i>
                                    </span>
                                            <h3 >{{ outlet.name }}</h3>
                                            <p ><i  class="fa fa-arrow-up up"></i>
                                            {{ outlet.product }}
                                            <span  class="ng-star-inserted">Product</span>
                                            </p>
                                        </div>
                            </div>
                        </router-link>    
                    </div>
                        

                    
                </div>

                <div  v-if="!outlets.length && loading" style="text-align:center">                  
                  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                  </div><br>
                                      Loading...                                      
                </div>  
                <div class="card" v-if="!outlets.length && !loading">
              <div class="card-body text-center">
                There are no Outlets for this business at the moment
              </div>
            </div>              
              </div>

              

              
            </div>
          </div>

          <div class="row dis-none">
               
              
         
          </div>

          
        </div>

        <!-- All Businesses -->
        <section class="panel-content">
          <div class="row">
            <div
              class="col-md-4"
              
            >
              

            </div>
          </div>
        </section>
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Business.js">
</script>

<style scoped>
</style>
