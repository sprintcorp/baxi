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
                                        <th>Distributor</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(order,index) in filerTransactions" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>{{ order.order_group_id }}</td>
                                        <td>{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':order.status == 3?'Fulfilled':order.status == 4 ?'Delivered':order.status == 5?'Cancelled':'Declined'}}</td>                                      
                                        <td>{{numberWithCommas(order.amount) }}</td>
                                        <td>{{order.business.name}}</td>
                                        <td>{{order.orders.length}}</td>
                                        <td>{{order.created_at}}</td>
                                        <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="showOrder(order)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrders(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrders(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrders(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrders(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
                                    
                                  </div>
                                   

                                </div>

                              <!-- <div class="row col-md-12"> -->
                                <div class="overlay" v-if="saving">
                                    <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                        <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                        Updating Order...
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
                                  <div class=""> {{order_product.order_group_id}} </div>
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

                              <div class="row p-5">
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
                                      <tr v-for="(order,index) in order_product.orders" :key="index">
                                        <th scope="row">{{index + 1}}</th>
                                        <td>{{order.product.name}}</td>
                                        <td>{{order.amount/order.qty}}</td>
                                        <td>{{order.qty}}</td>
                                        <td>{{numberWithCommas(order.amount)}}</td>
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
                                      <tr v-if="order_product.status == 1">
                                        <td></td>
                                        <th scope="row"></th>
                                        
                                        <th scope="row"><button type="submit" class="btn btn-danger" @click="orderAction(-1)">Reject</button></th>
                                        <th scope="row"><button type="submit" class="btn btn-success" @click="orderAction(2)">Accept</button></th>
                                        <th scope="row"></th>
                                        
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-7 mt-1">
                                  <div class="row mt-5 fs-25" v-if="order_product.delivery_type.toLowerCase() == 'delivery' && order_product.status != 4">
                                    Delivery Date
                                  </div>
                                  <div class="row mt-5 fs-25" v-if="order_product.status == 4">
                                    Delivered
                                  </div>
                                  <div class="row fs-50" v-if="order_product.delivery_type.toLowerCase() == 'delivery'">
                                    {{new Date(order_product.delivery_date)}}
                                  </div>
                                  <div class="row fs-50" v-if="order_product.delivery_type.toLowerCase() == 'pickup' && order_product.status != 4 && order_product.status > 0">
                                    Pickup
                                  </div>
                                  <div class="row fs-50" v-if="order_product.status < 0">
                                    Order Rejected
                                  </div>
                                  <!-- <div class="row"> -->
                                    <!-- {{order_product.status}} {{order_product.seen}} -->
                                    <!-- {{order_product.status}}
                                    {{status}} -->
                                    <div class="progress">
                                      <div v-if="order_product.status == 1" class="progress-bar progress-bar-striped progress-bar-animated bg-info w-50" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 4" class="progress-bar progress-bar-striped progress-bar-animated bg-success w-100" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 0" class="progress-bar progress-bar-striped progress-bar-animated bg-warning w-25" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status < 0" class="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                      <div v-if="order_product.status == 2 || order_product.status == 3" class="progress-bar progress-bar-striped progress-bar-animated bg-info w-75" role="progressbar" aria-valuenow="status" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  <!-- </div> -->
                                  <div class="row mt-5 ml-5" v-if="order_product.status >= 0">
                                    <div class="col-md-3">Pending</div>
                                    <div class="col-md-3">Order Accepted</div>
                                    <div class="col-md-3">{{order_product.status == 3 ?'Fulfilled':'Processing'}}</div>
                                    <div class="col-md-3">Delivered</div>
                                  </div>
                                  <!-- <div class="row mt-5 ml-5" v-if="order_product.status < 0">
                                    <div class="col-md-12 d-flex justify-content-center">Order Rejected</div>
                                  </div> -->
                                  <div class="form-check mt-3" v-if="order_product.status == 3">
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