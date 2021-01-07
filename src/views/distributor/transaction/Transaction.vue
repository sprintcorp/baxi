<template>
    <div>
        <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
            <div class="row">
                <div class="breadcrumbs">
                    <ul>
                        <li><router-link :to="{name:'distributorDashboard'}" title="">Home</router-link></li>
                        <li><span>Transaction</span></li>
                    </ul>
                </div>



                 <div class="heading-sec">
                            

                            <div class="row card p-5 text-center">
                                <div class="col-md-12">
                               <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                        <!-- <th>S/N</th> -->
                                        <th>Order</th>
                                        <th>Customer</th>
                                        <th>Numbers of items</th>
                                        <!-- <th>Amount (&#8358;)</th>
                                        <th>Quatity</th>                  
                                        <th>Available Quantity</th>
                                        <th>Outlet</th> -->
                                        <th>Date</th>
                                        <th>View</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr v-for="(n,i) in 10" :key="i">
                                        <!-- <td>{{  }}</td> -->
                                        <td>1</td>
                                        <td>Billy</td>
                                        <td>10</td>
                                        <td>today</td>
                                        <td>
                                            <button data-toggle="modal" data-target="#order" type="button" @click="showOrders(i)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                        </td>
                                        
                                        <td></td>
                                        <td></td>
                                        </tr>
                                        </tbody>
                                    
                                    </table>              
                                </div>


                                <div class="modal fade" id="order" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
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
                      <!-- <tr v-for="(product,index) in transaction_product.order_group" :key="index"> -->
                      <tr>
                        <th scope="row">1</th>
                        <td>Fred</td>
                        <td>09878761</td>
                        <td>emaail@mail.co</td>
                        <td>Product name</td>
                        <td>230</td>
                        <td>11</td>
                        <td>Today</td>
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
            </div>
        
        </div>
    <!-- </div> -->
</template>

<script src="./Transaction.js">

</script>