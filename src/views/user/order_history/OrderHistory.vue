<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container" style="">
                <div class="heading-sec">
                    <div class="row">
                         

                            <!-- <div class="row mt-5">
                              <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                  <button @click="changeTab()" class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                    Transactions
                                  </button>
                                  <button @click="changeTab()" class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                                    Transaction tracker
                                  </button>
                                  
                                </div>
                              </nav>
                            </div> -->
                        

                        <section class="panel-content">
                          <div class="row">
                            <div class="col-md-12" v-if="order_tab">
                                <div class="row border-2 mt-1">
                                  <div class="col-md-4 mt-2 font-weight-bold"> Orders</div>
                                  <div class="col-md-4">
                                    
                                  </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <i class="fa fa-search"></i> Filter by orders: From last 30 days
                                    </button>
                                  </div>
                                </div>
                                  <div class="row">
                                  <div class="table-responsive mt-5" v-if="orders.length && !loading">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr>
                                        <th>S/N</th>
                                        <th>Order ref</th>
                                        <th>Status</th>
                                        <th>Amount</th>                                        
                                        <!-- <th>Distributor</th> -->
                                        <!-- <th>Amount</th> -->
                                        <th>Date</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(order,index) in filerTransactions" :key="index">
                                        <td>{{  index + 1 }}</td>
                                        <td>{{ order.group_id }}</td>
                                        <td>{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':order.status == 3?'Delivered':'Rejected'}}</td>                                      
                                        <td>{{numberWithCommas(order.amount) }}</td>
                                        <!-- <td>{{order.business}}</td> -->
                                        <td>{{order.created_at}}</td>
                                        <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="showOrder(order)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    
                                  </div>
                                   

                                </div>

                                <div class="mt-5" v-if="!orders.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div>
                                <div class="card mt-5" v-if="!orders.length && !loading">
                                  <div class="card-body text-center">
                                    There are no orders made at the moment
                                  </div>
                                </div>
                                <!-- </div> -->
                            </div>

                            <div class="col-md-12" v-if="!order_tab">
                              <div class="row mt- mb-3">
                              <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                  <button @click="changeTab()" class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                   <i class="fa fa-arrow-left fs-20"></i>
                                  </button>                                  
                                </div>
                              </nav>
                            </div>
                              <div class="row  top-section">
                                <div class="col-md-12 p-3">
                                  Transaction tracker
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
                                  <div class=""> {{order_product.group_id}} </div>
                                </div>
                                
                                <div class="col-md-2">
                                  <div class=""> Date Placed: </div>
                                  <div class=""> {{order_product.created_at}} </div>
                                </div>
                                
                                <!-- <div class="col-md-2">
                                  <div class=""> Payment mode: </div>
                                  <div class=""> {{}} </div>
                                </div> -->

                              </div>

                              <div class="row ml-3 p-5">
                                <div class="col-md-4">
                                  <h4>Order Details.</h4>
                                  <table class="table caption-top">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{{1}}</th>
                                        <td>{{order_product.product.name}}</td>
                                        <td>{{numberWithCommas(order_product.product.recommended_price)}}</td>
                                        <td>{{order_product.qty}}</td>
                                        <td>{{order_product.amount}}</td>
                                      </tr>
                                                                   
                                      <tr v-if="order_product.status != 0">
                                        <td>Delivery</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        
                                        <td>{{numberWithCommas(delivery)}}</td>
                                      </tr>
                                      <tr>
                                        <td>Total</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        
                                        <td class="font-weight-bold">{{numberWithCommas(parseFloat(order_product.amount) + delivery)}}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-7 mt-1">
                                  <div class="row mt-5 fs-25">
                                    Delivery Date
                                  </div>
                                  <div class="row fs-50" v-if="order_product.seen != 0">
                                    Arrives Jan 10
                                  </div>
                                  <div class="row fs-25" v-if="order_product.seen == 0">
                                    Date will be updated when order is accepted by merchant
                                  </div>
                                  <!-- <div class="row"> -->
                                    <!-- {{order_product.status}} {{order_product.seen}} -->
                                    <div class="progress">
                                      <div :class="[progress, color, status]" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  <!-- </div> -->
                                  <div class="row mt-5 ml-5" v-if="!hide">
                                    <div class="col-md-3">Pending</div>
                                    <div class="col-md-3">Order Accepted</div>
                                    <div class="col-md-3">Processing</div>
                                    <div class="col-md-3">Delivered</div>
                                  </div>
                                  <div class="row mt-5 ml-5" v-if="hide">
                                    <div class="col-md-12 d-flex justify-content-center">Order Rejected</div>
                                  </div>
                                  <div class="form-check mt-3">
                                    <input class="form-check-input" type="checkbox" value="" @change="updateStatus()">
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Check if item order has been delivered
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                        </section>




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
<script src="./OrderHistory.js">
</script>

<style scoped>
  @import url('./OrderHistory.css');
</style>