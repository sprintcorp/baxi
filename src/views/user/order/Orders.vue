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
    
    <div class="row">
      <div class="col-md-12">
        <div class="widget">
          <div class="widget-controls">
            <span class="close-content"><i class="fa fa-trash-o"></i></span>
            <span class="expand-content"><i class="fa fa-expand"></i></span>
            <span class="refresh-content"><i class="fa fa-refresh"></i></span>
          </div>
          <pre>{{orders}}</pre>
          <div class="our-clients-sec">
            <div class="widget-title">
              <h3>Order</h3>
            </div>
            <div class="table-responsive" v-if="orders.length && !loading">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>S/N</th>
                  <th>Order</th>
                  <!-- <th>Amount (&#8358;)</th>
                  <th>Quatity</th>                  
                  <th>Available Quantity</th>
                  <th>Outlet</th> -->
                  <th>View</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(order,index) in orders" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ order[0] }}</td>
                  <!-- <td>&#8358; {{ order.amount }}</td>
                  <td>{{ order.qty}}</td>
                  <td>{{ order.product.stock_quantity}}</td> -->
                  <!-- <td>{{ order.outlet.name }}</td> -->
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