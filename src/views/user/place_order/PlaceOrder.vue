<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                        <div class="breadcrumbs">
                            <ul>
                            <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
                            <!-- <li><router-link :to="{name: 'outletOverview', params: { id: outlet }}" title="">Outlet</router-link></li> -->
                            <li><span>Products</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="heading-sec">
                        <div class="row">
                            <div class="col-md-4 column">
                                <div class="heading-profile">
                                <h2> Products in Cart  <span class="badge badge-info" style="background-color:#FFCF00;color:white">{{products.length}}</span> </h2>
                                </div>
                            </div>

                             <div class="col-md-8 column">
                                <div class="top-bar-chart">
                                <div class="quick-report">
                                    <div class="quick-report-infos">
                                      <button data-toggle="modal" type="button" @click="saveOrder()" class="btns shadow yellow-skin lrg-btn sml-radius">Save Order &nbsp; <i class="fa fa-save"></i>
                                    </button>
                                      <button data-toggle="modal" data-target="#cart" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">View Cart &nbsp; <i class="fa fa-shopping-cart"></i>
                                    </button>

                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <section class="panel-content">
                        <span> Seclect category and business</span>
                        <div class="row">
                            <div class="card" style="width:100%;min-height:60%">
                                <div class="card-body">
                                    <div class="row col-md-12 p-3">
                                        <div class="col-md-6 mb-3">
                                            <select class="form-control" @change="getBusinessOutlets($event)">
                                                <option>Select Category</option>
                                                <option v-for="(category,index) in categories" :key="index" :value="category.id">{{ category.name }}</option>
                                            </select>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <select class="form-control" @change="getBusinessProducts($event)">
                                                <option >{{businesses.length == 0 ?'No Business Available for this category':'Select Business'}}</option>
                                                <option v-for="(business,index) in businesses" :key="index" :value="business.id">{{ business.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="panel-content">
                            <div class="row">
                            <div class="col-md-12">
                                <div class="mini-stats-sec">
                                <span> Products</span>
                                <div class="row" v-if="local_product.length && !loading">

                                    <div class="col-md-3" v-for="(product,index) in local_product" :key="index">
                                    <div class="widget shadow">
                                        <div class="widget-controls">
                                        <!-- <span class="refresh-content"><i class="fa fa-trash" tooltip="'Remove'"></i></span> -->
                                        <span class="refresh-content" tooltip="'Edit'">Edit</span>
                                        </div>
                                        <div class="mini-stats">
                                        <h3>{{ product.name }}</h3>
                                        <p><i class="fa fa-money"></i>&#8358;{{ product.amount }}</p>
                                        <p>Quantity {{ product.quantity }} | Size {{product.size}}</p>
                                        </div>
                                        <div class="row p-3" style="float:right !important">
                                          <div class="col-md-8">
                                            <label>QTY</label>
                                            <select class="form-control"  @change="getQuatity(index,$event)">
                                              <option v-for="(n,i) in 50" :key="i">{{i+1}}</option>
                                            </select>
                                          </div>
                                          <div class="col-md-4">
                                            <label>ADD</label>
                                            <button @click="addToCart(product)"><h4><i class="fa fa-cart-plus"></i></h4></button>
                                          </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>

                                <div  v-if="!local_product.length && loading" style="text-align:center">
                  
                                      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div>
                                      
                                </div>
                                <div class="card" v-if="!local_product.length && !loading">
                                  <div class="card-body text-center">
                                    {{ message }}
                                  </div>
                                </div>
                                </div>
                            </div>
                            </div>
                    </section>


<div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
        <span class="login100-form-title p-b-33">Cart Item</span>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">qty</th>
      <th scope="col">price</th>
      <th scope="col">remove</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(product,index) in products" :key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{ product.name }}</td>
      <td>{{ product.qty }}</td>
      <td>{{ product.amount }}</td>
      <td><button type="button" @click="removeFromCart(product)" class="btn btn-secondary"><i class="fa fa-trash-o"></i></button></td>
    </tr>
    
  </tbody>
</table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i></button>
        <button type="button" class="btn btn-warning text-white" @click="saveOrder()">&nbsp; <i class="fa fa-save"></i></button>
      </div>
      </div>
    </div>
</div>
                </div>
            </div>
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./PlaceOrder.js">
</script>

<style scoped>
</style>