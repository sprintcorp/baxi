<template>
    <div>
        <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
            <div class="heading-sec">
          <div class="row">
            <div class="col-md-12 column">
              <div class="breadcrumbs">
                    <ul>
                        <li><router-link :to="{name:'distributorDashboard'}" title="">Home</router-link></li>
                        <li><span>Category</span></li>
                    </ul>
                </div>
              <div class="row col-md-12 text-center">
                  <div class="col-md-4">
                      <router-link :to="{name:'distributorProduct',params: { id: 3 }}">
                        <div class="card p-5" style="width: 18rem;">
                            <div style="font-size:100px"><i class="fa fa-beer"></i></div>
                            <div class="card-body">
                                Alcholic
                            </div>
                        </div>
                      </router-link>
                  </div>

                  <div class="col-md-4">
                      <router-link :to="{name:'distributorProduct',params: { id: 2}}">
                      <div class="card p-5" style="width: 18rem;">
                          <div style="font-size:100px"><i class="fa fa-coffee"></i></div>
                        <div class="card-body">
                            Non-Alcholic
                        </div>
                      </div>
                      </router-link>
                  </div>

                  <div class="col-md-4">
                    <router-link :to="{name:'distributorProduct', params: { id: 1 }}">
                      <div class="card p-5" style="width: 18rem;">
                          <div style="font-size:100px"><i class="fa fa-shopping-cart"></i></div>
                          <div class="card-body">
                            Grocery
                          </div>
                      </div>
                    </router-link>
                  </div>
              </div>
            </div>
          </div>

          <div class="row dis-none">
          </div>

        </div>


        </div>
    </div>
</template>

<script src="./Category.js">
</script>