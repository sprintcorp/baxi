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
                              <div class="row mb-4">
                                <div class="col-md-3" style="margin-right:0px">
                                  <div class="card" style="width: 16rem;">
                                    <div class="card-body">
                                      <p class="card-subtitle mb-2 text-muted">Total orders accepted</p>
                                      
                                      <h3 class="">{{information.total_orders_accepted}}</h3>
                                      <div class="progress-bar bg-warning" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3" style="margin-right:0px">
                                  <div class="card" style="width: 16rem;">
                                    <div class="card-body">
                                      <p class="card-subtitle mb-2 text-muted">Total orders declined</p>
                                      
                                      <h3>{{information.total_orders_rejected}}</h3>
                                      <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3" style="margin-right:0px">
                                  <div class="card" style="width: 16rem;">
                                    <div class="card-body">
                                      <p class="card-subtitle mb-2 text-muted">Total pending orders</p>
                                      
                                      <h3>{{information.total_orders_pending}}</h3>
                                      <div class="progress-bar bg-success" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3" style="margin-right:0px">
                                  <div class="card" style="width: 16rem;">
                                    <div class="card-body">
                                      <p class="card-subtitle mb-2 text-muted">Total orders processing</p>
                                      
                                      <h3>{{information.total_orders_processing}}</h3>
                                      <div class="progress-bar bg-info" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                                <div class="row border-2 mt-1">
                                  <div class="col-md-4 mt-2 font-weight-bold"> Orders History</div>
                                  <!-- <div class="col-md-4"> -->
                                    <div class="col-md-4 d-flex justify-content-end">
                                      <select v-model="query" class="form-control" @change="getOrderStatus()" style="outline: none !important;">
                                          <!-- <option selected>Filter Orders</option> -->
                                          <option value="">All Orders</option>
                                          <option value="pending">Pending Orders</option>
                                          <option value="accepted">Accepted Orders</option>
                                          <option value="in_progress">Processing Orders</option>
                                          <option value="fulfilled">Fulfiled Orders</option>
                                          <option value="delivered">Delivered Orders</option>
                                          <option value="rejected">Declined Orders</option>
                                      </select>
                                    </div>
                                  <!-- </div> -->
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
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Order ref</th>
                                        <th>Status</th>
                                        <th>Amount</th>                                        
                                        <th>Distributor</th>
                                        <th>Items</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr style="text-align:center" v-for="(order,index) in orders" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>{{ order.order_group_id }}</td>
                                        <td v-if="order.delivery_type.toLowerCase() == 'delivery'">{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':order.status == 3?'Fulfilled':order.status == 4 ?'Delivered':order.status == 5?'Cancelled':'Declined'}}</td>                                      
                                        <td v-if="order.delivery_type.toLowerCase() == 'pickup'">{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':order.status == 3?'Processing':order.status == 4 ?'Delivered':order.status == 5?'Cancelled':'Declined'}}</td>                                      
                                        <td>₦{{numberWithCommas(order.amount) }}</td>
                                        <td>{{order.business.name}}</td>
                                        <td>{{order.orders.length}}</td>
                                        <td>{{order.delivery_type}}</td>
                                        <td>
                                          {{order.created_at | moment("ddd, Do MMMM 'YY, h:mma") }}
                                        </td>
                                        <td>
                                          <router-link :to="{name:'orderInformation',params: { id: order.order_group_id }}">
                                            <button class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                          </router-link>
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
                                <!-- <div class="mt-5" v-if="!orders.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div> -->
                                <Loading v-if="!orders.length && loading"></Loading>
                                <div class="card mt-5" v-if="!orders.length && !loading">
                                  <div class="card-body text-center">
                                    There are no orders made at the moment
                                  </div>
                                </div>
                              <!-- </div> -->
                            </div>

                            </div>
                        </section>




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
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./OrderHistory.js">
</script>

<style scoped>
  @import url('./OrderHistory.css');
</style>