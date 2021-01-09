<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                         <div class="breadcrumbs">
                            <ul>
                            <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
                            <li><router-link :to="{name: 'outletOverview', params: { id: outlet }}" title="">Outlet</router-link></li>
                            <li><span>Products</span></li>
                            </ul>
                        </div>

                        <div class="heading-sec">
                            <div class="row">
                            <div class="col-md-4 column">
                                <div class="heading-profile">
                                <h2> Products in Outlet | <span class="badge badge-info" style="background-color:#FFCF00;color:white">{{product_orders.length}}</span> Order  </h2>
                                </div>
                            </div>
                              <div class="col-md-8 column">
                                  <div class="top-bar-chart">
                                  <div class="quick-report">
                                      <div class="quick-report-infos">
                                        <button data-toggle="modal" type="button" @click="saveOrder()" class="btns shadow yellow-skin lrg-btn sml-radius">Save Order &nbsp; <i class="fa fa-save"></i>
                                      </button>
                                        <button data-toggle="modal" data-target="#user" @click="showUserForm()" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">Add User to Order &nbsp; <i class="fa fa-user-plus"></i>
                                      </button>
                                      <button data-toggle="modal" data-target="#product" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">Create Product &nbsp; <i class="fa fa-plus"></i>
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
                            <div class="row">
                            <div class="col-md-12">
                                <div class="mini-stats-sec">
                                <span> My Products</span>
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
                                        <p>Quantity {{ product.quantity }}</p>
                                        <p>Size {{product.size}}</p>
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
                                      </div><br>
                                      Loading...
                                      
                                </div>
                                <div class="card" v-if="!local_product.length && !loading">
                                  <div class="card-body text-center">
                                    There are no products for this outlet at the moment
                                  </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </section>





                        <!--Create Product -->
<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span class="login100-form-title p-b-33">Add a new product</span>
          
          <form class="login100-form validate-form">
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="product.name" type="text" class="form-control" placeholder="A product name">
                </div>
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="product.barcode" type="text" class="form-control" placeholder="Generate a barcode">
                </div>
                
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="product.recommended_price" type="number" class="form-control" placeholder="Selling Price">
                </div>
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="product.outlet_qty" type="number" class="form-control" placeholder="Outlet Quantity">
                </div>
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <select class="form-control" v-model="product.category_id">
                  <!-- <option value="" selected>Select product category</option> -->
                  <option v-for="(category,index) in categories" :key="index"  :value="category.id">{{ category.name  }}</option>                  
                </select>
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="product.restock_level" type="number" class="form-control" placeholder="Restock Level">
                </div>
                
              </div>
            </div>
            <p class="lead">
              <button @click.prevent="createProduct()" class="btn btn-primary btn-lg float-right">Create
                <!-- <i class="fa fa-save"></i> -->
                <div class="spinner-grow text-light" role="status" v-if="saving">
                  <span class="visually-hidden"></span>
                </div>
              </button>
              
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="user" tabindex="-1" role="dialog" aria-labelledby="user" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span class="login100-form-title p-b-33">Customer Information</span>
          
          <form class="login100-form validate-form">
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="cart.customer.name" type="text" class="form-control" placeholder="Customer name">
                </div>
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="cart.customer.email" type="email" class="form-control" placeholder="Customer email">
                </div>
                
              </div>
            </div>
            <div class="form-row mb-4">
              <div class="col">
                <div class="input-group mb-2 mr-sm-2">
                  <input v-model="cart.customer.phone" type="number" class="form-control" placeholder="Customer phone">
                </div>
              </div>
            </div>
            <p class="lead">
              <button type="button" @click="addUserToProduct()" data-dismiss="modal" class="btn btn-primary btn-lg float-right">Save
                <!-- <i class="fa fa-save"></i> -->
                <div class="spinner-grow text-light" role="status" v-if="saving">
                  <span class="visually-hidden"></span>
                </div>
              </button>
              <button @click.prevent="closeUserForm()" data-dismiss="modal" class="btn btn-warning btn-lg float-right mr-3 text-white">Close
              </button>
              
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>




  <!--cart-->
    <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
        <span class="login100-form-title p-b-33">Cart Item</span>
        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i></button>
      </div>
      <div class="modal-body">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">qty</th>
      <th scope="col">price</th>
      <th scope="col">customer name</th>
      <th scope="col">customer email</th>
      <th scope="col">customer phone</th>
      <th scope="col">remove</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(product,index) in product_orders" :key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{ product.name }}</td>
      <td>{{ product.qty }}</td>
      <td>{{ product.amount }}</td>
      <td>{{ product.customer.name }}</td>
      <td>{{ product.customer.email }}</td>
      <td>{{ product.customer.phone }}</td>
      <td><button type="button" @click="removeFromCart(product)" class="btn btn-secondary"><i class="fa fa-trash-o"></i></button></td>
    </tr>
    
  </tbody>
</table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" @click="clearCartItem()" data-dismiss="modal"><i class="fa fa-times-circle"></i></button>
        <button type="button" class="btn btn-warning text-white" @click="saveOrder()">&nbsp; <i class="fa fa-save"></i></button>
      </div>
      </div>
    </div>
</div>
  <!--cart end-->
                    </div>
                </div>
            </div>
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./Product.js">
</script>

<style scoped>
</style>