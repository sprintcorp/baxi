<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container-fluid" style="background-color: white;min-height:80vh">
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
                                  <div class="col-md-1 mt-2 font-weight-bold fs-20"> Product</div>

                                  <div class="col-md-6">
                                    <!-- <div> -->
                                    <button type="button" class="btn rounded mr-1" style="border-radius:30px !important;background-color:#1e8b39;color:white;height:43px !important;width:200px;font-size:14px;" v-if="page.total_value"><strong>Total Value:</strong> &#8358;{{page.total_value.toLocaleString()}}</button>
                                    <!-- </div> -->

                                    <!-- <div> -->
                                    <button type="button" class="btn rounded" style="border-radius:30px !important;background-color:#372B96;color:white;height:43px !important;width:200px;font-size:14px;"><strong>Total Products:</strong> {{page.total}}</button>
                                    <!-- </div> -->
                                  </div>

                                  <div class="col-md-5 d-flex justify-content-end">
                                    <button data-toggle="modal" data-target="#search" class="btn shadow mr-1 btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px;width:120px;height:40px !important">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/>  Date Filter
                                    </button>

                                    <router-link :to="{name:'restockLevel'}">
                                      <button  class="btns shadow white-skin btn-sm sml-radius text-black  mr-2 p-2"  style="border-radius:25px;border:2px solid black">
                                        <i class="fa fa-microchip"></i> Restock Level
                                      </button>
                                    </router-link>

                                    <button v-if="create_product" data-toggle="modal" data-target="#product" class="btns shadow yellow-skin btn-sm sml-radius text-black p-2" style="border-radius:30px;height:40px !important"><i class="fa fa-plus-circle"></i> Add Product
                                    </button>
                                  </div>

                                </div>
                                <!-- {{local_product}} -->
                                  <div class="row">
                                  <div class="table-responsive mt-5" v-if="local_product.length && !loading">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr>
                                        <th>S/N</th>
                                        <th>Products</th>
<!--                                        <th>Products ID</th>-->
                                        <th>Category</th>
<!--                                        <th>Size</th>-->
                                        <th>Qty (Left)</th>
                                        <th>Sold (Units)</th>
                                        <th>Sold (Amount)</th>
                                        <th v-if="distributor">Pack (QTY)</th>
                                        <th v-if="distributor">Unit (QTY)</th>
                                        <th>Price</th>
                                        <th v-if="create_product || distributor">Action</th> 
                                        <!-- <th>Numbers</th> -->
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(product,index) in local_product" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>
                                          <div class="pull-left" style="width:50px;padding:10px">
                                            <img :src="product.public_image_url" style="width:100%" />
                                          </div>
                                          <div class="pull-left">
                                            <strong class="fs-16">
                                              {{ product.name }}
                                              <span v-if="product.size">({{product.size}})</span>
                                            </strong><br>
                                            <small>SKU: {{product.sku}}</small>
                                          </div>
                                          <div class="clearfix"></div>
                                        </td>
<!--                                        <td>{{ product.sku }}</td>-->
                                        <td>{{product.category != '' ? product.category :'No Category'}}</td>
<!--                                        <td>{{product.size}}</td>-->
                                        <td>{{ product.outlet_qty}}</td>                                        
                                        <td>{{ product.sales}}</td>
                                        <td>₦{{ numberWithCommas(product.sales_amount)}}.00</td>
                                        <td v-if="distributor">{{product.pack_qty}}</td>
                                        <td v-if="distributor">{{product.unit_qty}}</td>
                                        <td>₦{{ numberWithCommas(product.recommended_price) }}</td>
