<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                      <div class="breadcrumbs">
                            <ul>
                            <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
                            <li><router-link :to="{name: 'outletOverview', params: { id: outlet }}" title="">Outlet</router-link></li>
                            <li><span>Transaction</span></li>
                            </ul>
                        </div>
                        <section class="panel-content">
                      <div class="row">
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
                            <!-- {{transactions}} -->
    <div class="row">
      <div class="col-md-12">
        <div class="widget">
          <div class="widget-controls">
            <!-- <span class="close-content"><i class="fa fa-trash-o"></i></span> -->
            <span class="expand-content"><i class="fa fa-expand"></i></span>
            <span class="refresh-content"><i class="fa fa-refresh"></i></span>
          </div>
          <div class="our-clients-sec">
            <div class="widget-title">
              <h3> Transactions</h3>
            </div>
            <div class="table-responsive" v-if="transactions.length && !loading">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>S/N</th>
                  <th>Reference</th>
                  <th>Amount (&#8358;)</th>
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

             <div  v-if="!transactions.length && loading" style="text-align:center">
                  
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
      
    </div>

  </section>


                    </div>
                </div>
            </div>
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./Transaction.js">
</script>

<style scoped>
</style>