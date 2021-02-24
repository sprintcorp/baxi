<template>
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
                                  <div class="col-md-4 mt-2 font-weight-bold"> Wallet History</div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                     <!-- <input type="text" v-model="search" placeholder="Search for transaction type" class="inp" style="background-color:white;width:91%;"/> -->
                                  </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/> Filter by wallet: From last 30 days
                                    </button>
                                  </div>
                                  <!-- {{distributor}} -->
                                </div>
                                  <div class="row">
                                  <div class="table-responsive mt-5" v-if="wallets.length && !loading">
                                    <table class="table table-striped" v-if="!distributor">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Balance before debit</th>
                                        <th>Balance after debit</th>
                                        <th>Amount debited</th>
                                        <th>Outlet</th> 
                                        <th>Number of products</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(wallet,index) in wallets" :key="index" style="text-align:center">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td>&#8358; {{ numberWithCommas(wallet.before_debit) }}</td>
                                        <td>&#8358; {{ numberWithCommas(wallet.after_debit) }}</td>
                                        <td>&#8358; {{numberWithCommas(wallet.amount)}}</td>
                                        <td>{{wallet.retailer_distributor_transaction.outlet.name}}</td> 
                                        <td>{{wallet.retailer_distributor_transaction.orders.length  }}</td>                                        
                                        <td>{{wallet.retailer_distributor_transaction.order_group_id  }}</td>                                        
                                        <td> {{wallet.created_at}}</td>
                                        <td :style="wallet.completed == 1?'color:green;font-weight:bold !important':'color:red;font-weight:bold !important'"> {{wallet.completed == 1 ? 'Paid' : 'Pending'}}</td>
                                        <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="getWallet(wallet)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>


                                    <table class="table table-striped" v-if="distributor">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Balance before credit</th>
                                        <th>Balance after credit</th>
                                        <th>Amount credited</th>
                                        <th>Outlet</th> 
                                        <th>Number of products</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>View</th>
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(wallet,index) in wallets" :key="index" style="text-align:center">
                                        <td>{{ page.current_page == 1 ? index + 1:(page.current_page-1)*page.per_page + index + 1 }}</td>
                                        <td> {{ wallet.before_credit ? '&#8358;' + numberWithCommas(wallet.before_credit) : 'Pending'}}</td>
                                        <td> {{ wallet.after_credit ? '&#8358;'+ numberWithCommas(wallet.after_credit) : 'Pending' }}</td>
                                        <td>&#8358; {{ numberWithCommas(wallet.amount)}}</td>
                                        <td>{{wallet.retailer_distributor_transaction.outlet.name}}</td> 
                                        <td>{{wallet.retailer_distributor_transaction.orders.length  }}</td>  
                                        <td>{{wallet.retailer_distributor_transaction.order_group_id  }}</td>                                       
                                        <td> {{wallet.created_at}}</td>
                                        <td :style="wallet.completed == 1?'color:green;font-weight:bold !important':'color:red;font-weight:bold !important'"> {{wallet.completed == 1 ? 'Paid' : 'Pending'}}</td>
                                        <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="getWallet(wallet)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>
                                  </div>


                                  
                                   

                                </div>
                                <Loading v-if="!wallets.length && loading">Loading...</Loading>
                                <div class="card mt-5" v-if="!wallets.length && !loading">
                                  <div class="card-body text-center">
                                    There are no wallet history at the moment
                                  </div>
                                </div>
                            </div>

                            



                            </div>
                        </section>

                      <div class="modal fade" id="order" tabindex="-1" aria-labelledby="order" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Wallet Transaction Information</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table class="table caption-top">
                                    <thead>
                                      <tr>
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
                                      <tr v-for="(product,index) in order" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <th scope="row"><img :src="product.product.public_image_url" width="50"/></th>
                                        <td>{{product.product.name}}</td>
                                        <td>&#8358; {{numberWithCommas(product.amount/product.qty)}}</td>
                                        <td>{{product.product.size?product.product.size:''}}</td>
                                        <td>{{product.product.sku?product.product.sku:''}}</td>
                                        <td>{{product.qty}}</td>
                                        <td>&#8358; {{numberWithCommas(product.amount)}}</td>
                                      </tr>
                                             
                                    </tbody>
                                  </table>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            
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
                                                <input type="date" v-model="start_date" class="form-control"/>
                                            </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon3">To</span>
                                                    <input type="date" v-model="end_date" class="form-control"/>
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


                                            </div>
                                        </div>
                                    </div>
                            </div>
</template>
<style scoped>

</style>

<script src="./Wallet.js">

</script>