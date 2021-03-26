<template>
    <div>
        <div class="container-fluid mt-5" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-12" style=";">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">Restock Level</div>
                            <div class="p">Please these products are below restock level.</div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                        
                        </div>
                    </div>
                    <div class="row mt-3">
                        <!-- <div class="col-md-4" v-if="create_product">
                           <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                        </div> -->

                        <!-- <div class="col-md-7 d-flex justify-content-end">
                            <button @click="getCart()" class="btn btn-warning" style="border-radius:20px" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-shopping-cart"></i> Cart</button>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="vendor_products.length && !loading">
                            <div class="row mr-2">
                                <div class="col-md-4 d-flex justify-content-center" v-for="(product,index) in vendor_products" :key="index">
                                    <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                    <div class="card p-2" style="width: 25rem;height:8rem;border-radius:0px">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="row g-0">
                                        <div class="col-md-3 mt-2"><img :src="product.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="col-md-6 mt-2">
                                            <p class="fs-15 font-weight-bold text-black"> {{product.name.length > 20 ? product.name.substr(0, 20)+'...' : product.name}}</p>
                                            <p class="fs-14 font-weight-bold text-black" style="margin-top:-15px">Restock Level {{product.restock_level}} </p>
                                            <p class="fs-14 font-weight-bold text-black" style="margin-top:-15px">Outlet Quantity {{product.quantity}} </p>
                                        </div>
                                        <!-- <div class="col-md-3 mt-4">&#8358; {{ product.amount }}</div> -->
                                        <div class="col-md-2">
                                            <div class="mt-4">
                                                <button data-toggle="modal" @click="editRetailerProduct(product)" data-target="#updateQuantity">
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- </router-link> -->
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
                                      <label class="form-label">Quantity</label>
                                      <input type="text" class="form-control" v-model="retailer_product.qty" aria-describedby="quantity">
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label">Restock Level</label>
                                      <input type="text" class="form-control"  v-model="retailer_product.restock_level" aria-describedby="restock level">
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

                        </div>

                        <!-- Add Cart -->
                        <!-- <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="card rounded-circle text-center p-3" style="width:6rem;height:6rem;margin-top:-50px;background-color:#ffc107;border:0px">
                                        <i class="fa fa-shopping-cart" style="font-size:50px"></i>
                                    </div>
                                    <div class="row text-center">
                                        <div class="col-md-12">
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to cart?</div>                                        
                                        </div>
                                    </div>
                                    
                                <div class="modal-body" style="margin-top:-30px">
                                     <div class="row card border-0">
                                        <div class="text-center"><img :src="product.image" width="100" height="100"/></div>
                                        <div class="fs-15 mt-2 text-center">{{product.name}}</div>
                                        <div class="fs-15 mt-1 text-center">&#8358; {{ product.amount }}</div>
                                        <div class="fs-15 mt-1 text-center">{{ product.qty }} Quantity</div>
                                        <div class="fs-15 mt-3 mb-1 text-center">Select Quantity</div>
                                        <div class="row d-flex justify-content-center">
                                            <div class="col-md-2">
                                                <button class="btn btn-danger" @click="decrease(product.qty)"><i class="fa fa-minus"></i></button>
                                            </div>
                                            <div class="col-md-2"><input type="text" :value="quantity_value" style="width:50px" @change="changes()"></div>
                                            
                                            <div class="col-md-2"><button class="btn btn-success" @click="increase(product.qty)"><i class="fa fa-plus"></i></button></div>
                                        </div>
                                        <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="error">Selected quantity is more than available quantity</div>
                                    </div>
                                    

                                   
                                    
                                </div>
                                <div class="row p-5 d-flex justify-content-center">
                                    <button type="button" class="btn btn-warning mr-3" v-if="quantity_value > 0 && !error" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    <button type="button" class="btn btn-light" style="border-radius:20px;color:red" data-dismiss="modal">CLOSE</button>                                    
                                </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- End of Add Cart -->


                        <div class="row col-md-12">
                            <div class="overlay" v-if="saving">
                                <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                    <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                    Saving Product...
                                </div>
                            </div>
                            <!-- <div v-if="!vendor_products.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                
                                Loading...
                                                    
                            </div> -->
                            <Loading v-if="!vendor_products.length && loading"></Loading>
                            <div class="card" v-if="!vendor_products.length && !loading">
                                <div class="card-body text-center">
                                    There are no products low in stock at the moment
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-1"></div> -->
                
            </div> 


        </div>
    </div>
</template>


<style scoped>
.overlay {
	position: fixed;
	display: block;
	width: 100%;
	height: 100%;
	top: 10%;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0.5,0.5);
	z-index: 2;
	cursor: pointer;
	text-align:center;
  }
</style>

<script src="./RestockLevel.js">

</script>