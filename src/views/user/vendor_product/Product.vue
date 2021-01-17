<template>
    <div>
        <div class="container-fluid mt-5" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-8" style="border-right:2px solid black;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">Vendors</div>
                            <div class="p">Please pick a product you would like.</div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                        <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <input type="text" v-model="search" placeholder="Type to search for product, or vendor" style="background-color:white;width:90% !important;border-radius:20px"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button>
                        </div>

                        <!-- <div class="col-md-7 d-flex justify-content-end">
                            <button @click="getCart()" class="btn btn-warning" style="border-radius:20px" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-shopping-cart"></i> Cart</button>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="vendor_products.length && !loading">
                            <div class="row mr-2">
                                <div class="col-md-6 d-flex justify-content-center" v-for="(product,index) in vendor_products" :key="index">
                                    <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                    <div class="card p-2" style="width: 25rem;height:6.5rem;border-radius:0px">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="row g-0">
                                        <div class="col-md-2 mt-2"><img :src="product.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="col-md-5 mt-4">
                                            <p class="fs-15 font-weight-bold text-black"> {{product.name}}</p>
                                            <p class="fs-10 font-weight-bold text-black" style="margin-top:-15px"> {{product.qty}} Products</p>
                                        </div>
                                        <div class="col-md-3 mt-4">&#8358; {{ product.amount }}</div>
                                        <div class="col-md-2">
                                            <div class="mt-4">
                                                <button @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">
                                                    <i class="fa fa-shopping-cart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>

                        </div>

                        <!-- Add Cart -->
                        <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="card rounded-circle text-center p-3" style="width:6rem;height:6rem;margin-top:-50px;background-color:#ffc107;border:0px">
                                        <i class="fa fa-shopping-cart" style="font-size:50px"></i>
                                    </div>
                                    <div class="row text-center">
                                        <div class="col-md-12">
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to cart?</div>                                        
                                        </div>
                                    </div>
                                    
                                <div class="modal-body" style="margin-top:-30px">
                                     <div class="row card border-0">
                                        <div class="text-center"><img :src="product.image" width="100" height="100"/></div>
                                        <div class="fs-15 mt-2 text-center">{{product.name}}</div>
                                        <div class="fs-15 mt-1 text-center">&#8358; {{ product.amount }}</div>
                                        <div class="fs-15 mt-1 text-center">{{ product.qty }} Quantity</div>
                                        <div class="fs-15 mt-3 mb-1 text-center">Select Quantity</div>
                                        <div class="row">
                                            <div class="col-md-2 fs-20"></div>
                                            <div class="col-md-1 fs-20"></div>
                                            <div class="col-md-3">
                                                <button class="btn btn-danger" @click="decrease(product.qty)"><i class="fa fa-minus"></i></button>
                                            </div>
                                            <div class="col-md-2"><input type="text" :value="quantity_value" style="width:50px" @change="changes()"></div>
                                            
                                            <div class="col-md-2"><button class="btn btn-success" @click="increase(product.qty)"><i class="fa fa-plus"></i></button></div>
                                        </div>
                                        <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="error">Selected quantity is more than available quantity</div>
                                    </div>
                                    

                                   
                                    
                                </div>
                                <div class="row p-5 d-flex justify-content-center">
                                    <button type="button" class="btn btn-warning mr-3" v-if="quantity_value > 0 && !error" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    <button type="button" class="btn btn-light" style="border-radius:20px;color:red" data-dismiss="modal">CLOSE</button>                                    
                                </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of Add Cart -->

                        <!-- Sidebar Cart -->
                            <!-- <div class="modal left fade" id="exampleModal" tabindex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Cart</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="nav flex-sm-column flex-row">
                                                <a class="nav-item nav-link active" href="#">Home</a>
                                                <a href="#" class="nav-item nav-link">Link</a>
                                                <a href="#" class="nav-item nav-link">Link</a>
                                                <a href="#" class="nav-item nav-link">Link</a>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                        <!-- End Sidebar Cart -->

                        <div class="row col-md-12">
                            <div v-if="!vendor_products.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div>
                            <div class="card" v-if="!vendor_products.length && !loading">
                                <div class="card-body text-center">
                                    There are no products available for this vendor at the moment
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
    @import url('./Product.css');
</style>

<script src="./Product.js">
</script>