<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                      <div class="breadcrumbs">
    <ul>
      <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
      <li><router-link :to="{name: 'business', params: { id: outlet.business_id }}" title="">Outlet Overview</router-link></li>
      <li>{{ outlet.name }}</li>
    </ul>
  </div>
{{ outlet.name }}
<!-- <pre>{{outlet}}</pre> -->
                        <section class="panel-content">
    <div class="row">
      <div class="col-md-12">
        <div class="mini-stats-sec">
          <div class="row">
            <!-- <div class="col-md-6">
              <div class="widget">
                <div class="widget-controls">
                  <span class="refresh-content"><i class="fa fa-refresh"></i></span>
                </div>
                <div class="mini-stats ">
                  <span class="yellow-skin"><i class="fa fa-shopping-bag"></i></span>
                  <p><i class="fa  fa-arrow-up up"></i> Product Categories</p>
                  <h3>Total: 88 |
                    Active: 9</h3>
                </div>
              </div>
            </div> -->
            <div class="col-md-6">
              <div class="widget">
                <div class="widget-controls">
                  <span class="refresh-content"><i class="fa fa-refresh"></i></span>
                </div>
                <div class="mini-stats ">
                  <span class="yellow-skin"><i class="fa fa-shopping-basket"></i></span>
                  <p><i class="fa  fa-arrow-down down"></i> Outlet Products</p>
                  <h3>Total: {{product.length}}</h3>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="widget">
                <div class="widget-controls">
                  <span class="refresh-content"><i class="fa fa-refresh"></i></span>
                </div>
                <div class="mini-stats ">
                  <span class="yellow-skin"><i class="fa fa-credit-card"></i></span>
                  <p><i class="fa  fa-arrow-down down"></i> Outlet Transaction</p>
                  <h3>Total: {{ transactions }} |
                    Amount: &#8358; {{total_transaction}}</h3>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="widget">
                <div class="widget-controls">
                  <span class="refresh-content"><i class="fa fa-refresh"></i></span>
                </div>
                <div class="mini-stats ">
                  <span class="yellow-skin"><i class="fa fa-users"></i></span>
                  <p><i class="fa  fa-arrow-up up"></i>Customers</p>
                  <h3>Total:123
                    Active: 12</h3>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        
      </div>
      <!-- <div class="col-md-6">
        <div class="widget">
          <div class="widget-controls">
            <span class="close-content"><i class="fa fa-trash-o"></i></span>
            <span class="refresh-content"><i class="fa fa-refresh"></i></span>
          </div>
          <div class="activity-sec">
            <div class="widget-title">
              <h3>Products low in stock</h3>
            </div>
            <div id="graph-wrapper" >
              <div class="graph-info">
                <a href="" class="visitors"><span class="yellow-skin"></span>Visitors</a>
                <a href="" class="returning"><span class="yellow-skin"></span>Returning Visitors</a>
              </div>
              <div class="graph-container">
                <canvas id="chart"></canvas>
              </div>
              <div class="graph-details">
                <ul>
                  <li><span class="red-skin">+5.00%</span><strong>&#8358;5,450</strong><p>Average of 450.35 Per Day</p></li>
                  <li><span class="purple-skin">+5.00%</span><strong>1,120</strong><p>Total Visitors : 2,58,256,00</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="widget">
          <div class="widget-controls">
            <span class="close-content"><i class="fa fa-trash-o"></i></span>
            <span class="expand-content"><i class="fa fa-expand"></i></span>
            <span class="refresh-content"><i class="fa fa-refresh"></i></span>
          </div>
          <div class="our-clients-sec">
            <div class="widget-title">
              <h3>Last 5 Transactions</h3>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>S/N</th>
                  <th>Reference</th>
                  <th>Amount (&#8358;)</th>
                  <th>Payment Type</th>
                  <th>Number of items</th>
                  <th>Customer Name</th>
                  <!-- <th>View</th> -->
                  <!-- <th>Numbers</th> -->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(transaction,index) in recent_transaction" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ transaction.trans_ref }}</td>
                  <td>&#8358; {{ transaction.amount }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>{{ transaction.order_group.length == 1 ? transaction.order_group.length + " Item" : transaction.order_group.length+" Items" }}</td>
                  <td>{{ transaction.order_group[0].customer.name }}</td>
                  <!-- <td>
                    <button data-toggle="modal" data-target="#order" type="button" @click="showProducts(transaction)" class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                  </td> -->
                </tr>
                </tbody>
              </table>
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
<script src="./Outlet.js">
</script>

<style scoped>
</style>