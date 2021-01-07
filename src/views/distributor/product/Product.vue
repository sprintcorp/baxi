<template>
    <div>
        <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
            <div class="row">
                <div class="breadcrumbs">
                    <ul>
                        <li><router-link :to="{name:'distributorDashboard'}" title="">Home</router-link></li>
                        <li><router-link :to="{name:'distributorProductCategory'}" title="">Category</router-link></li>
                        <li><span>Products</span></li>
                    </ul>
                </div>



                 <div class="heading-sec">
                            <div class="row">
                                <div class="col-md-4 column">
                                    <div class="heading-profile">
                                    <h2> Products | <span class="badge badge-info" style="background-color:#FFCF00;color:white">10</span></h2>
                                    </div>
                                </div>
                                <!-- <div class="col-md-8 column">
                                    <div class="top-bar-chart">
                                    <div class="quick-report">
                                        <div class="quick-report-infos">
                                        <button data-toggle="modal" data-target="#product" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">Create Product &nbsp; <i class="fa fa-plus"></i>
                                        </button>                                      
                                        </div>
                                    </div>
                                    </div>
                                </div> -->
                            </div>

                            <div class="row p-3">
                                <div class="col-md-12 card p-3">
                                    <div class="row">
                                    <div class="col-md-3" v-for="(n,i) in 50" :key="i">
                                    <div class="widget shadow">
                                        <div class="widget-controls">
                                        <!-- <span class="refresh-content"><i class="fa fa-trash" tooltip="'Remove'"></i></span> -->
                                        <span class="refresh-content" tooltip="'Edit'">Edit</span>
                                        </div>

                                        
                                            <div class="row col-md-12">
                                                <div class="col-md-8 pt-5">
                                                    <div class="">
                                                    <h6>Product name</h6>
                                                    <p><i class="fa fa-money"></i> &#8358; 200</p>
                                                    <p>Quantity 3</p>
                                                    </div>
                                                    
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="pt-5" style="font-size:80px"><i class="fa fa-cubes"></i></div></div>
                                            </div>
                                        

                                        <div class="row p-3" style="float:right !important">
                                          <div class="col-md-8">
                                            <label>QTY</label>
                                            <select class="form-control">
                                              <option v-for="(n,i) in 50" :key="i">{{i+1}}</option>
                                            </select>
                                          </div>
                                          <div class="col-md-4">
                                            <label>ADD</label>
                                            <button @click="addToCart()"><h4><i class="fa fa-cart-plus"></i></h4></button>
                                          </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
            </div>
        
        </div>
    </div>
</template>

<script src="./Product.js">

</script>