<!--                                        <td>{{product.date | moment("ddd, Do MMMM 'YY, h:mma") }}</td>-->
                                        <td v-if="create_product || distributor">
                                          <button v-if="create_product" @click="editRetailerProduct(product)" data-toggle="modal" data-target="#editProduct" title="Edit Product"><i class="fa fa-edit"></i></button>
                                          <button @click="editRetailerProduct(product)" data-toggle="modal" data-target="#updateQuantity" title="Update Stock"><i class="fa fa-arrow-up"></i></button>
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
                                <!-- <div class="mt-5" v-if="!local_product.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div> -->
                               
                                <div class="card mt-5" v-if="!local_product.length && !loading">
                                  <div class="card-body text-center">
                                    There are no products for this business at the moment
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
                                    <div class="col-md-6" v-if="!distributor">
                                      <label class="form-label">Price</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.price" aria-describedby="quantity">
                                      <input type="hidden" class="form-control" v-model="retailer_product.product_id" aria-describedby="quantity">
                                    </div>
                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Pack Price</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.pack_price" aria-describedby="quantity">
                                      
                                    </div>
                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Unit Price</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.unit_price" aria-describedby="quantity">
                                      <input type="hidden" class="form-control" v-model="retailer_product.product_id" aria-describedby="quantity">
                                    </div>
                                    
                                  </div>
                                </div>
                                <div class="col-md-3">
                                  <div class="text-center" style="height:100%">
                                    <img :src="retailer_product.image" class="mb-2" style="height:250px"/>
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
                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Pack Quantity</label>
                                      <input type="text" class="form-control" v-model="retailer_product.pack_qty" aria-describedby="pack quantity">
                                    </div>
                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Unit Quantity</label>
                                      <input type="text" class="form-control" v-model="retailer_product.unit_qty" aria-describedby="unit quantity">
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
                              <div class="modal-title" id="exampleModalLabel">
                                <h4>ADD PRODUCT</h4>
                                <small>The Asterisk sign (*) indicates the form is compulsory and must be filled before you can add a product</small>
                              </div>

                              <div class="d-flex justify-content-end">
                                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"><img :src="require('@/assets/icon/noun_cancel_2014884.png')" class='rounded' alt="img"/></button>
                              </div>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                                <div class="col-md-9">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Product Name *</label>
                                      <!-- <Select2 v-model="myValue" class="form-control" style="width:200px" :options="system_products" :settings="{ settingOption: value, settingOption: value }"
                                    @change="myChangeEvent($event)" @select="mySelectEvent($event)"/> -->
                                    
                                      <Select2 v-model="myValue" style="width:100%" :options="list_products" :settings="select2Options" @change="myChangeEvent($event)" @select="selectedProduct($event)" required />

