<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="container-fluid" style="background-color: white;min-height:80vh">
        <div class="heading-sec">
          <div class="row" v-if="!saving">
            <div class="col-md-9" style="border-right:2px solid black">
              <div class="row">
                <div class="col-md-4 mt-5">
                    <div class="input-group">
                    <span class="input-group-text">Select Outlet</span>
                    <select v-model='selected_outlet' @change="getOutletInformation()" class="form-control">
                      <!-- <option>Select outlet</option> -->
                      <option v-for="(outlet,index) in outlets" :key="index" :value="outlet.id">{{outlet.name}}</option>
                    </select>
                  </div>
                 
                </div>

                <div class="col-md-8 d-flex justify-content-end p-5">
                  <button class="btn btn-rounded btn-warning" type="button" data-toggle="modal" data-target="#outlet"><i class="fa fa-plus"></i> Create Outlet</button>                  
                </div>
              </div>

              <div class="row" style="margin-top:-30px">
              <div class="col-md-12">
                <div class="row">

                <div class="col-md-3">
                  <div class="card p-3" style="width:14rem;height:110px;border-radius:10px">
                    <div class="d-flex justify-content-end">
                      <div class="row"><p>Total Products Sold</p></div>                    
                    </div>
                    <div class="d-flex justify-content-end">
                      <div class="font-weight-bold" style="color:blue">{{total_quantity}}</div>
                    </div>
                    
                      <div class="progress-bar bg-info" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>  
                </div>  

                <div class="col-md-3">
                  <div class="card p-3" style="width:14rem;height:110px;border-radius:10px">
                    <div class="d-flex justify-content-end">
                      <div class="row"><p>Total Transaction</p></div>                    
                    </div>
                    <div class="d-flex justify-content-end">
                      <div class="font-weight-bold" style="color:blue">&#8358; {{total_transaction}}</div>
                    </div>
                    
                      <div class="progress-bar bg-warning" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>  
                </div>  

                <div class="col-md-3">
                  <div class="card p-3" style="width:14rem;height:110px;border-radius:10px">
                    <div class="d-flex justify-content-end">
                      <div class="row"><p>Restock Level</p></div>
                      
                    </div>
                    <div class="d-flex justify-content-end">
                      <div class="font-weight-bold" style="color:blue">{{restock_level.length}}</div>
                    </div>
                    
                      <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="card p-3" style="width:14rem;height:110px;border-radius:10px">
                    <div class="d-flex justify-content-end">
                      <div class="row"><p>Total Transaction</p></div>
                      
                    </div>
                    <div class="d-flex justify-content-end">
                      <div class="font-weight-bold" style="color:blue">{{transactions.length}}</div>
                    </div>
                    
                      <div class="progress-bar bg-success" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>

                </div> 
            </div>
            <!-- {{series[0].data}}
            {{chartOptions}} -->
             <div class="row mt-3 d-flex justify-content-center" v-if="outlet_transactions.length > 0">
                <div class="col-md-12">
                  <apexchart width="1000" height="300" type="bar" :options="chartOptions" :series="series"></apexchart>
                </div>
            </div>
             <!-- <div class="row mt-3 d-flex justify-content-center" v-if="outlet_transactions.length < 1">
                <div class="col-md-12">
                  No chart available For this outlet
                </div>
            </div> -->


    

            <div class="mt-3 border-2">
            <div class="row mt-2 mr-1">
              
                        <div class="col-md-6">
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
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                          <download-csv
                              class="btn btn-info"
                              :data="filerTransactions"
                              name="transaction.csv">

                              Download Excel <i class="fa fa-file"></i>

                            </download-csv>
                        </div>
                            <!-- <div class="col-md-3">
                                  <input type="text" v-model="search" placeholder="Search Here..." class="form-control" style="background-color:white;"/>
                                 
                            </div> -->
            </div>

            <div class="row mt-2">

              <div class="col-md-12 d-flex justify-content-end">
                <div class="table-responsive" v-if="transactions.length && !loading">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Reference</th>
                      <th>Amount</th>
                      <th>Payment Type</th>
                      <th>Number of items</th>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>View</th>
                      <!-- <th>Numbers</th> -->
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="(transaction,index) in filerTransactions" :key="index">
                      <td>{{ index+1 }}</td>
                      <td>{{ transaction.trans_ref }}</td>
                      <td>&#8358; {{ transaction.amount }}</td>
                      <td>{{ transaction.type }}</td>
                      <td>{{ transaction.orders.length == 1 ? transaction.orders.length + " Item" : transaction.orders.length+" Items" }}</td>
                      <td>{{ transaction.orders[0].customer.name }}</td>
                      <td>{{ transaction.created_at }}</td>
                      <td>
                        <button data-toggle="modal" data-target="#order" type="button" @click="showProducts(transaction)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                      </td>
                    </tr>
                    </tbody>
                  
                  </table>
                  
                </div>
              </div>

             <div v-if="!transactions.length && loading" class="col-md-12 col-sm-6" style="text-align:center">
                  
                  <div class="spinner-border" style="width: 3rem; height: 3rem;">
                    <span class="sr-only">Loading...</span>
                  </div><br>
                  Loading...
                  
            </div>
            <div class="card" v-if="!transactions.length && !loading">
              <div class="card-body text-center">
                There are no transactions for this outlet at the moment
              </div>
            </div>
            </div>

            
            <div class="modal fade" id="order" tabindex="-1" role="dialog" aria-labelledby="product"      aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header text-center">
                  <span class="login100-form-title p-b-33">Transaction Item</span>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">customer name</th>
                        <th scope="col">customer phone</th>
                        <th scope="col">customer email</th>
                        <th scope="col">product</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product,index) in transaction_product.orders" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td>{{ product.customer.name }}</td>
                        <td>{{ product.customer.phone }}</td>
                        <td>{{ product.customer.email }}</td>
                        <td>{{ product.product.name }}</td>
                        <td>{{ product.amount }}</td>
                        <td>{{ product.qty }}</td>
                        <td>{{ product.created_at }}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                        </div>
                        
                        </div>
                      </div>
            

            </div>



            
            </div>
                
              
              </div>
            </div>

             <div class="col-md-3 mt-4" style="">
               <div class="ml-5">
                <div class="row">
                    <div class="heading-profile">
                      <h4 class="font-weight-bold">
                      Inventory Summary
                      </h4>
                    </div>
                </div>
                <div class="row p-1" style="border:1px solid grey;border-radius:0px;width:270px">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-7"><p>PRODUCTS SOLD</p></div>
                      <!-- <div class="col-md-1">|</div> -->
                      <div class="col-md-3"><p>{{total_quantity}}</p></div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-md-7"><p>PRODUCTS LEFT</p></div>
                      <!-- <div class="col-md-1">|</div> -->
                      <div class="col-md-3"><p>10099883</p></div>
                    </div>
                  </div>                  
                </div>
                <div class="row">
                    <div class="heading-profile">
                      <h4 class="font-weight-bold">
                      Top Selling Products
                      </h4>
                    </div>
                </div>
                <div class="row p-1" style="border:1px solid grey;border-radius:0px;width:270px">
                  <div class="col-md-12" v-if="top_selling.length > 0">
                    <div class="row mb-3" v-for="(product,index) in top_selling" :key="index">
                      <div class="col-md-6"><img :src="product.product.public_image_url" alt="" width="100" height="100"></div>
                      <div class="col-md-6">
                        <div><p>{{product.product.name}}</p></div>
                        <!-- <div><p>Product id</p></div> -->
                        <div><p> Sold : {{product.count}}</p></div>
                        <!-- <div><p>Amount Left</p></div> -->
                      </div>
                      <!-- <hr> -->
                    </div>  
                  </div>

                  <div class="col-md-12" v-if="top_selling.length < 1">
                    No top selling product at the moment
                  </div>  
                                  
                </div>
               </div>
             </div>



             <div class="modal fade" id="outlet" tabindex="-1" aria-labelledby="outletModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="outletModal">Create Outlet</h5>
                      <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" placeholder="" v-model="payload.name">
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Address</label>
                        <input type="text" class="form-control" placeholder="" v-model="payload.full_address">
                      </div>

                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Users</label>
                        <select class="form-control" v-model="payload.cashier">
                          <option disabled>Select users</option>
                          <option v-for="(user,index) in users" :key="index" :value="user.user_name">{{user.user_name}}</option>
                        </select>
                      </div>

                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" @click="createOutlet()">Save</button>
                    </div>
                  </div>
                </div>
              </div>

            </div> 
        </div>
        <div class="row col-md-12">
                            <div class="overlay" v-if="saving">
                                <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                    <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                    Saving Outlet...
                                </div>
                            </div>
        </div>

        <!-- All Businesses -->
        
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Outlet.js">
</script>

<style scoped>
th{
  font-size: 12px;
}
td{
  font-size: 13px;
}
.overlay {
	position: fixed;
	display: block;
	width: 100%;
	height: 100%;
	top: 10%;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0.5,0.5);
	z-index: 2;
	cursor: pointer;
	text-align:center;
  }
</style>
