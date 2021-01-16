<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="container-fluid p-2" style="background-color: white;min-height:80vh">
        <div class="heading-sec">
          <div class="row p-5">
            <div class="col-md-12 ml-5" style="">   
                  <div class="heading-profile">
                    <h2 class="text-black">
                      Welcome back, <span>{{ name }}!</span> 
                    </h2>
                  </div>             
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 d-flex justify-content-start">
             <form class="form-inline search-form my-2 my-lg-0" style="width:90%">
                    <input type="text" v-model="search" placeholder="Type to search for a product" style="background-color:white;width:97%;border-radius:20px"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
              </form>
            </div>
          </div>

          <div class="row p-5">
            <div class="col-md-8 col-sm-2"><i class="fa fa-arrow-left fs-20"></i></div>
            <div class="col-md-1 col-sm-2" style="margin-right:-30px"><i class="fa fa-shopping-cart fs-20"></i></div>
            <div class="col-md-3 col-sm-3 d-flex justify-content-end">
              <select class="form-control" @change="getResponse()" v-model="type" aria-label="Default select example">
                <option value="product">Product</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
          
          <div class="row">
                        <div class="col-md-12" v-if="results.length && !loading">
                            <div class="row" v-if="cat">
                                <div class="col-md-3 d-flex justify-content-center" v-for="(category,index) in filerResult" :key="index">
                                    <router-link :to="{name:'categoryVendor',params: { id: category.id }}">
                                    <div class="card p-2" style="width: 15rem;height:10rem">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="text-center mt-3"><img :src="category.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="card-body text-center">
                                           <p class="fs-13"> {{category.name}}</p>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>

                            <div class="row" v-if="!cat">
                                <div class="col-md-3 d-flex justify-content-center" v-for="(category,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'categoryVendor',params: { id: category.id }}"> -->
                                    <div class="card p-2" style="width: 18rem;height:14rem">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="text-center mt-1"><img :src="category.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="card-body text-center">
                                           <p class="fs-13"> {{category.name}}</p>
                                           <p class="fs-13"> {{category.qty}} Quantity</p>
                                           <p class="fs-13"> &#8358; {{ category.amount }}</p>
                                        </div>
                                        <button class="btn btn-warning btn-block">Sell</button>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>

                        </div>

                        <div class="row col-md-12">
                            <div v-if="!results.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div>
                            <div class="card" v-if="!filerResult.length && !loading">
                                <div class="card-body text-center">
                                    There are no response with your search words at the moment
                                </div>
                            </div>
                            <div class="card" v-if="!results.length && !loading">
                                <div class="card-body text-center">
                                    There are no products at the moment
                                </div>
                            </div>
                        </div>
                    </div>

        </div>
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Dashboard.js">
</script>

<style scoped>
th{
  font-size: 12px;
}
td{
  font-size: 13px;
}
</style>
