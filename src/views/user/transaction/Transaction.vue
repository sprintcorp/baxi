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
                                  <div class="col-md-2 mt-2 font-weight-bold" style="">
                                    <!-- {{distributor}} -->
                                    <span class="link-line" v-if="!distributor">Complete Transaction</span>
                                    
                                    <router-link :to="{name:'distributorSalesTransaction'}" v-if="distributor" class="top-text-block" style="color:black;text-decoration:none">
                                      <small style="font-weight:bold">Sales Transaction</small></router-link>
                                  </div>

                                  <!-- <pre>{{filterTransactions}}</pre> -->
                                  
                                    <div class="col-md-2 mt-2 font-weight-bold" v-if="distributor" style="margin-left:-30px">                                      
                                      <small class="link-line" style="font-weight:bold">Order Transaction</small>
                                      <!-- <router-link :to="{name:'distributorSalesTransaction'}" v-if="!distributor" class="top-text-block" style="color:black;text-decoration:none">Incomplete Transactions</router-link> -->
                                    </div>
                                    <div class="col-md-2 mt-2 font-weight-bold" v-if="!distributor"> 
                                      <router-link :to="{name:'incompleteTransaction'}" class="top-text-block" style="color:black;text-decoration:none">Incomplete Transaction</router-link>
                                    </div>
                                  
                                  <div class="col-md-4 d-flex justify-content-end">
                                     <input type="text" v-model="search" placeholder="Search for transaction ref" class="inp" style="background-color:white;width:91%;"/>
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
                                        <td v-if="transaction.customer_id && transaction.customer">
                                          {{!transaction.customer.user ? transaction.customer.firstname+' '+transaction.customer.lastname: transaction.customer.user.buid}}<br>
                                          <span v-if="transaction.customer && transaction.customer.phone">{{transaction.customer.phone}} </span>
                                        </td>
                                        <td v-if="!transaction.customer">
                                          No Info
                                        </td>

                                        <!-- <td>
                                          {{transaction.customer.customer.user.buid}}
                                        </td> -->
                                        
                                        <td v-if="transaction.paid && !show_receipt" class="text-success">Paid</td>
                                        <!-- <td v-else class="text-danger">Not Paid</td> -->
                                        <td v-if="!show_receipt">{{transaction.outlet.name}}</td>
                                        <td>
                                          {{transaction.created_at | moment("ddd, Do MMMM 'YY, h:mma") }}
                                        </td>
                                        <td>{{transaction.orders.length}}</td>
                                        <td>&#8358; {{numberWithCommas(transaction.amount)}}</td>
                                        <td>
                                          <button type="button" @click="showTransaction(transaction)" class="btn btn-warning btn-sm text-white"><i class="fa fa-eye"></i></button>
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
                                        <th>Delivery Type</th>
                                        <th>Date</th>
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
                                          <!-- <button data-toggle="modal" data-target="#order" type="button" @click="showTransaction(transaction)" class="btn btn-warning text-white"><i class="fa fa-eye"></i></button> -->
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
                                
                                  </div> 

                                  <div class="col-md-3 m-0 p-3" v-if="show_receipt">
                                      <div class="col-md-12 shadow">
                                          <div class="row bg-warning">
                                              <div class="col-md-10"><span>Receipt</span></div>
                                              <div class="col-md-2 text-right"><button @click="closeReceipt()">x</button></div>
                                          </div>

                                          <div class="row mt-4 p-0" style="background-color:#fbfbfb">
                                              <div class="col-md-6 fs-12" v-if="distributor">
                                                  From:<br>
                                                  <span style="font-family: sans-serif;font-weight: bold">
                                                       {{ transaction_product.business.name }}
                                                   </span>
                                              </div>

                                              <div class="col-md-6 fs-12">
                                                  <span v-if="distributor">To</span>
                                                  <span v-if="!distributor">From</span>
                                                  :<br>
                                                  <span style="font-family: sans-serif;font-weight: bold">
                                                       {{ transaction_product.outlet.name }}
                                                   </span>
                                              </div>
                                            <div class="clearfix"></div>
