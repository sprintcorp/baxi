<template>
    <div>
        <div class="container p-2 mt-5 mb-5" style="background-color: white;min-height:80vh;overflow:none">
        
            <div class="col-md-12" style="margin-top:40px;min-height:20vh;overflow:hidden;right: 0;">
                <!-- <pre>{{cart}}</pre> -->
                <div class="bg-warning"><h4 class="m-0 p-2">
                    <i class="fa fa-shopping-cart"></i>
                    Cart 
                </h4></div>
              <div class="" style="width:100%">
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
                           <td width="200">{{product.name}}</td>
                           <td width="40"> {{product.qty}} </td>
                           <td width="100">₦{{numberWithCommas(product.int_amount)}}.00</td>
                           <td width="100">₦{{numberWithCommas(product.int_amount * product.qty)}}.00</td>
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
                        <button class="btn btn-success col-md-4" data-toggle="modal" style="font-size: 14px;" data-target="#modeofpaymentModal" v-if="cart.length < 1" disabled>Proceed <span class="fa fa-check"></span></button>
                        <button class="btn btn-success col-md-4" data-toggle="modal" style="font-size: 14px;" data-target="#modeofpaymentModal" v-if="cart.length > 0">Proceed <span class="fa fa-check"></span></button>

                          <div class="col-md-6 pull-right text-right">
                            <button class="btn btn-warning" style="margin:2px;font-size: 14px;" data-toggle="modal" data-target="#saveInfo" v-if="cart.length < 1" disabled>Save <span class="fa fa-save"></span></button>
                            <button class="btn btn-warning" style="margin:2px;font-size: 14px;" data-toggle="modal" data-target="#saveInfo" v-if="cart.length > 0">Save <span class="fa fa-save"></span></button>
                            <button class="btn btn-danger" style="margin:2px;font-size: 14px;" @click="removeCart()">Clear <span class="fa fa-times"></span></button>
                          </div>
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

<Loading v-if="saving"></Loading>
    
    </div>
</template>

<script src="./Cart.js">
</script>

<style scoped>
    @import url('./Cart.css');
</style>