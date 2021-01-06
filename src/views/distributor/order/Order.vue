<template>
    <div>
        <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
            <div class="row">
                <div class="breadcrumbs">
                    <ul>
                        <li><router-link :to="{name:'distributorDashboard'}" title="">Home</router-link></li>
                        <li><span>Orders</span></li>
                    </ul>
                </div>



                 <div class="heading-sec">
                            

                            <div class="row card p-5 text-center">
                                <div class="col-md-12">
                               <div class="table-responsive">
                                    <table class="table table-borderless">
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
                                </div>
                            </div>
                            </div>
                        </div>
            </div>
        
        </div>
    <!-- </div> -->
</template>

<script src="./Order.js">

</script>