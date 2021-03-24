<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container-fluid">
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
                            <div class="col-md-12" v-if="transaction_tab">
                                <div class="row border-2 mt-1">
                                  <div class="col-md-1 mt-2 font-weight-bold" style="">
                                    <!-- {{distributor}} -->
                                    <router-link :to="{name:'transactionOverview'}" class="top-text-block" v-if="!distributor" style="color:black;text-decoration:none">Complete</router-link>
                                    
                                    
                                    <router-link :to="{name:'distributorSalesTransaction'}" v-if="distributor" class="top-text-block" style="color:black;text-decoration:none">Sales Transaction</router-link>
                                  </div>

                                  <!-- <pre>{{filterTransactions}}</pre> -->
                                  
                                    <div class="col-md-2 mt-2 font-weight-bold" v-if="distributor" style="margin-left:-30px">                                      
                                      <span class="link-line">Order Transaction</span>
                                      <!-- <router-link :to="{name:'distributorSalesTransaction'}" v-if="!distributor" class="top-text-block" style="color:black;text-decoration:none">Incomplete Transactions</router-link> -->
                                    </div>
                                    <div class="col-md-2 mt-2 font-weight-bold" v-if="!distributor"> 
                                      <span class="link-line" >Incomplete</span>
                                    </div>
                                  
                                  <div class="col-md-4 d-flex justify-content-end">
                                     <input type="text" v-model="search" placeholder="Search for transaction type" class="inp" style="background-color:white;width:91%;"/>
                                  </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/> Filter by transaction: From last 30 days
                                    </button>
                                  </div>
                                </div>
                                  <div class="row">

                                  <div :class="show_receipt ? 'col-md-9' : 'col-md-12'">

                                  <div class="table-responsive mt-5" v-if="transactions.length && !loading && !distributor">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Transaction Ref</th>
                                        <th>Payment Type</th>
                                        <th>Customer</th>
                                        <th v-if="!show_receipt">Status</th>
                                        <th v-if="!show_receipt">Outlet name</th> 
                                        <th>Transaction date</th>
                                        <th>No of items</th>
                                        <th>Amount</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr style="text-align:center" v-for="(transaction,index) in filterTransactions" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>{{ transaction.order_group_id }}</td>
                                        <td>{{ transaction.payment_type ? transaction.payment_type.toUpperCase() : 'PENDING' }}</td>

                                        <td v-if="transaction.customer &&
                                                transaction.customer.customer.user_id">
                                          {{ transaction.customer.customer.user.buid }}
                                        </td>

                                          <!-- <td v-if="transaction.customer && !transaction.customer.customer.user_id"> -->
                                            <td>
                                              {{
                                              transaction.customer ? transaction.customer.customer.firstname+' '+transaction.customer.customer.lastname : 'No info'}}<br>
                                              <span v-if="transaction.customer && transaction.customer.customer.phone">{{transaction.customer.customer.phone}}</span>
                                          </td>

                                        <td >
                                            <span v-if="transaction.paid==0" class="text-muted">Pending</span>
                                            <span v-if="transaction.paid==-1" class="text-danger">Declined</span>
                                        </td>
                                        <!-- <td v-else class="text-danger">Not Paid</td> -->
                                        <td v-if="!show_receipt">{{transaction.outlet.name}}</td>
                                        <td>
                                          {{transaction.created_at | moment("ddd, Do MMMM 'YY, h:mma") }}
                                        </td>
                                        <td>{{transaction.orders.length}}</td>
                                        <td>&#8358; {{numberWithCommas(transaction.amount)}}</td>
                                        <td>
                                          <button type="button" @click="showTransaction(transaction)" class="btn btn-warning text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
                                  </div>

                                  <!-- {{transactions}} -->
                                  <div class="table-responsive mt-5" v-if="transactions.length && !loading && distributor">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Transaction Ref</th>
                                        <th>Type</th>
                                        <th>No of Items</th>
                                        <th>Amount</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr style="text-align:center" v-for="(transaction,index) in distributorTransactions" :key="index">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>{{ transaction.order_group_id }}</td>
                                        <td>{{ transaction.delivery_type }}</td>
                                        <td>
                                          {{transaction.created_at | moment("ddd, Do MMMM 'YY, h:mma") }}
                                        </td>
                                        <td>{{transaction.orders.length}}</td>
                                        <td>&#8358; {{numberWithCommas(transaction.amount)}}</td>
                                        <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="showTransaction(transaction)" class="btn btn-warning text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageTransaction(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
                                  </div>
                                
                                  </div> 

                                  <div class="col-md-3 mt-3 p-3" v-if="show_receipt"> 
                                   <div class="row">
                                     <div class="col-md-10">
                                       <span>Receipt</span>
                                     </div>
                                      <div class="col-md-2">
                                       <button @click="closeReceipt()">X</button>
                                     </div>
                                   </div>
                                   <div class="row mt-5 p-3" style="background-color:#fbfbfb">
                                     <!-- <pre>{{transaction_product.orders}}</pre> -->

                                     <div class="col-md-3  d-flex justify-content-start"><img :src="require('@/assets/baxi.png')" width="30"></div><br>
                                     <div class="col-md-9  d-flex justify-content-end">{{titleCase(outlet_name)}}</div>
                                    <div class="col-md-12 mt-2">Transaction Ref:</div>
                                    <div class="col-md-12 h4 mt-1" style="color:grey">{{transaction_product.orders[0].group_id}}</div>
                                    <div class="col-md-12 mt-1" style="color:grey"> {{transaction_product.orders[0].created_at | moment("ddd, Do MMMM 'YY, h:mma") }}</div>

                                   </div>
                                   <div class="row">
                                    <table class="table table-borderless caption-top">
                                      <thead>
                                      
                                        <tr style="text-align:center">
                                          <th scope="col">Product</th>
                                          <th scope="col">QTY</th>                                        
                                          <!-- <th scope="col">Price</th> -->
                                          <th scope="col" width="100">Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                                                    
                                        <tr style="text-align:center" v-for="(product,index) in transaction_product.orders" :key="index">
                                          <td>{{product.outlet_product.product.name}}</td>
                                          <td scope="row">{{product.qty}}</td>
                                          <!-- <td scope="row">{{product.amount / product.qty}}</td> -->
                                          <td scope="row">&#8358; {{numberWithCommas(product.amount)}}</td>
                                          
                                          <td>{{status}}</td>
                                        </tr>
                                        
                                      </tbody>
                                    </table>
                                     <div class="col-md-12 d-flex justify-content-center mt-2">Grand Total</div>
                                     <div class="col-md-12 h5 d-flex justify-content-center mt-2"> &#8358; {{numberWithCommas(transaction_product.amount)}}</div>

                                     <h4 class="text-center m-auto">
                                         <span v-if="transaction_product.paid==0" class="text-muted">Not Paid</span>
                                         <span v-if="transaction_product.paid==1" class="text-success">Paid</span>
                                         <span v-if="transaction_product.paid==-1" class="text-danger">Declined</span>
                                     </h4>



                                     <div class="col-md-12 h5 d-flex justify-content-center mt-5">
                                       <div>
                                           <button @click="performPingRequest(transaction_product.order_group_id)" v-if="!transaction_product.paid" class="btn btn-primary mr-2">Check</button>
                                       
                                            <button v-if="!transaction_product.paid && !distributor" type="button" class="btn btn-success mr-2" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">Pay Now</button>
                                            <button type="button" v-if="!distributor"  class="btn btn-dark" @click="printReceipt(transaction_product.orders)">Print</button>
                                        </div>
                                     </div>
                                     <div class="col-md-12 mt-3 d-flex justify-content-center"><p>Powered by baxi</p></div><br>
                                     
                                   </div>
                                  </div> 

                                </div>

                                <!-- <div class="mt-5" v-if="!transactions.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div> -->
                                <Loading v-if="!transactions.length && loading || saving">Loading...</Loading>
                                <div class="card mt-5" v-if="!transactions.length && !loading">
                                  <div class="card-body text-center">
                                    There are no transaction for this outlet at the moment
                                  </div>
                                </div>
                                <!-- </div> -->
                            </div>

                            



                            </div>
                        </section>

                      <div class="modal fade" id="order" tabindex="-1" aria-labelledby="order" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Transaction Information</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table class="table caption-top">
                                    <thead>
                                      <tr style="text-align:center">
                                        <th scope="col">#</th>
                                        <th scope="col"></th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">SKU</th>
                                        <th scope="col">Quantity</th>
                                        
                                        <th scope="col">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr style="text-align:center" v-for="(product,index) in transaction_product.orders" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <th scope="row"><img :src="product.outlet_product.product.public_image_url" height="50"/></th>
                                        <td>{{product.outlet_product.product.name}}</td>
                                        <td>&#8358; {{numberWithCommas(product.amount/product.qty)}}</td>
                                        <td>{{product.outlet_product.product.size?product.outlet_product.product.size:''}}</td>
                                        <td>{{product.outlet_product.product.sku?product.outlet_product.product.sku:''}}</td>
                                        <td>{{product.qty}}</td>
                                        <td>&#8358; {{numberWithCommas(product.amount)}}</td>
                                      </tr>
                                             
                                    </tbody>
                                  </table>
                            </div>
                            <div class="modal-footer">
                              <button v-if="!transaction_product.paid && !distributor" type="button" class="btn btn-success" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">Pay Now</button>
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                               <button type="button" v-if="!distributor"  class="btn btn-primary" @click="printReceipt(transaction_product.orders)">Print</button>
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

                              <div class="col-md-3 payment-method-card" @click="saveOrder('cash')" data-dismiss="modal">
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
                                <div v-if="customerWalletResponse===null">
                                  <span class="fs-20 m-auto d-block w-75 font-weight-bold" style="border-radius: 550px;">
                      <!--                <i class="fa fa-spinner fa-pulse fa-fw"></i>-->
                                      &nbsp; Awaiting Customer Response...
                                      <br>Please wait
                                  </span>

                                  <button class="btn btn-sm btn-warning mt-2 mr-4" @click="performPingRequest">Recheck</button>

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
                          </div>
                        </div>
                      </div>


                      <div class="modal fade" tabindex="-1" aria-hidden="true" id="printMe">
                        <div class="row p-5" style="width:500px">
                           <div class="col-md-12  d-flex justify-content-center"><img :src="require('@/assets/baxi.png')" width="50"></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h4>{{titleCase(business_name)}} Store</h4></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h5>Outlet : {{titleCase(outlet_name)}}</h5></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h6>Tran Ref {{transaction_product.order_group_id}}</h6></div><br>
                           <div v-if="transaction_product.trans_ref" class="col-md-12 mt-3 d-flex justify-content-center"><h6>Receipt</h6></div><br>
                           <!-- <div class="row"> -->
                            <div class="col-md-7 mt-3 d-flex justify-content-start"><h6>Date : {{current_date}}</h6></div>
                            <div class="col-md-5 mt-3 d-flex justify-content-start"><h6>Time : {{current_time}}</h6></div>
                            <div class="col-md-12 mt-5 d-flex justify-content-center"><h6>Purchase Details</h6></div>
                           <!-- </div> -->
                        
                          <table class="table caption-top">
                                      <thead>
                                      
                                        <tr style="text-align:center">
                                          <th scope="col">Product</th>
                                          <th scope="col">QTY</th>                                        
                                          <th scope="col">Price</th>
                                          <th scope="col">Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                                                    
                                        <tr style="text-align:center" v-for="(product,index) in transaction_product.orders" :key="index">
                                          <td>{{product.outlet_product.product.name}}</td>
                                          <td scope="row">{{product.qty}}</td>
                                          <td scope="row">{{product.amount / product.qty}}</td>
                                          <td scope="row">{{product.amount}}</td>
                                          
                                          <td>{{status}}</td>
                                        </tr>
                                        <tr style="">
                                          <td>Total</td>
                                          <th scope="row"></th>
                                          <th scope="row"></th>
                                          <!-- <th scope="row">{{transaction_product.amount}}</th> -->
                                          
                                          <td class="font-weight-bold"  width="100">&#8358; {{numberWithCommas(transaction_product.amount)}}</td>
                                        </tr>
                                      </tbody>
                          </table>
                          <div class="col-md-12 mt-2 d-flex justify-content-center"><h6>{{transaction_product.payment_type}} transaction</h6></div><br>
                          <div class="col-md-12 mt-5 d-flex justify-content-center"><p>Terms & Conditions Apply</p></div><br>
                          <div class="col-md-12 d-flex justify-content-center"><p>No refund of money after payment</p></div><br>
                          <div class="col-md-12 d-flex justify-content-center"><p><b>Thank you for your patronage</b></p></div><br>
                          <div class="col-md-7 mt-3 d-flex justify-content-start"><p>Sales Officer:</p></div>
                            <div class="col-md-5 mt-3 d-flex justify-content-start"><p>{{business_name}}</p></div>
                            <div class="col-md-12 mt-3 d-flex justify-content-center"><p>Powered by baxi</p></div><br>
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
<script src="./Transaction.js">
</script>

<style scoped>
  @import url('./Transaction.css');
</style>