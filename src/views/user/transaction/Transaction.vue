<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="container" style="background-color: white;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                         

                        <div class="heading-sec">
                            <div class="row">
                            <div class="col-md-4 column">
                                <!-- <div class="heading-profile">
                                  <h2> Products </h2>
                                </div> -->
                            </div>
                              <div class="col-md-8 column">
                                  <div class="top-bar-chart">
                                    <!-- <div class="quick-report">
                                        <div class="quick-report-infos">
                                          <button data-toggle="modal" type="button" @click="saveOrder()" class="btns shadow yellow-skin lrg-btn sml-radius">Save Order &nbsp; <i class="fa fa-save"></i>
                                        </button>
                                          <button data-toggle="modal" data-target="#user" @click="showUserForm()" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">Add User to Order &nbsp; <i class="fa fa-user-plus"></i>
                                        </button>
                                        <button data-toggle="modal" data-target="#product" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">Create Product &nbsp; <i class="fa fa-plus"></i>
                                        </button>
                                        <button data-toggle="modal" data-target="#cart" type="button" class="btns shadow yellow-skin lrg-btn sml-radius">View Cart &nbsp; <i class="fa fa-shopping-cart"></i>
                                        </button>

                                        
                                        </div>
                                  </div> -->
                                  </div>
                              </div>
                            </div>
                        </div>

                        <section class="panel-content">
                            <div class="row">
                            <div class="col-md-12">
                                <div class="row border-2 mt-3">
                                  <div class="col-md-4 mt-2 font-weight-bold"> Transaction</div>
                                  <div class="col-md-4">
                                    
                                  </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <i class="fa fa-search"></i> Filter by transaction: From last 30 days
                                    </button>
                                  </div>
                                </div>
                                  <div class="row">
                                  <div class="table-responsive mt-5" v-if="transactions.length && !loading">
                                    <table class="table table-striped">
                                      <thead>
                                      <tr>
                                        <th>S/N</th>
                                        <th>Transfer ref</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Date Ordered</th>
                                        <th>Date Delivered</th>
                                        <th>Amount</th>
                                        <!-- <th>Numbers</th> -->
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(transaction,index) in filerTransactions" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ transaction.order_group_id }}</td>
                                        <td>{{ transaction.type }}</td>
                                        <td></td>
                                        <td></td>
                                        <td>{{transaction.created_at  }}</td>
                                        <td></td>
                                        <td></td>
                                        <!-- <td>
                                          <button data-toggle="modal" data-target="#order" type="button" @click="showProducts(product)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td> -->
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

                                <div class="mt-5" v-if="!transactions.length && loading" style="text-align:center">
                  
                                      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div><br>
                                      Loading...
                                      
                                </div>
                                <div class="card mt-5" v-if="!transactions.length && !loading">
                                  <div class="card-body text-center">
                                    There are no products for this outlet at the moment
                                  </div>
                                </div>
                                <!-- </div> -->
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
<script src="./Transaction.js">
</script>

<style scoped>
.page-item.active .page-link{
  background-color:#FFCF00 !important;
  border:1px solid #FFCF00 !important;
  color:white!important;
}
.page-link{
  color:black !important;
}
</style>