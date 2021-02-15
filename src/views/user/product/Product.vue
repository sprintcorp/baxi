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
                  <!-- {{local_product}} -->
                        <section class="panel-content">
                            <div class="row">
                            <div class="col-md-12">
                                <div class="row mt-3 top-table p-3">
                                  <div class="col-md-2 mt-2 font-weight-bold fs-20"> Product</div>

                                  <div class="col-md-5">
                                    <button type="button" class="btn rounded btn-success mr-1" style="border-radius:45px !important;height:43px !important">Stock Value: ₦2,234,331</button>
                                    <button type="button" class="btn rounded" style="border-radius:45px !important;background-color:#372B96;color:white;height:43px !important">Inventory Items: 300</button>
                                  </div>

                                  <div class="col-md-5 d-flex justify-content-center">
                                    <button data-toggle="modal" data-target="#search" class="btn shadow mr-1 btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px;width:125px;height:40px !important">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/>  Date Filter <i class="fa fa-angle-down"></i>
                                    </button>

                                    <router-link :to="{name:'restockLevel'}"><button  class="btns shadow white-skin btn-sm sml-radius text-black  mr-2 p-2"  style="border-radius:25px;border:2px solid black">
                                      <i class="fa fa-microchip"></i> Restock Level
                                    </button></router-link>

                                    <button v-if="create_product" data-toggle="modal" data-target="#product" class="btns shadow yellow-skin btn-sm sml-radius text-black p-2" style="border-radius:30px;height:40px !important"><i class="fa fa-plus-circle"></i> Add Product
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
                                        <th>Size</th>
                                        <th>Quantity</th>                                                                              
                                        <th>Amount</th>
                                        <th>Date</th> 
                                        <th v-if="create_product || distributor">Action</th> 
                                        <!-- <th>Numbers</th> -->
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(product,index) in filerProducts" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>{{ product.name }}</td>
                                        <td>{{ product.sku }}</td>
                                        <td>{{product.category != '' ? product.category :'No Category'}}</td>
                                        <td>{{product.size}}</td>
                                        <td>{{ product.outlet_qty}}</td>                                        
                                        <td>₦{{ numberWithCommas(product.recommended_price) }}</td>
                                        <td>{{product.date }}</td>
                                        <td v-if="create_product || distributor">
                                          <button v-if="create_product" @click="editRetailerProduct(product)" data-toggle="modal" data-target="#editProduct"><i class="fa fa-edit"></i></button>
                                          <button @click="editRetailerProduct(product)" data-toggle="modal" data-target="#updateQuantity"><i class="fa fa-arrow-up"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                     <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageProducts(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageProducts(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageProducts(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageProducts(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
              
                                  </div>
                                   

                                </div>
                                <div class="overlay" v-if="saving">
                                <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                    <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                    Saving Product...
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




                      <div class="modal fade" id="editProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
                              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-md-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Product name</label>
                                      <input type="text" class="form-control" v-model="retailer_product.name" aria-describedby="product name" readonly>
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Product Category</label>
                                      <select class="form-control" v-if="distributor" v-model="retailer_product.category_id">
                                         
                                          <option v-for="(category,index) in categories" :key="index"  :value="category.id">{{ category.name  }}</option>                  
                                        </select>
                                        <input type="text" class="form-control" v-if="!distributor" v-model="retailer_product.category" aria-describedby="product category" readonly>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Quantity</label>
                                      <input type="text" class="form-control" v-model="retailer_product.qty" aria-describedby="quantity" readonly>
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Restock Level</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.restock_level" aria-describedby="restock level">
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Price</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.price" aria-describedby="quantity">
                                      <input type="hidden" class="form-control" v-model="retailer_product.product_id" aria-describedby="quantity">
                                    </div>
                                    
                                  </div>
                                </div>
                                <div class="col-md-3">
                                  <div class="text-center" style="width:100%;height:90%">
                                    <img :src="retailer_product.image" class="mb-2" style="width:100%"/>
                                  </div>
                                  <row md="12">
                                      <input id="fileUpload" ref="fileInput" type="file" @change="fileChange()" hidden>
                                      
                                      <!-- <button class="btn btn-warning btn-block" @click="chooseFiles()">Select Image</button> -->
                                      
                                      
                                  </row>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" @click="updateProduct()" data-dismiss="modal">Update</button>
                            </div>
                          </div>
                        </div>
                      </div>





                        <div class="modal fade" id="updateQuantity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Update Stock Quantity</h5>
                              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Current Quantity</label>
                                      <input type="text" class="form-control" v-model="retailer_product.qty" readonly aria-describedby="quantity">
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Update Quantity</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.restock" aria-describedby="restock level">
                                    </div>
                                    <div class="col-md-12" v-if="distributor">
                                      <label class="form-label">Type</label>
                                      <select v-model="retailer_product.type" class="form-control">
                                        <option selected disabled>Select type</option>
                                        <option value="pack">Pack</option>
                                        <option value="unit">Unit</option>
                                      </select>
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" @click="updateProductQuantity()" data-dismiss="modal">Update</button>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="modal fade" id="product" tabindex="-1" aria-labelledby="product" aria-hidden="true">
                        <div class="modal-dialog modal-xl modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
                              <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-md-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Product name</label>
                                      <!-- <Select2 v-model="myValue" class="form-control" style="width:200px" :options="system_products" :settings="{ settingOption: value, settingOption: value }"
                                    @change="myChangeEvent($event)" @select="mySelectEvent($event)"/> -->
                                    <Dropdown
                                        :options="list_products"
                                        v-on:selected="myChangeEvent($event)"
                                        :disabled="false"
                                        :maxItem="100"
                                        
                                        placeholder="Search for products">
                                    </Dropdown>
                                      <!-- <input type="text" class="form-control" v-model="product.name" aria-describedby="product name"> -->
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Product Category</label>
                                      <select class="form-control" v-model="product.category_id">
                                          <option value="" selected>Select product category</option>
                                          <option v-for="(category,index) in categories" :key="index"  :value="category.id">{{ category.name  }}</option>                  
                                        </select>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Quantity</label>
                                      <input type="text" class="form-control" v-model="product.pack_qty" aria-describedby="quantity">
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Minimum Order Qty</label>
                                      <input type="text" class="form-control"  v-model="product.minimum_order_quantity" aria-describedby="restock level">
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Price</label>
                                      <input type="text" class="form-control" v-model="product.pack_price" aria-describedby="quantity">
                                      <input type="hidden" class="form-control" v-model="retailer_product.product_id" aria-describedby="quantity">
                                    </div>

                                    <div class="col-md-6" v-if="!distributor">
                                      <label class="form-label">Outlet</label>
                                        <select class="form-control" v-model="product.outlet">
                                            <option value="" selected>Select business outlet</option>
                                            <option v-for="(outlet,index) in outlets" :key="index"  :value="outlet.id">{{ outlet.name  }}</option>                  
                                        </select>
                                    </div>
                                    <div class="col-md-6" v-if="distributor">
                                        <label class="form-label">Barcode</label>
                                        <input v-model="product.barcode" type="text" class="form-control">
                                    </div>
                                    
                                  </div>
                                  <!-- <div class="row">
                                  <div class="col-md-5">
                                    <Select2 v-model="myValue" class="form-control" :options="myOptions" :settings="{ settingOption: value, settingOption: value }"
                                    @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
                                  </div>
                                  </div> -->
                                  <div class="row" v-if="!distributor">
                                    <div class="col-md-12">
                                      <label class="form-label">Barcode</label>
                                        <input v-model="product.barcode" type="text" class="form-control">
                                    </div>                                    
                                  </div>
                                  
                                  
                                </div>
                                <div class="col-md-3">
                                  <div class="text-center" style="width:100%;height:90%">
                                    <img :src="product.image" class="mb-2" style="width:100%"/>
                                  </div>
                                  <row md="12">
                                      <input id="productUpload" ref="fileInputs" type="file" @change="fileChanges()" hidden>
                                      
                                      <button class="btn btn-warning btn-block" @click="addFiles()">Select Image</button>
                                      
                                      
                                  </row>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" @click="createProduct()" data-dismiss="modal">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>





                       


  <div class="modal fade" id="search" tabindex="-1" role="dialog" aria-labelledby="user" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span class="login100-form-title p-b-33">Search with date range</span>
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
                                    <div class="row mt-3">
                                      <button data-dismiss="modal" class="btn btn-danger btn-block">CLOSE</button>
                                    </div>
         
        </div>
      </div>
    </div>
  </div>




  <!--cart-->

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
  @import url("./Product.css");
</style>