<!--                                              <hr class="m-0 w-100 border-warning">-->

                                              <!--                                     <div class="col-md-9 d-flex justify-content-end">{{titleCase(outlet_name)}}-->
                                              <!--                                     </div>-->


                                              <div class="col-md-12 mt-4 fs-14">Transaction Ref:</div>
                                              <div class="col-md-12 h5 mt-0" style="color:grey">{{transaction_product.orders[0].group_id}}</div>

                                              <div class="col-md-12 mt-2 fs-14">Date/Time:</div>
                                              <div class="col-md-12 h5 mt-0" style="color:grey;font-size:16px;">{{transaction_product.orders[0].created_at | moment("ddd, Do MMMM YYYY, h:mma") }}</div>
                                          </div>

                                          <div class="row mt-4">
                                              <table class="table table-border caption-top">
                                                  <thead>

                                                  <tr style="text-align:center;background-color: #333;color:#fff;">
                                                      <th scope="col">Product</th>
                                                      <th scope="col">QTY</th>
                                                      <th scope="col">Total</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody>

                                                  <tr style="text-align:center" v-for="(product,index) in transaction_product.orders" :key="index">
                                                      <td v-if="!distributor" class="fs-14">{{product.outlet_product.product.name}}</td>
                                                      <td v-if="distributor" class="fs-14">{{product.business_product.product.name}}</td>
                                                      <td class="fs-14">{{product.qty}}</td>
                                                      <td class="fs-14" width="120px">&#8358; {{numberWithCommas(product.amount)}}.00</td>

<!--                                                      <td>{{status}}</td>-->
                                                  </tr>

                                                  </tbody>
                                              </table>

                                              <hr class="w-100 mb-2 mt-0">

                                              <div class="col-md-12" v-if="transaction_product.applied_fees && transaction_product.applied_fees.length">
                                                  <div class="row" v-for="fee in transaction_product.applied_fees" :key="fee.id">
                                                      <span style="font-family: sans-serif" class="col-md-6 fs-14 text-center" ><strong>{{ fee.name }}</strong></span>

                                                      <span class="col-md-6 text-right fs-14" >&#8358;{{ fee.amount.toLocaleString() }}.00</span>
                                                  </div>
                                              </div>

                                              <div class="col-md-12 d-flex justify-content-center mt-2">Grand Total</div>

                                              <div v-if="distributor" class="col-md-12 h5 d-flex justify-content-center mt-2"> &#8358; {{numberWithCommas(transaction_product.total_amount)}}.00</div>

                                              <div v-if="!distributor" class="col-md-12 h5 d-flex justify-content-center mt-2"> &#8358; {{numberWithCommas(transaction_product.amount)}}.00</div>

                                              <div class="col-md-12 h5 d-flex justify-content-center mt-5">
                                                  <button v-if="!transaction_product.paid && !distributor" type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">Pay Now</button>
                                                  <button type="button" class="btn btn-sm btn-dark mr-2" @click="printReceipt(transaction_product.orders)"><i class="fa fa-print"></i> Print</button>
                                                  <button type="button" class="btn btn-sm btn-warning" @click="generateReport()"><i class="fa fa-download"></i> Download</button>
                                              </div>
                                              <div class="col-md-12 mt-3 d-flex justify-content-center">
                                                  <p>Powered by <img :src="require('@/assets/baxi.png')" width="25">
                                                  </p>
                                              </div>

                                          </div>
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






                      <div v-if="transactions.length" class="modal fade" id="modeofpaymentModal" tabindex="-1" role="dialog" aria-labelledby="modeofpaymentModal" aria-hidden="true">
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
                      <div v-if="transactions.length" class="modal fade" id="optionModal" tabindex="-1" role="dialog" aria-labelledby="optionModal" aria-hidden="true">
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

                                  <button class="btn btn-sm btn-warning mt-2 w-25" @click="performPingRequest">Recheck</button>
                                    <button class="btn btn-sm btn-danger mt-2 w-25" data-dismiss="modal" @click="clearWalletCheckInterval(this.walletCheckInterval)"><i class="fa fa-times"></i> Check Later</button>
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


                  <div v-if="transactions.length && show_receipt" class="modal fade" tabindex="-1" style="margin-top:-1000px" aria-hidden="true" id="printMe">
                      <vue-html2pdf
                        :show-layout="true"
                        :float-layout="true"
                        :enable-download="true"
                        :preview-modal="true"
                        :paginate-elements-by-height="500"
                        filename="baxi_receipt"
                        :pdf-quality="2"
                        :manual-pagination="false"
                        pdf-format="a5"
                        pdf-orientation="portrait"
                        pdf-content-width="500px"
                        @progress="onProgress($event)"
                        @hasStartedGeneration="hasStartedGeneration()"
                        @hasGenerated="hasGenerated($event)"
                        ref="html2Pdf"
                    >
                      <section slot="pdf-content">
                        <div class="row pl-5">
                           <div class="col-md-12 text-center mb-3"><img :src="require('@/assets/baxi.png')" style="height:50px"></div>

                                <div class="col-md-6 fs-14" v-if="transaction_product.business">
                                    From:<br>
                                    <span style="font-family: sans-serif;font-weight: bold">
                                       {{ transaction_product.business.name }}
                                   </span>
                                </div>

                                <div class="col-md-6 fs-14">
                                    To:<br>
                                    <span style="font-family: sans-serif;font-weight: bold">
                                       {{ transaction_product.outlet.name }}
                                   </span>
                                </div>
                            <div class="clearfix mb-5"></div>

                            <div class="col-md-6 fs-14">
                                Date:<br>
                                <span style="font-family: sans-serif;font-weight: bold">
                                   {{ current_date }} {{current_time}}
                               </span>
                            </div>

                            <div class="col-md-6 fs-14">
                                Transaction Ref:<br>
                                <span style="font-family: sans-serif;font-weight: bold">
                                   {{ transaction_product.order_group_id }}
                               </span>
                            </div>
                            <div class="clearfix"></div>


                            <div class="col-md-12 mt-5 d-flex justify-content-center"><h6>Purchase Details</h6></div>
                           <!-- </div> -->

                          <table class="table caption-top">
                              <thead>

                                <tr style="text-align:center;font-weight: bold;font-family: sans-serif">
                                  <th scope="col">Product</th>
                                  <th scope="col">QTY</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Total</th>
                                </tr>
                              </thead>
                              <tbody>

                                <tr style="text-align:center" v-for="(product,index) in transaction_product.orders" :key="index">
                                  <td v-if="distributor">{{product.business_product.product.name}}</td>
                                  <td v-if="!distributor">{{product.outlet_product.product.name}}</td>
                                  <td scope="row">{{product.qty}}</td>
                                  <td v-if="!distributor" scope="row">&#8358;{{product.outlet_product.price.toLocaleString()}}.00</td>

                                  <td v-if="distributor" scope="row">&#8358;{{product.business_product.pack_price.toLocaleString()}}.00</td>

                                  <td scope="row">&#8358;{{parseInt(product.amount).toLocaleString()}}.00</td>

