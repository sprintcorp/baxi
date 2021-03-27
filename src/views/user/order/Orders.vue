<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
           <div class="container" v-if="!loading">
                              <div class="row mt-4 mb-1">
                              <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                                    
                                </div>
                              </nav>
                              </div>
                              <div class="row  top-section">
                                <div class="col-md-9 p-3">
                                  Transaction tracker
                                </div>
                                <div class="col-md-3 d-flex justify-content-end">
                                  <router-link :to="{name:'productOrderOverview'}">
                                    <button class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                    <i class="fa fa-arrow-right fs-20"></i>
                                    </button>
                                  </router-link>
                                </div>
                              </div>
                              
                              <div class="row store-info pt-5 pl-3 mb-2">
                                <div class="col-md-3" style="">
                                  <div class=" pt-3 pb-1 pl-3 bg-white store-column"> <i class="fa fa-user fs-20 mr-2"></i> {{order_product.business.name}}</div>
                                </div>

                                <div class="col-md-">
                                  <div class=""> Contact number: </div>
                                  <div class=""> {{order_product.business.phone}} </div>
                                </div>
                                
                                <div class="col-md-2">
                                  <div class=""> Contact address: </div>
                                  <div class=""> {{order_product.business.address_city}} </div>
                                </div>
                                
                                <div class="col-md-2">
                                  <div class=""> Order Number: </div>
                                  <div class=""> {{order_product.order_group_id}} </div>
                                </div>
                                
                                <div class="col-md-2">
                                  <div class=""> Date Placed: </div>
                                  <div class=""> {{getDate(order_product.created_at)}} </div>
                                </div>
                                
                                <!-- <div class="col-md-2">
                                  <div class=""> Payment mode: </div>
                                  <div class=""> {{}} </div>
                                </div> -->

                              </div>

                              <div class="row p-5">
                                <div class="col-md-4">
                                  <h4>Order Details.</h4>
                                  <table class="table caption-top">
                                    <thead>
                                      <tr style="text-align:center">
                                        <th scope="col">#</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr style="text-align:center" v-for="(order,index) in order_product.orders" :key="index">
                                        <td class="col-3">{{index + 1}}</td>
                                        <td>{{order.business_product.product.name}}</td>
                                        <td>{{order.amount/order.qty}}</td>
                                        <td>{{order.qty}}</td>
                                        <td>₦{{numberWithCommas(order.amount)}}</td>
                                      </tr>
                                                                   
                                      <tr v-if="order_product.status != 0 && order_product.delivery_type.toLowerCase() == 'delivery'">
                                        <td>Delivery</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        
                                        <td>₦{{numberWithCommas(delivery)}}</td>
                                      </tr>
                                      <tr>
                                        <td>Total</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        
                                        <td class="font-weight-bold">₦{{order_product.total_amount ? numberWithCommas(parseFloat(order_product.total_amount)) : numberWithCommas(total)}}</td>
                                      </tr>
                                      <tr v-if="order_product.status == 1">
                                        <td></td>
                                        
                                        
                                        <th scope="row"><button type="submit" class="btn btn-danger" @click="orderAction(5)">Reject</button></th>
                                        <th scope="row"><button type="submit" class="btn btn-success" @click="orderAction(2)" style="z-index:999 !important">Accept</button></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col-md-2"></div>
                                <div class="col-md-6 mt-1">
                                  <div class="row mt-5 fs-25" v-if="order_product.delivery_type.toLowerCase() == 'delivery' && order_product.status != 4">
                                    Delivery Date
                                  </div>
                                  <div class="row mt-5 fs-25" v-if="order_product.status == 4">
                                    Delivered
                                  </div>
                                  <div class="row fs-50" v-if="order_product.delivery_type.toLowerCase() == 'delivery'">
                                    {{getDate(order_product.delivery_date)}}
                                  </div>
                                  <div class="row fs-50" v-if="order_product.delivery_type.toLowerCase() == 'pickup' && order_product.status != 4 && order_product.status != 5 && order_product.status >= 0">
                                    Pickup
                                  </div>
                                  <div class="row fs-50" v-if="order_product.status < 0">
                                    Order Rejected
                                  </div>
                                  <div class="row fs-50" v-if="order_product.status == 5">
                                    Order Canceled
                                  </div>
                                  <!-- <div class="row"> -->
                                    <!-- {{order_product.status}} {{order_product.seen}} -->
                                    <!-- {{order_product.status}}
                                    {{status}} -->
                                    <div class="progress">
                                      <div v-if="order_product.status == 1" class="progress-bar progress-bar-striped progress-bar-animated bg-info w-50" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 4" class="progress-bar progress-bar-striped progress-bar-animated bg-success w-100" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 0" class="progress-bar progress-bar-striped progress-bar-animated bg-warning w-25" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status < 0 || order_product.status == 5" class="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 2 || order_product.status == 3" class="progress-bar progress-bar-striped progress-bar-animated bg-info w-75" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  <!-- </div> -->
                                  <div class="row mt-5 ml-5" v-if="order_product.status >= 0 && order_product.status < 5">
                                    <div class="col-md-3">Pending</div>
                                    <div class="col-md-3">Order Accepted</div>
                                    <div class="col-md-3">{{order_product.status == 3 ?'Fulfilled':'Processing'}}</div>
                                    <div class="col-md-3">Delivered</div>
                                  </div>
                                  <!-- <div class="row mt-5 ml-5" v-if="order_product.status < 0">
                                    <div class="col-md-12 d-flex justify-content-center">Order Rejected</div>
                                  </div> -->
                                  <div class="form-check mt-3" v-if="order_product.status == 3">
                                    <input class="form-check-input" type="checkbox" value=""  @change="confirmDelivery(4)">
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Check if item order has been delivered
                                    </label>
                                  </div>
                                  <div class="form-check mt-3" v-if="order_product.status == 4">
                                    <input class="form-check-input" type="checkbox" value="" checked>
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Order received
                                    </label>
                                  </div>
                                </div>
                                
                              </div>
            </div>

            <Loading v-if="loading || saving"></Loading>
                          
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./Orders.js">
</script>

<style scoped>
</style>