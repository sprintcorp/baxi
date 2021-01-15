<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="main-content style2" style="background-color: white;min-height:80vh">
        <div class="heading-sec">
          <div class="row">
            <div class="col-md-9" style="border-right:2px solid black">
              <div class="row mt-5">
                <div class="col-md-6 column">
                  <div class="heading-profile">
                    <h2>
                      Welcome back, <span>{{ name }}!</span
                      > 
                    </h2>
                  </div>
                </div>

                <div class="col-md-6">
                  
                  <div class="d-flex justify-content-end">
                    <button  class="btns shadow white-skin sml-btn sml-radius text-black mr-2 p-2"  style="border-radius:25px;border:2px solid black">
                      <i class="fa fa-microchip"></i> Restock Level
                    </button>
                    <button  class="btns shadow yellow-skin sml-btn sml-radius text-black p-2"  style="border-radius:25px">
                      <i class="fa fa-plus-circle"></i> Add Product 
                    </button>
                  </div>
                </div>
              </div>

              <div class="row mt-5">
              <div class="col-md-12">
                <div class="row">

                <div class="col-md-2 card p-3" style="height:110px;border-radius:10px">
                  <div class="d-flex justify-content-end">
                    <div class="row"><p>Total Sales</p></div> 
                    
                  </div>  
                  <div class="d-flex justify-content-end">
                    <div class="font-weight-bold" style="color:blue">22290867</div>
                  </div>
                  
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  

                </div>  

                <div class="col-md-2 card p-3" style="height:110px;border-radius:10px">
                  <div class="d-flex justify-content-end">
                    <div class="row"><p>Total Products Sold</p></div>
                    
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="font-weight-bold" style="color:blue">78896689</div>
                  </div>
                  
                    <div class="progress-bar bg-info" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>  

                <div class="col-md-2 card p-3" style="height:110px;border-radius:10px">
                  <div class="d-flex justify-content-end">
                    <div class="row"><p>Total Transaction</p></div>
                    
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="font-weight-bold" style="color:blue">8875578</div>
                  </div>
                  
                    <div class="progress-bar bg-warning" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>  

                <div class="col-md-2 card p-3" style="height:110px;border-radius:10px">
                  <div class="d-flex justify-content-end">
                    <div class="row"><p>Total New Orders</p></div>
                    
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="font-weight-bold" style="color:blue">09876690</div>
                  </div>
                  
                    <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;height:10px" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div> 
                </div> 
            </div>
          <div class="mt-3 border-2">
            <div class="row mt-2 ml-5">
              <div class="col-md-2">
                          <download-csv
                              class="btn btn-info"
                              :data="filerTransactions"
                              name="transaction.csv">

                              Download Excel <i class="fa fa-file"></i>

                            </download-csv>
                        </div>
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
                            <div class="col-md-4">
                                  <input type="text" v-model="search" placeholder="Search Here..." class="form-control" style="background-color:white;"/>
                                 
                            </div>
            </div>

            <div class="row mt-2">

              <div class="col-md-12 col-sm-6 ml-5">
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
                  
                  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
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
                        <!-- <div class="modal-footer">
                          <button type="button" class="btn btn-danger"><i class="fa fa-times-circle"></i></button>
                          <button type="button" class="btn btn-success text-white" @click="acceptOrder(group_orders.group_id)">&nbsp; <i class="fa fa-check-circle"></i></button>
                        </div> -->
                        </div>
                      </div>
            

            </div>



            
            </div>
                
              
              </div>
            </div>

             <div class="col-md-3 mt-5" style="">
               <div class="ml-5">
                <div class="row">
                    <div class="heading-profile">
                      <h4 class="font-weight-bold">
                      Inventory Summary
                      </h4>
                    </div>
                </div>
                <div class="row p-1" style="border:1px solid grey;border-radius:10px;width:270px">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-7"><p>PRODUCTS SOLD</p></div>
                      <div class="col-md-1">|</div>
                      <div class="col-md-3"><p>10099883</p></div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-md-7"><p>PRODUCTS LEFT</p></div>
                      <div class="col-md-1">|</div>
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
                <div class="row p-1" style="border:1px solid grey;border-radius:10px;width:270px">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md-6"><img src="/images/baxi.png" alt="" width="100" height="100"></div>
                      <div class="col-md-6">
                        <div><p>Product name</p></div>
                        <div><p>Product id</p></div>
                        <div><p>Amount Sold</p></div>
                        <div><p>Amount Left</p></div>
                      </div>
                    </div>
                    <hr>
                    
                  </div>                  
                </div>
               </div>
             </div>
          </div>    

        </div>

        <!-- All Businesses -->
        
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Dashboard.js">
</script>

<style scoped>
th{
  font-size: 12px;
}
td{
  font-size: 13px;
}
</style>
