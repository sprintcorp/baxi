<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="container-fluid p-2 mt-5" style="background-color: white;min-height:80vh;overflow:none">
        <div class="heading-sec">
          <!-- Retailer header -->
          <div class="row p-5" v-if="change_outlet">
            <div class="col-md-8" style="">   
                  <div class="heading-profile">
                    <h2 class="text-black">
                      Welcome back, <span class="text-black">{{ username }}!</span>

                        <span v-if="distributor && notification_info" style="font-size:16px;font-weight:bold;color:#fff;background-color:#681b1b;padding:2px 4px;border-radius:5px;margin-left:10px;"> <router-link :to="{name:'distributorOrders'}" style="color:#fff">{{notification_info}} pending orders</router-link></span>
                    </h2>
                  </div>             
            </div>
            <div class="col-md-4" style="" v-if="!distributor">   
                  <div class="input-group">
                    <span class="input-group-text bg-white" style="border:1px solid white;color:black">Select Outlet</span>
                    <select v-model='selected_outlet' @change="changeOutlet($event)" class="form-control">
                      <!-- <option>Select outlet</option> -->
                      <option v-for="(outlet,index) in outlets" :key="index" :value="outlet.id">{{outlet.name}}</option>
                    </select>
                  </div>            
            </div>
          </div>
          <!-- End of Retailer Header -->


          <!-- Cashier Header -->
          <div class="row p-5" v-if="!change_outlet">
            <div class="col-md-5" style="">   
                  <div class="heading-profile">
                    <h2 class="text-black">
                     Welcome back, <span class="text-black">{{ username }}!</span> 
                    </h2>
                  </div>             
            </div>
            <div class="col-md-7 d-flex justify-content-end" style="">   
                <input type="text" v-model="search" v-on:input="myChangeFunction()" placeholder="Type to search for a product" class="inp" style="background-color:white;width:91%;"/>
                <button type="submit"><i class="fa fa-search"></i></button>      
            </div>
          </div>
          <!-- End of Cashier -->

          <div class="row" v-if="change_outlet" style="margin-top:-30px">
            <div class="col-md-12 d-flex justify-content-center">
             <!-- <form class="form-inline search-form my-2 my-lg-0" style="width:90%"> -->
                    <input type="text" v-model="search" placeholder="Type to search for a product" class="inp" style="background-color:white;width:91%;"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
              <!-- </form> -->
            </div>
          </div>

          <div class="row p-5" style="margin-top:-30px">
            <div class="col-md-2 col-sm-2" @click="goBack()"><i class="fa fa-arrow-left fs-20"></i></div>
            <div class="col-md-7 col-sm-7">
              <!-- <button @click="removeCart()">clear</button> -->
            </div>
            <!-- <div class="col-md-1 col-sm-2" style="margin-right:-30px"><i class="fa fa-shopping-cart fs-20"></i></div> -->
            <div class="col-md-3 col-sm-3 d-flex justify-content-end">
              <select class="form-control" @change="getResponse()" v-model="type" aria-label="Default select example">
                <option value="product">View Products</option>
                <option value="category">View Categories</option>
              </select>
            </div>
          </div>
            <!-- <pre>{{filerResult}}</pre> -->
          <div class="row">
           
            <div :class="[!show_cat ?  'col-md-12' : 'col-md-8']">
                        <div class="col-md-12" v-if="results.length && !loading">
                            <div class="row p-3" v-if="cat" style="background-color:#dee2e645;margin-top:-20px">
                                <div class="col-md-2" v-for="(category,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'categoryVendor',params: { id: category.id }}"> -->
                                    <div class="card p-2" style="height:13rem;background-color:#ffc107;border:0px;width:12rem" @click="getCategoryProduct(category.product_id)">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="card-body">
                                        <div class="text-center mt-3"><img :src="category.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="text-center">
                                           <p class="fs-14 text-white"> {{category.name}}</p>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>

                            <div class="row pr-3 pb-3" v-if="!cat && !distributor" style="background-color:#d6d6d6;margin-top:-20px">
                                <div :class="[show_cat ? 'col-md-3' : 'col-md-2']" v-for="(product,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'categoryVendor',params: { id: category.id }}"> -->
                                    <div class="card p-1" style="height:15rem;width:100%">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                      <div class="card-body">
                                       <div class="row d-flex justify-content-center" style="height:15%;">
                                           <h6 class="fs-13 m-0" style="font-weight:bold !important"> {{product.name.length > 20 ? product.name.substr(0, 20)+'...' : product.name}}</h6>
                                        </div>
                                       <div class="row d-flex justify-content-center"> <h6 class="fs-10" style="font-weight:bold !important"> {{product.size}}</h6></div>
                                        <div class="row" style="height:50%;margin-top:-5px">
                                          <div class="col-md-12">
                                            <div class="text-center mt-1"><img :src="product.public_image_url" class="rounded-circle" alt="" style="height:80px"/></div>
                                          </div>                                        
                                        </div>
                                        <div class="row" style="margin-top:-5px"> 
                                          <div class="col-md-12 d-flex justify-content-center"> 
                                           <p class="fs-13"> {{product.quantity}} units left</p>
                                          </div>
                                        </div>
                                        <div class="row" style="margin-top:-20px">  
                                          <div class="col-md-12 d-flex justify-content-center">
                                           <h5 class="fs-15"> &#8358; {{ numberWithCommas(product.sell_price) }}.00</h5>
                                          </div>
                                        </div>
                                        <button v-if="permission && product.quantity > 0" class="btn btn-warning btn-block" @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">Sell</button>
                                        <button v-if="!permission" class="btn btn-warning btn-block" @click="warning('You are not permitted to execute this action')">Sell</button>
                                        <button v-if="permission && product.quantity < 1" class="btn btn-warning btn-block" @click="warning('The following item(s) are now out-of-stock. Click the restock button to continue.')">Sell</button>
                                    </div>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>



                            <div class="row pr-3 pb-3" v-if="!cat && distributor" style="background-color:#d6d6d6;margin-top:-20px">
                                <div :class="[show_cat ? 'col-md-3' : 'col-md-2']" v-for="(product,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'categoryVendor',params: { id: category.id }}"> -->
                                    <div class="card p-1" style="margin:10px;height:15rem;width:100%">
                                        <div class="card-body">
                                            <div class="row d-flex justify-content-center" style="height:15%;">
                                                <h6 class="fs-13 m-0" style="font-weight:bold !important"> {{product.name.length > 20 ? product.name.substr(0, 20)+'...' : product.name}}</h6></div>
                                       <div class="row d-flex justify-content-center"> <h6 class="fs-10" style="font-weight:bold !important"> {{product.size}}</h6></div>
                                        <div class="row" style="height:50%;">
                                          <div class="col-md-12">
                                            <div class="text-center"><img :src="product.public_image_url" class="rounded-circle" alt="" style="height:80px"/></div>
                                          </div>
                                        </div>
                                        <div class="row" style="margin-top:-5px">
                                          <div class="col-md-12 d-flex justify-content-center">
                                           <p class="fs-13"> {{product.quantity}} units left</p>
                                          </div>
                                        </div>
                                        <div class="row" style="margin-top:-20px">  
                                          <div class="col-md-12 d-flex justify-content-center">
                                           <h5 class="fs-15"> &#8358; {{ numberWithCommas(product.sell_price) }}.00</h5>
                                          </div>
                                        </div>
                                        <button v-if="permission && product.quantity > 0" class="btn btn-warning btn-block" @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">Sell</button>
                                        <button v-if="!permission" class="btn btn-warning btn-block" @click="warning('You are not permitted to execute this action')">Sell</button>
                                        <button v-if="permission && product.quantity < 1" class="btn btn-warning btn-block" @click="warning('The following item(s) are now out-of-stock. Click the restock button to continue.')">Sell</button>
                                    </div>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>

                        </div>

                        <div class="row col-md-12">
                          <div class="overlay" v-if="saving">
                                <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                    <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                    Processing Order...
                                </div>
                            </div>
                            <!-- <div v-if="!results.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div> -->
                            <Loading v-if="loading"></Loading>
                            
                            <div class="card" v-if="!filerResult.length && !loading && search.length > 0">
                                <div class="card-body text-center">
                                    There are no response with your search words at the moment
                                </div>
                            </div>
                            <div class="card" v-if="!results.length && !loading && search.length < 1">
                                <div class="card-body text-center">
                                    There are no products at the moment
                                </div>
                            </div>
                        </div>
            </div>


            <!-- Add Cart -->
                        <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content" style="width:450px !important;">
                                    <div class="row text-center">
                                        <div class="col-md-12 mt-4">
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to order?</div>
                                        </div>
                                    </div>
                                    <button type="button" class="close-modal" data-dismiss="modal"><img :src="require('@/assets/icon/noun_cancel_2014884.png')" class='rounded' alt="img"/></button>
                                    
                                <div class="modal-body" style="margin-top:-65px">
                                     <div class="row card border-0">
                                        <div class="text-center"><img :src="product.public_image_url" width="200" height="200"/></div>
                                        <div class="fs-15 mt-2 h5 text-center">{{product.name}} ({{product.size}})</div>
                                        <div class="fs-15 mt-1 h5 text-center">&#8358; {{ numberWithCommas(product.sell_price) }}.00</div>
                                        <div class="fs-13 text-center">{{ product.quantity }} Units Left</div>
                                        <!-- <div class="fs-13 text-center" v-if="distributor">Minimum order quantity {{ product.minimum_order }}</div> -->
                                        <div class="fs-15 mt-1 mb-1 text-center">Select Quantity</div>
                                        <div class="row">
                                            <div class="col-md-12 d-flex justify-content-end">
                                                <div class="input-group mb-1">
                                                    <input type="button" @click="decrease(product.quantity)" v-if="distributor" value="-" class="button-minus" data-field="quantity">
                                                    <input type="number" v-if="distributor" step="1" :max="product.quantity" :min="product.minimum_order" :value="quantity_value" name="quantity" @change="changes()" class="quantity-field">


                                                    <input type="button" v-if="!distributor" @click="decrease(product.quantity)" value="-" class="button-minus" data-field="quantity">
                                                    <input type="number" v-if="!distributor" step="1" max=""  :value="quantity_value" name="quantity" @change="changes()" class="quantity-field">
                                                    <input type="button" @click="increase(product.quantity)" value="+" class="button-plus" data-field="quantity">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fs-15 mt-5 mb-1 text-center" style="color:red" v-if="error">Selected quantity is more than available quantity</div>
                                    </div>
                                    

                                   
                                    
                                </div>
                                <div class="row pb-3 d-flex justify-content-center">
                                    <button type="button" :class="quantity_value > 0 && !error ? 'btn btn-warning mr-3' : 'btn btn-warning mr-3 disabled'" data-dismiss="modal" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    <!-- <button type="button" class="btn btn-light" style="border-radius:20px;color:red" data-dismiss="modal">CLOSE</button>                                     -->
                                </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of Add Cart -->

            <div class="col-md-4" v-if="show_cat" style="margin-top:-20px;min-height:20vh;overflow:hidden;right: 0;">
                <div class="bg-warning"><h4 class="m-0 p-2">
                    <i class="fa fa-shopping-cart"></i>
                    Cart
                </h4></div>
              <div class="bg-dark" style="width:100%">
                  <table class="table table-dark">
                    <thead class="">
                        <tr>
                        <th scope="">Product</th>
                        <th scope="">QTY</th>
                        <th scope="">Unit(₦)</th>
                        <th scope="">Price</th>
                        <th scope="" width="100"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, i) in cart" :key='i'>
                           <td width="50">{{product.name}}</td>
                           <td> {{product.qty}} </td>
                           <td>₦{{numberWithCommas(product.int_amount)}}.00</td>
                           <td>₦{{numberWithCommas(product.int_amount * product.qty)}}.00</td>
                           <td width="100">                             

                              <button class="text-white h4" @click="increaseCart(cart,i)">+</button>
                              <button class="text-white h4" @click="decreaseCart(cart,i)">-</button>
                              <button @click="removeFromCart(cart,i)">
                                <i class="fa fa-trash" style="color:white"></i>
                              </button>
                            </td>
                         </tr>
                        <br>


                         <tr>
                           <td>VAT</td>
                           <!-- <td></td> -->
                           <td></td>
                           <td></td>
                           <td>₦{{total_with_vat}}.00</td>
                         </tr>
                        <tr>
                           <td>Total</td>
                           <!-- <td></td> -->
                           <td>{{total_product}}</td>
                           <td>{{cart.length}}</td>
                           <td>₦{{numberWithCommas(total)}}.00</td>
                         </tr>
                         
                    </tbody>
                    </table>
                    <div class="row">
                      <div class="col-md-12 m-1" style="font-size: 10px;">
                        <button class="btn btn-success col-md-4" data-toggle="modal" style="font-size: 14px;" data-target="#modeofpaymentModal">Proceed <span class="fa fa-check"></span></button>

                          <div class="col-md-6 pull-right text-right">
                            <button class="btn btn-warning" style="margin:2px;font-size: 14px;" data-toggle="modal" data-target="#saveInfo">Save <span class="fa fa-save"></span></button>
                            <button class="btn btn-danger" style="margin:2px;font-size: 14px;" @click="removeCart()">Clear <span class="fa fa-times"></span></button>
                          </div>
                      </div>
                    </div>
                </div>
            </div>



          <div class="modal fade" id="customerInfo" tabindex="-1" role="dialog" aria-labelledby="customerInfo" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title font-weight-bold"> Customer information <em>(optional)</em></h6>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                
                <div class="modal-body row">
                  <!-- <div class="row"> -->
                    <div class="col-md-6">
                      <input type="name" v-model="customer.firstname" placeholder="Firstname" class="form-control">
                    </div>
                    <div class="col-md-6">
                      <input type="name" v-model="customer.lastname" placeholder="Lastname" class="form-control">
                    </div>
                  <!-- </div> -->
                  <!-- <div class="row"> -->
                    <div class="col-md-12 mt-3">
                      <input type="text " v-model="customer.phone" placeholder="Phone" class="form-control">
                    </div>
                    
                  <!-- </div> -->
                  <!-- <div class="row"> -->
                    <div class="col-md-12 mt-3">
                      <input type="email " v-model="customer.email" placeholder="Email" class="form-control">
                    </div>
                  <!-- </div> -->
                  <div class="col-md-12 d-flex justify-content-end mt-2 mb-1">
                    
                    <!-- <button class="btn btn-default mr-3" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">Skip</button> -->
                    <button class="btn btn-warning" @click="saveOrder('cash')" data-dismiss="modal">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>






          <div class="modal fade" id="saveInfo" tabindex="-1" role="dialog" aria-labelledby="saveInfo" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <div class="modal-title font-weight-bold">
                      <h6><strong>Customer information</strong> <em>(required)</em></h6>
                  </div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                
                <div class="modal-body">
                    <form action="#" @submit.prevent="saveOrder('',1)">
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <input type="text" v-model="customer.baxi_username" placeholder="customer username" class="form-control">
                            </div>
                        </div>


                        <div class="row">
                            <small class="col-md-12 mt-3 text-danger"><em>Required without username</em></small>
                            <!-- <div class="row"> -->
                            <div class="col-md-6">
                              <input type="name" v-bind:required="customer.baxi_username==''" v-model="customer.firstname" placeholder="Firstname *" class="form-control">
                            </div>
                            <div class="col-md-6">
                              <input type="name" v-model="customer.lastname" placeholder="Lastname" class="form-control">
                            </div>
                          <!-- </div> -->
                          <!-- <div class="row"> -->
                            <div class="col-md-6 mt-3">
                              <input type="text " v-model="customer.phone" placeholder="Phone" class="form-control">
                            </div>

                          <!-- </div> -->
                          <!-- <div class="row"> -->
                            <div class="col-md-6 mt-3">
                              <input type="email " v-model="customer.email" placeholder="Email" class="form-control">
                            </div>
                          <!-- </div> -->
                        </div>

                      <div class="col-md-12 d-flex justify-content-end mt-2 mb-1">
                        <button type="submit" class="btn btn-warning">Save</button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>



  <div class="modal fade" id="modeofpaymentModal" tabindex="-1" role="dialog" aria-labelledby="modeofpaymentModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title font-weight-bold"> Pick a payment method</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body row">
        <div class="col-md-3 payment-method-card" data-toggle="modal" data-target="#optionModal" data-dismiss="modal">
          <div class="card m-1 h-100 p-0">
              <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img8.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center" style="padding: 0 !important;color:#ccc;">
                   <div class="nav-link">
                       <span class="d-block">Wallet</span>
                       <small><em></em></small>
                     </div> 
                </div>
          </div>
        </div>

          <div class="col-md-3 payment-method-card">
              <div class="card m-1 h-100 p-0">
                  <div class="mx-auto mt-1">
                      <img :src="require('@/assets/images/img9.png')" class='rounded' alt="img"/>
                  </div>
                  <div class="card-body text-center" style="padding: 0 !important;color:#ccc;">
                      <div class="nav-link">
                          <span class="d-block">Baxi POS</span>
                          <small><em>Coming Soon...</em></small>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-md-3 payment-method-card">
              <div class="card m-1 h-100 p-0">
                  <div class="mx-auto mt-1">
                      <img :src="require('@/assets/images/img9.png')" class='rounded' alt="img"/>
                  </div>
                  <div class="card-body text-center" style="padding: 0 !important;color:#ccc;">
                      <div class="nav-link">
                          <span class="d-block">Other POS</span>
                          <small><em>Coming Soon...</em></small>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-md-3 payment-method-card" data-toggle="modal" data-target="#customerInfo"  data-dismiss="modal">
          <div class="card m-1 h-100 p-0">
             <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img12.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center" style="padding: 0 !important;">
                    <div class="nav-link">
                        <span class="d-block">Cash</span>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="optionModal" tabindex="-1" role="dialog" aria-labelledby="optionModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button class="btn btn-outline-secondary rounded-pill">Wallet to wallet</button>
        <button type="button" class="" data-dismiss="" aria-label="">
          <span aria-hidden="true" class="text-primary mt-3" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">&leftarrow; Back to payment methods</span>
        </button>
      </div>

      <div class="modal-body text-center text-dark">
          <div v-if="awaitingCustomerWalletResponse">
              <div v-if="customerWalletResponse===null">
                <span class="fs-20 m-auto d-block w-75 font-weight-bold" style="border-radius: 550px;">
    <!--                <i class="fa fa-spinner fa-pulse fa-fw"></i>-->
                    &nbsp; Awaiting Customer Response...
                    <br>Please wait
                </span>

                  <button class="btn btn-sm btn-success mt-2 mr-4 w-25" @click="performPingRequest"><i class="fa fa-search"></i> Check</button>
                  <button class="btn btn-sm btn-warning mt-2 w-25" data-dismiss="modal"><i class="fa fa-times"></i> Check Later</button>
              </div>

            <span class="text-danger fs-20 m-auto d-block w-75 font-weight-bold" style="border-radius: 550px;" v-if="customerWalletResponse===false">
                <i class="fa fa-times"></i>
                &nbsp; Customer declined payment
            </span>

              <div v-if="customerWalletResponse===true">
                <span class="text-success fs-20 m-auto d-block w-75 font-weight-bold" style="border-radius: 550px;" >
                    <i class="fa fa-check"></i>
                    &nbsp; Customer confirmed payment
                </span>

                <button class="btn btn-sm btn-success mt-2" data-dismiss="modal">Done</button>
            </div>
          </div>

          <div v-if="!awaitingCustomerWalletResponse">
              <div class="col-md-12 mt-3">
                  <input type="text" v-model="customer.baxi_username" placeholder="Baxi Username" class="form-control">
              </div>
              <!-- <button class="btn btn-outline-secondary rounded-pill">Account ID: RST12345</button> <br> -->
              <button class="btn btn-warning rounded-pill mt-4" @click="saveOrder('wallet')">Continue</button>
          </div>
      </div>

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
  @import url("./Dashboard.css");
</style>
