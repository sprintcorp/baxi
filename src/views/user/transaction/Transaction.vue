<template>
    <MainLayoutComponent>
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
      <div class="col-md-12">
        <div class="widget">
          <div class="widget-controls">
            <span class="close-content"><i class="fa fa-trash-o"></i></span>
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
                  <th>Customer Name</th>
                  <!-- <th>Numbers</th> -->
                </tr>
                </thead>
                <tbody>

                <tr v-for="(transaction,index) in transactions" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ transaction.trans_ref }}</td>
                  <td>&#8358; {{ transaction.amount }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>{{ transaction.order_group[0].customer.name }}</td>
                  <!-- <td><a href="tel:09089y">0908879}</a></td> -->
                </tr>
                </tbody>
               
              </table>
              
            </div>

             <div  v-if="!transactions.length && loading" style="text-align:center">
                  
                  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  
            </div>
            <div class="card" v-if="!transactions.length && !loading">
              <div class="card-body text-center">
                There are no transactions for this outlet at the moment
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
    </MainLayoutComponent>
</template>
<script src="./Transaction.js">
</script>

<style scoped>
</style>