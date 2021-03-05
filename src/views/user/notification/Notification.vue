<template>
    <div>
         <div class="container-fluid" style="">
                <div class="heading-sec">
                    <div class="row">                       

                        <section class="panel-content">
                          <div class="row">
                            <div class="col-md-12">
                                <div class="row border-2 mt-1">
                                  <div class="col-md-4 mt-2 font-weight-bold"> Notification</div>
                                  <div class="col-md-4 d-flex justify-content-end"> </div>
                                  <div class="col-md-4 d-flex justify-content-end">
                                    <!-- <button data-toggle="modal" data-target="#search" class="btns shadow btn-light btn-sm sml-radius text-black p-2" style="border-radius:30px">
                                      <img src="../../../assets/icon/noun_filter_3070438.png" alt="img"/> Filter by wallet: From last 30 days
                                    </button> -->
                                  </div>
                                </div>
                                  <div class="row">
                                  <div class="table-responsive mt-5">
                                    <table class="table table-striped" v-if="!distributor">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th>S/N</th>
                                        <th>Message</th>
                                        <th>Action</th>
                                        
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(notifications,index) in notification" :key="index" style="text-align:center">
                                        <td>{{ index + 1 }}</td>
                                        <td> {{ notifications.data.title}}</td>
                                       
                                        <!-- <td :style="wallet.completed == 1?'color:green;font-weight:bold !important':'color:red;font-weight:bold !important'"> {{wallet.completed == 1 ? 'Paid' : 'Pending'}}</td> -->
                                        <td>
                                            <router-link :to="{name:'orderInformation',params: { id: notifications.data.order_id }}" href="#" class="top-text-block" style="">
                                                <button class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                            </router-link>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>


                                    <table class="table table-striped" v-if="distributor">
                                      <thead>
                                      <tr style="text-align:center">
                                        <th width="20">S/N</th>
                                        <th width="200">Message</th>
                                        <th>Balance after credit</th>
                                        
                                      </tr>
                                      </thead>
                                      <tbody>

                                      <tr v-for="(notifications,index) in notification" :key="index" style="text-align:center">
                                        <td width="20">{{ index + 1 }}</td>
                                        <td width="200"> {{ notifications.data.title}}</td>
                                       
                                        <!-- <td :style="wallet.completed == 1?'color:green;font-weight:bold !important':'color:red;font-weight:bold !important'"> {{wallet.completed == 1 ? 'Paid' : 'Pending'}}</td> -->
                                        <td>
                                            <router-link :to="{name:'orderInformation',params: { id: notifications.data.order_id }}" href="#" class="top-text-block" style="">
                                                <button class="btn btn-primary text-white"><i class="fa fa-eye"></i></button>
                                            </router-link>
                                        </td>
                                      </tr>
                                      </tbody>
                                    
                                    </table>
                                    <!-- <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageWallet(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav> -->
                                  </div>


                                  
                                   

                                </div>
                                <Loading v-if="!notification.length && loading">Loading...</Loading>
                                <div class="card mt-5" v-if="!notification.length && !loading">
                                  <div class="card-body text-center">
                                    There are no notification at the moment
                                  </div>
                                </div>
                            </div>

                            



                            </div>
                        </section>


                      




                                            </div>
                                        </div>
                                    </div>
                            </div>
</template>
<style scoped>

</style>

<script src="./Notification.js">

</script>