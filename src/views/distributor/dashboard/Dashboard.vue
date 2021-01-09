<template>
    <div>
        <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
            <div class="heading-sec">
          <div class="row">
            <div class="col-md-12 column">
              <div class="heading-profile">
                <h2>
                  Hi <span>{{ name }}</span
                  >, Welcome back
                </h2>
              </div>
              <div class="row col-md-12 text-center">
                  <div class="col-md-4">
                      <router-link :to="{name:'distributorProductCategory'}">
                        <div class="card p-5" style="width: 18rem;">
                            <div style="font-size:100px"><i class="fa fa-th"></i></div>
                            <div class="card-body">
                                Category <span class="badge bg-secondary text-white">{{categories.length}}</span>
                            </div>
                        </div>
                      </router-link>
                  </div>

                  <div class="col-md-4">
                      <router-link :to="{name:'distributorOrder'}">
                      <div class="card p-5" style="width: 18rem;">
                          <div style="font-size:100px"><i class="fa fa-shopping-cart"></i></div>
                        <div class="card-body">
                            Orders <span class="badge bg-secondary text-white">3</span>
                        </div>
                      </div>
                      </router-link>
                  </div>

                  <div class="col-md-4">
                    <router-link :to="{name:'distributorTransaction'}">
                      <div class="card p-5" style="width: 18rem;">
                          <div style="font-size:100px"><i class="fa fa-money"></i></div>
                          <div class="card-body">
                            Transactions <span class="badge bg-secondary text-white">40</span>
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

<script src="./Dashboard.js">
</script>