<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container-fluid" style="">
                <div class="heading-sec">
                      <div class="mt-5">
                        <h4>Order Dashboard</h4>
                      </div>
                    <div class="row">
                      <div class="col-md-9">
                        <div class="row">
                          <div class="col-md-3" style="margin-right:0px">
                            <div class="card" style="width: 13rem;">
                              <div class="card-body">
                                <p class="card-subtitle mb-2 text-muted">Total orders received</p>
                                
                                <h3 class="">8,776,341</h3>
                                <div class="progress-bar bg-warning" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3" style="margin-right:0px">
                            <div class="card" style="width: 13rem;">
                              <div class="card-body">
                                <p class="card-subtitle mb-2 text-muted">Total orders declined</p>
                                
                                <h3>4,920</h3>
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3" style="margin-right:0px">
                            <div class="card" style="width: 13rem;">
                              <div class="card-body">
                                <p class="card-subtitle mb-2 text-muted">Total orders delivered</p>
                                
                                <h3>1,098</h3>
                                <div class="progress-bar bg-success" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3" style="margin-right:0px">
                            <div class="card" style="width: 14rem;">
                              <div class="card-body">
                                <p class="card-subtitle mb-2 text-muted">Total orders processing</p>
                                
                                <h3>8,776</h3>
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
                                      <!-- <select v-model="stats" class="form-control" @change="filerTransaction()" style="outline: none !important;">
                                          <option value="0">Pending Orders</option>
                                          <option value="1">Accepted Orders</option>
                                          <option value="2">Processing Orders</option>
                                          <option value="3">Delivered Orders</option>
                                      </select> -->
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

                                        <tr v-for="(order,index) in filerTransactions" :key="index">
                                          <td>{{  index + 1 }}</td>
                                          <td>{{ order.order_group_id }}</td>
                                          <td>{{order.status == 0?'Pending':order.status == 1?'Accepted':order.status == 2?'Processing':'Delivered'}}</td>                                      
                                          <td>&#8358; {{numberWithCommas(order.amount) }}</td>
                                          <td>{{order.orders.length }}</td>
                                          <td>{{order.retailer.buid}}</td>
                                          <td>{{order.delivery_type}}</td>
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

                        

                            </div>
                          </section>
                        </div>
                         <div class="col-md-3" style="">
                              <div class="row d-flex justify-content-end">
                                  <div class="font-weight-bold h4">Order Notifications</div>
                              </div>
                              <div class="mt-3 mb-3 ml-5">Today <i class="fa fa-angle-down"></i></div>
                              <div class="row mt-1 d-flex justify-content-end" v-for="(i,n) in 3" :key="n">
                                  <div class="col-md-2">
                                      <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                                  </div>
                                  <div class="col-md-8 mt-2">
                                      <h6>Request Accepted</h6>
                                      <p class="fs-10">View Transaction Details</p>
                                  </div>
                              </div>
                              <div class="mt-3 mb-3 ml-5">This Week <i class="fa fa-angle-down"></i></div>
                              <div class="row d-flex justify-content-end mt-1" v-for="(i,n) in 3" :key="n">
                                  <div class="col-md-2">
                                      <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                                  </div>
                                  <div class="col-md-8 mt-2">
                                      <h6>Request Accepted</h6>
                                      <p class="fs-10">View Transaction Details</p>
                                  </div>
                              </div>
                          </div>

                        <div class="modal fade" id="order" data-bs-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">{{order_product.retailer ? order_product.retailer.buid:''}}</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
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
                                            <td>{{order.product.name ? order.product.name:'' }}</td>
                                            <td>{{order.product.size ? order.product.size:''}}</td>                                      
                                            <td>{{order.qty ? order.qty:'' }}</td>
                                            <td>{{order.product.barcode ?order.product.barcode:'' }}</td>
                                            <td>{{order.product.sku ? order.product.sku : ''}}</td>
                                            <td><img :src="order.product.public_image_url ? order.product.public_image_url : ''" width="60"></td>
                                            
                                        </tr>
                                        </tbody>
                                        
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer" v-if="status == 0">
                                    <button type="button" class="btn btn-danger">Decline</button>
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" data-target="#accept">Accept</button>
                                </div>
                                <div class="modal-footer" v-if="status == 1">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" @click="confirmOrder(2)">Process Order</button>
                                </div>
                                <div class="modal-footer" v-if="status == 2">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" @click="confirmOrder(3)">Delivered</button>
                                </div>
                                </div>
                            </div>
                        </div>



                        <div class="modal fade" id="accept" data-bs-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center" id="staticBackdropLabel">Accept {{order_product.retailer ? order_product.retailer.buid:''}} Order</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row d-flex justify-content-end mr-1">
                                        <button class="btn btn-warning" @click="addRow">Add Charges</button>
                                    </div>
                                    <div class="row" v-for="(applied_fee,index) in applied_fees" :key="index">
                                        <div class="col-md-6">
                                            <label class="form-label">Name</label>
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