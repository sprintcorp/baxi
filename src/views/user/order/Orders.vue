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
                            <li><span>Order</span></li>
                            </ul>
                        </div>
                        <section class="panel-content">
                          <div class="row text-right">
                            <div class="col-md 4">
                              <form class="search-form">
                                  <input type="text" v-model="search" v-on:keyup="keymonitor" placeholder="Search Here..." style="background-color:white;width:175%"/>
                                  <button type="submit"><i class="fa fa-search"></i></button>
                              </form> 
                            </div>
                          </div>
    
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
              <h3>Order</h3>
            </div>
            <div class="table-responsive" v-if="orders.length && !loading">
              <table class="table table-striped">
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

                <tr v-for="(order,index) in orders[0]" :key="index">
                  <!-- <td>{{  }}</td> -->
                  <td>{{ order.group_id }}</td>
                  <td>{{ order.orders[0].customer.name }}</td>
                  <td>{{ order.orders.length == 1 ? order.orders.length+" Item" : order.orders.length+" Items" }}</td>
                  <td>{{ order.created_at }}</td>
                  <td>
                    <button data-toggle="modal" data-target="#order" type="button" @click="showOrders(order)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                  </td>
                 
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
               
              </table>
              
            </div>

             <div  v-if="!orders.length && loading" style="text-align:center">
                  
                  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  
            </div>
            <div class="card" v-if="!orders.length && !loading">
              <div class="card-body text-center">
                There are no order at the moment
              </div>
            </div>


            <div class="modal fade" id="order" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header text-center">
                  <span class="login100-form-title p-b-33">Cart Item</span>
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
                      <tr v-for="(product,index) in group_orders.orders" :key="index">
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
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger"><i class="fa fa-times-circle"></i></button>
                          <button type="button" class="btn btn-success text-white" @click="acceptOrder(group_orders.group_id)">&nbsp; <i class="fa fa-check-circle"></i></button>
                        </div>
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
<script src="./Orders.js">
</script>

<style scoped>
</style>