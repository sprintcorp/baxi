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
              <section class="panel-content text-center">
                <div class="row col-md-12 text-center" v-if="categories.length && !loading">
                    <div class="col-md-4" v-for="(category,index) in categories" :key="index">
                        <router-link :to="{name:'distributorProduct',params: { id: category.id }}">
                          <div class="card p-5" style="width: 20rem;height:20rem">
                              <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                              <div><img :src="category.public_image_url" style="max-width: 80%;"/></div>
                              <div class="card-body">
                                  {{category.name}}
                              </div>
                          </div>
                        </router-link>
                    </div>
                </div>
                
                
                <div class="row col-md-12" style="position: absolute;left: 50%;top: 50%;">
                  <div v-if="!categories.length && loading" style="text-align:center">                  
                      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                          <span class="sr-only">Loading...</span>
                      </div><br>
                                      Loading...
                                        
                  </div>
                  <div class="card" v-if="!categories.length && !loading">
                      <div class="card-body text-center">
                          There are no category at the moment
                      </div>
                  </div>
                </div>
              </section>


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