<template>
    <MainLayoutComponent>
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
                  <p><i class="fa  fa-arrow-down down"></i> Products</p>
                  <h3>Total: 89 |
                    Active: 10</h3>
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
                  <p><i class="fa  fa-arrow-down down"></i> Transactions</p>
                  <h3>Count:{{ transactions }} |
                    Amount: &#8358;{{ total_transaction }}</h3>
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
              <h3>Latest 5 Transactions</h3>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>Reference</th>
                  <th>Amount (&#8358;)</th>
                  <th>Payment Type</th>
                  <th>Customer Name</th>
                  <th>Customer Phone</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>007101</td>
                  <td>2000000000000</td>
                  <td>Cash</td>
                  <td>Ade Bill</td>
                  <td><a href="tel:09089y">0908879}</a></td>
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
    </MainLayoutComponent>
</template>
<script src="./Outlet.js">
</script>

<style scoped>
</style>