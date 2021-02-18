<template>
    <div>
        <div class="container-fluid mt-5" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-8" style="border-right:2px solid black;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">Order Categories</div>
                            <div class="p">Please pick a category of products you would want to make an order</div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                        <!-- <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <input type="text" v-model="search" placeholder="Search Products" style="background-color:white;width:90% !important;border-radius:20px"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form> -->
                        <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <Dropdown
                                :options="list_products"
                                @selected="myChangeEvent($event)"
                                :disabled="false"
                                :maxItem="100"
                                :width="190"
                                :height="40"
                                placeholder="Search for products">
                            </Dropdown>
                                    <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                            <!-- <SearchComponent :search="search"></SearchComponent> -->
                        </div>
                    </div>
                    <div class="row mt-3">
                        <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                    </div>
                    <div class="row"  v-if="!show_business">
                        <!-- {{show_business}} -->
                        <div class="col-md-12" v-if="categories.length && !loading">
                            <div class="row">
                                <div class="col-md-3 d-flex justify-content-center" v-for="(category,index) in categories" :key="index">
                                    <router-link :to="{name:'categoryVendor',params: { id: category.id }}">
                                    <div class="card p-2" style="width: 12rem;height:10rem;margin-right:3px;background-color:#ffc107;border:0px">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="text-center mt-3"><img :src="category.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="card-body text-center">
                                           <p class="fs-13 text-white"> {{category.name}}</p>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>                           

                        </div>
                        <div class="col-md-12" v-if="businesses.length && !loading">                            
                                <div class="row" v-if="show_business">
                                <div class="col-md-6 d-flex justify-content-center" v-for="(vendor,index) in businesses" :key="index">
                                    <router-link :to="{name:'vendorProduct',params: { id: vendor.id },query: { vendor: vendor.name }}">
                                        <div class="card p-2" style="width: 25rem;height:6.5rem;border-radius:10px">
                                            
                                            <div class="row">
                                            <div class="col-md-3 mt-2"><img :src="vendor.owner.public_image_url?vendor.owner.public_image_url:'@/assets/images/icons8-customer-48.png'" class="rounded-circle" alt="" width="70" height="70"/></div>
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
                            <div v-if="!categories.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div>
                            <div class="card" v-if="!categories.length && !loading">
                                <div class="card-body text-center">
                                    There are no category at the moment
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
                    <div class="mt-3 mb-3" v-if="notification.length"> Today <i class="fa fa-angle-down"></i></div>
                    <!-- <div class="row border-bottom mt-1" v-for="(i,n) in notification" :key="n">
                        <div class="col-md-2">
                            <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45">
                        </div>
                        <div class="col-md-6 mt-2">
                            <h6>Request Accepted</h6>
                            <p class="fs-10">View Transaction Details</p>
                        </div>
                    </div> -->
                    <div class="accordion" id="accordionExample">
                        <div class=""  v-for="(res,n) in notification" :key="n">
                            <div class="row" :id="'headingTwo'+n" @click="updateNotification(res.id)">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" :data-target="'#collapseTwo'+n" aria-expanded="false" aria-controls="collapseTwo">
                                <img src="/images/baxi.png" class="rounded-circle border" alt="" width="45" height="45"> View Notification 
                                </button>
                            </h2>
                            </div>
                            <div :id="'collapseTwo'+n" class="collapse" :aria-labelledby="'headingTwo'+n" data-parent="#accordionExample">
                            <div class="card-body">
                                {{res.data.title}}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="row border-bottom mt-1" v-if="!notification.length">
                        
                        <div class="col-md-12 mt-2">
                           No Notification at the moment
                        </div>
                    </div>
                </div>
            </div> 


        </div>
    </div>
</template>


<style scoped>

</style>

<script src="./Category.js">
</script>