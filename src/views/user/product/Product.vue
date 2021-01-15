<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container" style="background-color: white;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                         

                        <div class="heading-sec">
                            <div class="row">
                            <div class="col-md-4 column">
                                <!-- <div class="heading-profile">
                                  <h2> Products </h2>
                                </div> -->
                            </div>
                              <div class="col-md-8 column">
                                  <div class="top-bar-chart">
                                    <!-- <div class="quick-report">
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
                                  </div> -->
                                  </div>
                              </div>
                            </div>
                        </div>

                        <section class="panel-content">
                            <div class="row">
                            <div class="col-md-12">
                                <div class="row border-2 mt-3">
                                  <div class="col-md-2 font-weight-bold"> Product</div>
                                  <div class="col-md-6">
                                    <div class="row">
                                      <div class="col-md-6">
                                        <div class="input-group">
                                          <span class="input-group-text" id="basic-addon3">From</span>
                                          <input type="date" v-model="start_date" class="form-control" @change="showDate"/>
                                        </div>
                                      </div>
                                      <div class="col-md-6">
                                        <div class="input-group">
                                          <span class="input-group-text" id="basic-addon3">To</span>
                                          <input type="date" v-model="end_date" class="form-control" @change="showDate"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <button  class="btns shadow white-skin btn-sm sml-radius text-black  mr-2 p-2"  style="border-radius:25px;border:2px solid black">
                                      <i class="fa fa-microchip"></i> Restock Level
                                    </button>
                                    <button data-toggle="modal" data-target="#product" class="btns shadow yellow-skin btn-sm sml-radius text-black" style="border-radius:30px"><i class="fa fa-plus-circle"></i> Add Product
                                    </button>
                                  </div>
                                </div>
                                  <div class="row">
                                  <div class="table-responsive mt-5" v-if="local_product.length && !loading">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr>
                                        <th>S/N</th>
                                        <th>Products</th>
                                        <th>Products ID</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Date Ordered</th>
                                        <th>Date Delivered</th>
                                        <th>Amount</th>
                                        <!-- <th>Numbers</th> -->
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(product,index) in filerProducts" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ product.name }}</td>
                                        <td>{{ product.sku }}</td>
                                        <td></td>
                                        <td></td>
                                        <td>{{  }}</td>
                                        <td>{{  }}</td>
                                        <td>{{ product.amount }}</td>
                                        <!-- <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="showProducts(product)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td> -->
                                      </tr>
                                      </tbody>
                                    
                                    </table>
              
                                  </div>
                                   

                                </div>

                                <div class="mt-5" v-if="!local_product.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div>
                                <div class="card mt-5" v-if="!local_product.length && !loading">
                                  <div class="card-body text-center">
                                    There are no products for this outlet at the moment
                                  </div>
                                </div>
                                <!-- </div> -->
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