<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container-fluid" style="">
                <div class="heading-sec">
                      <div class="mt-5">
                        <h4>Order Dashboard</h4>
                      </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-3" style="margin-right:0px">
                            <div class="card" style="width: 16rem;">
                              <div class="card-body">
                                <p class="card-subtitle mb-2 text-muted">Total orders received</p>
                                
                                <h3 class="">{{information.total_orders_received}}</h3>
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
                                <p class="card-subtitle mb-2 text-muted">Total orders pending</p>
                                
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
                          
                        
                          <section class="panel-content">
                            <h4>Order History</h4>
                            <div class="row">
                              
                              <div class="col-md-12" v-if="order_tab">
                                  <div class="row border-2 mt-1 top-table p-2">
                                    <div class="col-md-4 mt-2 font-weight-bold"> Orders</div>
                                    <div class="col-md-3 d-flex justify-content-end">
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
                                    <div class="col-md-5 d-flex justify-content-end">
                                      <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                        <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/> Filter by orders: From last 30 days
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
                                          <th>Items</th>
                                          <th>Retailer</th>
                                          <th>Type</th>
                                          <th>Date</th>
                                          <th>View</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr v-for="(order,index) in filterTransactions" :key="index">
                                          <td>{{  index + 1 }}</td>
                                          <td>{{ order.order_group_id }}</td>
                                          <td>{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':order.status == 3?'Fulfilled':order.status == 4 ?'Delivered':order.status == 5?'Cancelled':'Declined'}}</td>                                      
                                          <td>&#8358; {{numberWithCommas(order.amount) }}</td>
                                          <td>{{order.orders.length }}</td>
                                          <td>{{order.retailer.buid}}</td>
                                          <td>{{order.delivery_type}}</td>
                                          <td>
                                              {{order.created_at | moment("ddd, Do MMMM 'YY, h:mma") }}
                                          </td>
                                          <td>
                                            <button data-toggle="modal" data-target="#order" type="button" @click="showOrder(order)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                          </td>
                                        </tr>
                                        </tbody>
                                      
                                      </table>
                                      <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrder(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrder(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrder(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageOrder(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
                                      
                                    </div>
                                    

                                  </div>
                                  <div class="overlay" v-if="saving">
                                  <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                      <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                      Processing Order...
                                  </div>
                              </div>
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
                        </div>

                        <div class="modal fade" id="order" data-bs-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">{{order_product.retailer ? order_product.retailer.buid:''}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive mt-5">
                                        <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Product name</th>
                                            <th>Size</th>
                                            <th>Quantity</th>                                        
                                            <th>Barcode</th>
                                            <th>SKU</th>
                                            <th>Image</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr v-for="(order,index) in order_product.orders" :key="index">
                                            <td>{{  index + 1 }}</td>
                                            <td>{{order.business_product.product.name ? order.business_product.product.name:'' }}</td>
                                            <td>{{order.business_product.product.size ? order.business_product.product.size:''}}</td>
                                            <td>{{order.qty ? order.qty:'' }}</td>
                                            <td>{{order.business_product.product.barcode ?order.business_product.product.barcode:'Not Available' }}</td>
                                            <td>{{order.business_product.product.sku ? order.business_product.product.sku : 'Not Available'}}</td>
                                            <td><img :src="order.business_product.product.public_image_url ? order.business_product.product.public_image_url : ''" width="40" height="40"></td>

                                        </tr>
                                        </tbody>
                                        
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer" v-if="status == 0">
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-dismiss="modal" data-target="#reject">Decline</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" data-target="#accept">Accept</button>
                                </div>
                                <div class="modal-footer" v-if="status == 1">
                                    <button type="button" class="btn btn-success">Retailer is yet to respond to order</button>
                                </div>
                                <div class="modal-footer" v-if="status == 2">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" @click="confirmOrder(3)">Fulfilled</button>
                                </div>
                                <div class="modal-footer" v-if="status == 3">
                                    <button type="button" class="btn btn-success">Awaiting Retailer Confirmation</button>
                                </div>
                                </div>
                            </div>
                        </div>



                        <div class="modal fade" id="accept" data-bs-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="staticBackdropLabel">Accept {{order_product.retailer ? order_product.retailer.buid:''}} Order</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="row d-flex justify-content-end mr-1" v-if="add_fee">
                                        <button class="btn btn-warning" @click="addRow">Add Fee</button>
                                    </div>
                                    <div class="row" v-for="(applied_fee,index) in applied_fees" :key="index">
                                    <!-- <div class="row"> -->
                                        <div class="col-md-6">
                                            <label class="form-label">Fee name</label>
                                            <input type="text" class="form-control" v-model="applied_fee.name" aria-describedby="quantity">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Amount</label>
                                            <input type="text" class="form-control"  v-model="applied_fee.amount" aria-describedby="restock level">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Comment (optional)</label>
                                        <textarea class="form-control" v-model="comment" rows="3"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Other information (optional)</label>
                                        <textarea class="form-control" v-model="other_info" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <!-- <button type="button" class="btn btn-danger">Decline</button> -->
                                    <button type="button" class="btn btn-warning" @click="confirmOrder(1)" data-dismiss="modal">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>



                        <div class="modal fade" id="reject" data-bs-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="staticBackdropLabel">Reject {{order_product.retailer ? order_product.retailer.buid:''}} Order</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                     <!-- <div class="row">
                                        <div class="col-md-6">
                                            <label class="form-label">Name</label>
                                            <input type="text" class="form-control" v-model="applied_fee.name" aria-describedby="quantity">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Amount</label>
                                            <input type="text" class="form-control"  v-model="applied_fee.amount" aria-describedby="restock level">
                                        </div>
                                    </div> -->
                                    <div class="mb-3">
                                        <label class="form-label">Comment (optional)</label>
                                        <textarea class="form-control" v-model="comment" rows="3"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Other information (optional)</label>
                                        <textarea class="form-control" v-model="other_info" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <!-- <button type="button" class="btn btn-danger">Decline</button> -->
                                    <button type="button" class="btn btn-warning" @click="confirmOrder(-1)" data-dismiss="modal">Save</button>
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
<script src="./Order.js">
</script>

<style scoped>
  @import url("./Order.css");
</style>