<!--                                      <Dropdown-->
<!--                                        :options="list_products"-->
<!--                                        v-on:selected="myChangeEvent($event)"-->
<!--                                        :disabled="false"-->
<!--                                        :maxItem="100"-->
<!--                                        placeholder="Search for products">-->
<!--                                    </Dropdown>-->
                                      <!-- <input type="text" class="form-control" v-model="product.name" aria-describedby="product name"> -->
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Unit Price *</label>
                                          <div class="input-group">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/coins.png')" class='rounded' alt="img"/></span>
                                            </div>
                                              <input type="text" class="form-control" v-model="product.pack_price" aria-describedby="quantity" required>
                                          </div>
                                        <input type="hidden" class="form-control" v-model="retailer_product.product_id" aria-describedby="quantity">
                                 
                                        <input type="hidden" class="form-control" v-model="product.category_id" aria-describedby="quantity">
                                      
                                      
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Quantity *</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/noun_product_2646445.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" v-if="distributor" class="form-control" required v-model="product.pack_qty" aria-describedby="quantity">
                                        <input type="text" v-if="!distributor" class="form-control" required v-model="product.qty" aria-describedby="quantity">
                                      </div>
                                    </div>

                                    <div class="col-md-6" v-if="!distributor">
                                      <label class="form-label">Category</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/categories.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.category" aria-describedby="restock level" readonly>
                                        
                                      </div>
                                    </div>

                                    <div class="col-md-6"  v-if="distributor">
                                      <label class="form-label">Minimum Order Quantity</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/noun_dashboard_3542616.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" required v-model="product.minimum_order_quantity" aria-describedby="restock level">
                                        
                                      </div>
                                    </div>

                                    <!-- <div class="col-md-6" v-if="!distributor">
                                      <label class="form-label">Outlet</label>
                                      <div class="input-group">
                                          <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/noun_dashboard_3542616.png')" class='rounded' alt="img"/></span>
                                          </div>
                                        <select class="form-control" v-model="product.outlet">
                                            <option value="" selected>Select business outlet</option>
                                            <option v-for="(outlet,index) in outlets" :key="index"  :value="outlet.id">{{ outlet.name  }}</option>                  
                                        </select>
                                      </div>
                                    </div> -->
                                  </div>
                                  <div class="row">
                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Category</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/categories.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.category" aria-describedby="restock level" readonly>
                                        
                                      </div>
                                    </div>

                                    <div class="col-md-6">
                                      <label class="form-label">Size</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/shape-size-interface-symbol.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.size" aria-describedby="restock level" readonly>
                                        
                                      </div>
                                    </div>

                                    <div class="col-md-6" v-if="!distributor">
                                      <label class="form-label">Barcode</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/qr-code.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.barcode" aria-describedby="restock level">
                                        
                                      </div>
                                    </div>

                                    
                                    
                                    
                                  </div>


                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label">Restock Level</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/restock.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.restock_level" aria-describedby="restock level">
                                        
                                      </div>
                                    </div>

                                    <div class="col-md-6" v-if="distributor">
                                      <label class="form-label">Barcode</label>
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon1"><img :src="require('@/assets/icon/qr-code.png')" class='rounded' alt="img"/></span>
                                        </div>
                                        <input type="text" class="form-control" v-model="product.barcode" aria-describedby="restock level">
                                        
                                      </div>
                                    </div>   
                                  </div>
                                  
                                  
                                </div>
                                <div class="col-md-3">
                                  <div class="text-center" @click="addFiles()" style="width:80%;height:70%;border:1px dashed grey">
                                    <img :src="product.image" class="mb-2" style="width:70%;height:70%;margin-top:30px"/>
                                    <p>Upload product image</p>
                                  </div>
                                  <row md="12">
                                      <input id="productUpload" ref="fileInputs" type="file" @change="fileChanges()" hidden>
                                      
                                      <!-- <button class="btn btn-warning btn-block" @click="addFiles()">Select Image</button> -->
                                      
                                      
                                  </row>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-warning" @click="createProduct()" data-dismiss="modal" v-if="distributor">Add Product</button>
                              <button type="submit" class="btn btn-warning" @click="createRetailerProduct()" data-dismiss="modal" v-if="!distributor">Add Product</button>
                            </div>
                          </div>
                        </div>
                      </div>





                       


    <div class="modal fade" id="search" tabindex="-1" role="dialog" aria-labelledby="user" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="wrap-login100 pt-4 p-l-60"> 
                                <!-- <span class="login100-form-title p-b-33">Search with date range</span> -->
                                  <div class="row">
                                    <div class="col-md-5">
                                      <div class="input-group">
                                        <span class="input-group-text" id="basic-addon3">From</span>
                                          <input type="date" v-model="start_date" class="form-control"/>
                                      </div>
                                    </div>
                                      <div class="col-md-5">
                                        <div class="input-group">
                                          <span class="input-group-text" id="basic-addon3">To</span>
                                          <input type="date" v-model="end_date" class="form-control"/>
                                        </div>
                                      </div>
                                      <div class="col-md-1">
                                         <button @click="showDate()" data-dismiss="modal" class="btn btn-dangwarninger bt-sm btn-block"><i class="fa fa-search"></i></button>
                                         
                                      </div>
                                      <div class="col-md-1">
                                        
                                         <button data-dismiss="modal" class="btn btn-dangwarninger bt-sm btn-block">X</button>
                                      </div>
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
             <Loading v-if="!local_product.length && loading"></Loading>
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./Product.js">
</script>

<style scoped>
  @import url("./Product.css");
</style>