<!--                                          <td>{{status}}</td>-->
                                </tr>
                              </tbody>
                              <tfoot v-if="transaction_product.applied_fees && transaction_product.applied_fees.length">
                              <tr v-for="fee in transaction_product.applied_fees" :key="fee.id">
                                  <td style="font-family: sans-serif" class="text-center"><strong>{{ fee.name }}</strong></td>
                                  <td class="font-weight-bold text-right" colspan="3">&#8358;{{ fee.amount.toLocaleString() }}.00</td>
                              </tr>
                              </tfoot>
                          </table>

                        <div class="clearfix"></div>
                        <hr>
                        <div style="font-family: sans-serif" class="w-50 pull-left pl-5"><strong>TOTAL</strong></div>

                        <div v-if="distributor" class="font-weight-bold text-right w-50 pull-left pr-3">&#8358; {{transaction_product.total_amount.toLocaleString()}}.00</div>

                        <div v-if="!distributor" class="font-weight-bold text-right w-50 pull-left pr-3">&#8358; {{transaction_product.amount.toLocaleString()}}.00</div>
                        </div>

                          <div class="clearfix"></div>


                          <div class="mt-2 d-flex justify-content-center" v-if="!this.distributor"><h6>{{transaction_product.payment_type}} transaction</h6></div><br>
                          <div class="col-md-12 mt-2 d-flex justify-content-center" v-if="this.distributor"><h6>Delivery type: {{transaction_product.delivery_type}}</h6></div><br>

                          <div class="col-md-12 mt-3 text-center"><p>Terms & Conditions Apply <br> No refund of money after payment <br><strong>Thank you for your patronage</strong></p></div><br>
                          <div class="col-md-5 mt-2 d-flex justify-content-start"><p>Sales Officer:</p></div>
                            <div class="col-md-5 mt-2 d-flex justify-content-start"><p>{{user}}</p></div>
                            <div class="col-md-12 mt-2 d-flex justify-content-center"><p>Powered by Baxi</p></div><br>
                      </section>
                    </vue-html2pdf>


                  </div>

                



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
<script src="./Transaction.js">
</script>

<style scoped>
  @import url('./Transaction.css');
</style>