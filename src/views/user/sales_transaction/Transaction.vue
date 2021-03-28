<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container-fluid" style="">
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
                            <div class="col-md-12">
                                <div class="row border-2 mt-1">
                                  <div class="col-md-2 mt-2 font-weight-bold" style="margin-left:-30px">
                                      <small class="link-line" style="font-weight:bold">Complete Sales Transaction</small>
                                  </div>
                                  <div class="col-md-2 mt-2 font-weight-bold" style="margin-left:-30px">
                                     <router-link :to="{name:'distributorSalesTransactionIncomplete'}" class="top-text-block" style="color:black;text-decoration:none">
                                        <small style="font-weight:bold">Incomplete Sales Transaction</small>
                                     </router-link>
                                  </div>

                                  <div class="col-md-2 mt-2 font-weight-bold" style="">
                                    <router-link :to="{name:'transactionOverview'}" class="top-text-block" style="color:black;text-decoration:none">                                   
                                     <small style="font-weight:bold">Order Transaction</small>
                                    </router-link>
                                  </div>



                                  <div class="col-md-3">
                                     <input type="text" v-model="search" placeholder="Search for transaction ref" class="inp" style="background-color:white;width:91%;"/>
                                  </div>
                                  <div class="col-md-3">
                                    <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/> Filter transaction: From last 30 days
                                    </button>
                                  </div>
                                </div>
                                  <div class="row">


                                <div :class="show_receipt ? 'col-md-9' : 'col-md-12'">
                                  <div class="table-responsive mt-5" v-if="transactions.length && !loading && distributor">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr style="text-align:center">
                                          <th>S/N</th>
                                          <th>Transaction Ref</th>
                                          <th>Payment Type</th>
                                          <th>Customer</th>
                                          <th>Status</th>
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
                                          <td v-if="transaction.customer_id">
                                              {{!transaction.customer.user ? transaction.customer.firstname+' '+transaction.customer.lastname: transaction.customer.user.buid}}<br>
                                              <span v-if="transaction.customer && transaction.customer.phone">{{transaction.customer.phone}} </span>
                                          </td>
                                          <td>{{ transaction.payment_type ? transaction.payment_type.toUpperCase() : 'PENDING' }}</td>

                                        <td>{{transaction.paid == 0 ? 'incomplete' : 'completed'}}</td>
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
                                    <div class="card mt-3 mb-3" v-if="!transactions.length && !loading">
                                      <div class="card-body text-center">
                                        There are no transaction for this outlet at the moment
                                      </div>
                                    </div>
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
                                      <div class="col-md-12 shadow">
                                          <div class="row bg-warning">
                                              <div class="col-md-10"><span>Receipt</span></div>
                                              <div class="col-md-2 text-right"><button @click="closeReceipt()">x</button></div>
                                          </div>



                                          <div class="row mt-4 p-0" style="background-color:#fbfbfb">
                                              <div class="col-md-6 fs-12" v-if="distributor">
                                                  From:<br>
                                                  <span style="font-family: sans-serif;font-weight: bold">
                                                       {{ transaction.business.name }}
                                                   </span>
                                              </div>
                                              <div class="clearfix"></div>
                                              <div class="col-md-12 mt-4 fs-14">Transaction Ref:</div>
                                              <div class="col-md-12 h5 mt-0" style="color:grey">{{transaction.orders[0].group_id}}</div>

                                              <div class="col-md-12 mt-2 fs-14">Date/Time:</div>
                                              <div class="col-md-12 h5 mt-0" style="color:grey;font-size:16px;">{{transaction.orders[0].created_at | moment("ddd, Do MMMM YYYY, h:mma") }}</div>
                                          </div>

                                        <div class="row mt-4">
                                          <table class="table table-borderl caption-top">
                                              <thead>

                                              <tr style="text-align:center;background-color: #333;color:#fff;">
                                                  <th scope="col">Product</th>
                                                  <th scope="col">QTY</th>
                                                  <th scope="col">Total</th>
                                              </tr>
                                              </thead>
                                              <tbody>

                                              <tr style="text-align:center" v-for="(product,index) in transaction.orders" :key="index">
                                                  <td v-if="!distributor" class="fs-14">{{product.outlet_product.product.name}}</td>
                                                  <td v-if="distributor" class="fs-14">{{product.business_product.product.name}}</td>
                                                  <td class="fs-14">{{product.qty}}</td>
                                                  <td class="fs-14" width="120px">&#8358; {{numberWithCommas(product.amount)}}.00</td>

                                                  <!--                                                      <td>{{status}}</td>-->
                                              </tr>

                                              </tbody>
                                          </table>


                                            <hr class="w-100 mb-2 mt-0">

                                            <div class="col-md-12" v-if="transaction.applied_fees && transaction.applied_fees.length">
                                                <div class="row" v-for="fee in transaction.applied_fees" :key="fee.id">
                                                    <span style="font-family: sans-serif" class="col-md-6 fs-14 text-center" ><strong>{{ fee.name }}</strong></span>

                                                    <span class="col-md-6 text-right fs-14" >&#8358;{{ fee.amount.toLocaleString() }}.00</span>
                                                </div>
                                            </div>


                                            <div class="col-md-12 d-flex justify-content-center mt-2">Grand Total</div>
                                          <div class="col-md-12 h5 d-flex justify-content-center mt-2"> &#8358; {{numberWithCommas(transaction.amount)}}.00</div>

                                            <div class="col-md-12 h5 d-flex justify-content-center mt-5">
                                                <button v-if="!transaction.paid && !distributor" type="button" class="btn btn-success" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">Pay Now</button>
                                                <button type="button" class="btn btn-dark mr-2" @click="printReceipt(transaction.orders)"><i class="fa fa-print"></i> Print</button>
                                                <button type="button" class="btn btn-warning" @click="generateReport()"><i class="fa fa-download"></i> Download</button>
                                            </div>
                                            <div class="col-md-12 mt-3 d-flex justify-content-center">
                                                <p>Powered by <img :src="require('@/assets/baxi.png')" width="25">
                                                </p>
                                            </div>

                                        </div>
                                  </div>
                                  </div>


                                </div>



                         

                              
                                <Loading v-if="!transactions.length && loading">Loading...</Loading>
                                
                            </div>

                            <div class="card mt-5" v-if="!transactions.length && !loading">
                                  <div class="card-body text-center">
                                    There are no sales transaction at the moment
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


                         <div class="modal fade" tabindex="-1" aria-hidden="true" id="printMe">

                      <vue-html2pdf
                        :show-layout="false"
                        :float-layout="true"
                        :enable-download="true"
                        :preview-modal="true"
                        :paginate-elements-by-height="1200"
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
                        <div class="row pl-5" style="width:500px;">
                           <div class="col-md-12  d-flex justify-content-center"><img :src="require('@/assets/baxi.png')" width="50"></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h4>{{titleCase(outlet_name)}} Store</h4></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h5>Outlet : {{titleCase(outlet_name)}}</h5></div><br>
                           <div class="col-md-12  d-flex justify-content-center"><h6>Tran Ref {{transaction.order_group_id}}</h6></div><br>
                           <div v-if="transaction.trans_ref" class="col-md-12 mt-3 d-flex justify-content-center"><h6>Receipt</h6></div><br>
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
                                                                    
                                        <tr style="text-align:center" v-for="(product,index) in transaction.orders" :key="index">
                                          <td>{{product.business_product.product.name}}</td>
                                          <td scope="row">{{product.qty}}</td>
                                          <td scope="row">{{product.amount / product.qty}}</td>
                                          <td scope="row">{{product.amount}}</td>
                                          
                                          <td>{{status}}</td>
                                        </tr>
                                        <tr style="">
                                          <td>Total</td>
                                          <th scope="row"></th>
                                          <th scope="row"></th>
                                          <!-- <th scope="row">{{transaction.amount}}</th> -->
                                          
                                          <td class="font-weight-bold"  width="100">&#8358; {{numberWithCommas(transaction.amount)}}</td>
                                        </tr>
                                      </tbody>
                          </table>
                          <div class="col-md-12 mt-2 d-flex justify-content-center"><h6>{{transaction.payment_type}} transaction</h6></div><br>
                          <div class="col-md-12 mt-5 d-flex justify-content-center"><p>Terms & Conditions Apply</p></div><br>
                          <div class="col-md-12 d-flex justify-content-center"><p>No refund of money after payment</p></div><br>
                          <div class="col-md-12 d-flex justify-content-center"><p><b>Thank you for your patronage</b></p></div><br>
                          <div class="col-md-7 mt-2 d-flex justify-content-start"><p>Sales Officer:</p></div>
                            <div class="col-md-5 mt-2 d-flex justify-content-start"><p>{{name}}</p></div>
                            <div class="col-md-12 mt-2 d-flex justify-content-center"><p>Powered by baxi</p></div><br>
                        </div>
                      </section>
                    </vue-html2pdf>


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