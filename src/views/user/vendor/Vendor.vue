<template>
    <div>
        <div class="container-fluid mt-5" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-8" style="border-right:2px solid black;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">Vendors</div>
                            <div class="p">Please pick a vendor to access products available in their stores.</div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                        <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <input type="text" v-model="search" placeholder="Type to search for product, or vendor" style="background-color:white;width:90% !important;border-radius:20px"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="vendors.length && !loading">
                            <div class="row">
                                <div class="col-md-6 d-flex justify-content-center" v-for="(vendor,index) in vendors" :key="index">
                                    <router-link :to="{name:'vendorProduct',params: { id: vendor.id },query: { vendor: vendor.name }}">
                                    <div class="card p-2" style="width: 25rem;height:6.5rem;border-radius:10px">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="row">
                                        <div class="col-md-3 mt-2"><img src="/images/baxi.png" class="rounded-circle" alt="" width="70" height="70"/></div>
                                            <div class="col-md-8 mt-4">
                                            <p class="fs-15 font-weight-bold text-black"> {{vendor.name}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>

                        </div>

                        <div class="row col-md-12">
                            <div v-if="!vendors.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div>
                            <div class="card" v-if="!vendors.length && !loading">
                                <div class="card-body text-center">
                                    There are no vendors at the moment for this category
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-1"></div> -->
                <div class="col-md-3 ml-4" style="">
                    <div class="row">
                        <div class="font-weight-bold h4">Order Notifications</div>
                    </div>
                    <div class="mt-3 mb-3">Today <i class="fa fa-angle-down"></i></div>
                    <div class="row border-bottom mt-1" v-for="(i,n) in 3" :key="n">
                        <div class="col-md-2">
                            <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                        </div>
                        <div class="col-md-6 mt-2">
                            <h6>Request Accepted</h6>
                            <p class="fs-10">View Transaction Details</p>
                        </div>
                    </div>
                    <div class="mt-3 mb-3">This Week <i class="fa fa-angle-down"></i></div>
                    <div class="row border-bottom mt-1" v-for="(i,n) in 3" :key="n">
                        <div class="col-md-2">
                            <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                        </div>
                        <div class="col-md-6 mt-2">
                            <h6>Request Accepted</h6>
                            <p class="fs-10">View Transaction Details</p>
                        </div>
                    </div>
                </div>
            </div> 


        </div>
    </div>
</template>


<style scoped>

</style>

<script src="./Vendor.js">
</script>