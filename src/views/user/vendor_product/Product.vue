<template>
    <div>
        <div class="container-fluid mt-5" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-8" style="border-right:2px solid black;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">{{this.$route.query.vendor}}</div>
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
                           <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                        </div>

                        <!-- <div class="col-md-7 d-flex justify-content-end">
                            <button @click="getCart()" class="btn btn-warning" style="border-radius:20px" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-shopping-cart"></i> Cart</button>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="vendor_products.length && !loading">
                            <div class="row mr-2">
                                <div class="col-md-6 d-flex justify-content-center" v-for="(product,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                    <div class="card p-2" style="width: 25rem;height:8rem;border-radius:0px">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="row g-0">
                                        <div class="col-md-2 mt-2 mr-2"><img :src="product.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="col-md-7">
                                            <p class="fs-12 font-weight-bold text-black"> {{product.name}}</p>
                                            <p class="fs-12 font-weight-bold text-black"> &#8358; {{ numberWithCommas(product.price) }}</p>
                                            <p class="fs-10 font-weight-bold text-black" style="margin-top:-15px"> {{product.quantity}} Products</p>
                                        </div>
                                        <!-- <div class="col-md-3 mt-4"></div> -->
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
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to order?</div>                                        
                                        </div>
                                    </div>
                                    
                                <div class="modal-body" style="margin-top:-30px">
                                     <div class="row card border-0">
                                         
                                        <div class="text-center"><img :src="product.image" width="100" height="100"/></div>
                                        <div class="fs-15 mt-2 text-center">{{product.name}}</div>
                                        <div class="fs-15 mt-1 text-center">&#8358; {{numberWithCommas(product.price)}}</div>
                                        <div class="fs-15 mt-1 text-center">{{ product.quantity }} Quantity</div>
                                        <div class="fs-15 mt-1 text-center">N:B Minimum Order {{ product.minimum_order }}</div>
                                        <div class="fs-15 mt-3 mb-1 text-center">Select Quantity</div>
                                        <div class="row">
                                             <div class="col-md-12 d-flex justify-content-end">
                                                <div class="input-group rm">
                                                    <input type="button" @click="decrease(product.quantity)" value="-" class="button-minus" data-field="quantity">
                                                    <input type="number" step="1" max=""  :value="quantity_value" name="quantity" @change="changes()" class="quantity-field">
                                                    <input type="button" @click="increase(product.quantity)" value="+" class="button-plus" data-field="quantity">
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    

                                   
                                    
                                </div>
                                <div class="row p-5 d-flex justify-content-center" style="margin-bottom:-20px">
                                    <button type="button" class="btn btn-warning mr-3" v-if="quantity_value > 0 && !error && product.minimum_order <= quantity_value" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    <button type="button" class="btn btn-light" style="border-radius:20px;color:red" data-dismiss="modal">CLOSE</button>                                    
                                </div>
                                 <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="error">Selected quantity is more than available quantity</div>
                                        <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="product.minimum_order > quantity_value && quantity_value > 0">Selected quantity is less than minimum order pack</div>
                                   
                                </div>
                            </div>
                        </div>
                   

                        <div class="row col-md-12">
                            <div class="overlay" v-if="saving">
                                <div style="text-align:center;position: absolute;left: 40%;top: 40%;color:white;font-size:40px">
                                    <span class="spinner-border spinner-border-sm fs-100" role="status" aria-hidden="true"></span>
                                    Processing Order...
                                </div>
                            </div>
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
                <div class="col-md-3 ml-4" style="" v-if="!show_cart">
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

                <div class="col-md-3 ml-2" style="" v-if="show_cart">
                            <div class="row p-3" style="margin-top:-17px;background-color:#d8d4d4">
                                <h5><i class="fa fa-shopping-cart"></i>  {{cart_order.length}} items in cart</h5>   
                            </div>
                            <div class="row" style="margin-top:-15px">
                                <div style="margin-top:-15px" class="col-md-12 d-flex justify-content-center" v-for="(cart,index) in cart_order" :key="index">
                                        <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                        <div class="card p-2" style="width:350rem;height:6.5rem;border-radius:0px">
                                            <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                            <div class="row g-0">
                                            <div class="col-md-2 mt-2"><img :src="cart.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                            <div class="col-md-5 mt-2 ml-1">
                                                <p class="fs-10 font-weight-bold text-black"> {{cart.name}}</p>
                                                <p class="fs-10 font-weight-bold text-black" style="margin-top:-20px"> Quantity {{cart.qty}}</p>
                                            </div>
                                            <div class="col-md-3 mt-4 fs-10">&#8358;{{ numberWithCommas(cart.amount) }}</div>
                                            <div class="col-md-1">
                                                <div class="mt-4">
                                                    <button @click="removeFromCart(cart_order,index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- </router-link> -->
                                </div>
                            </div>
                            <div class="row align-items-end p-3">
                                <div class="col-sm-8">
                                    Total : &#8358; {{numberWithCommas(total)}}
                                </div>
                                <div class="col-sm-4 d-flex justify-content-end">
                                    <button type="button" data-toggle="modal" data-target="#type" class="btn btn-warning pl-4 pr-4" style="border-radius:15px">Order</button>
                                </div>
                            </div>


                            <div class="modal fade" id="type" tabindex="-1" role="dialog" aria-labelledby="user" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                                    <span class="login100-form-title p-b-33"></span>
                                        <div class="row">
                                        <div class="col-md-12">
                                            <div class="input-group">
                                            <span class="input-group-text" id="basic-addon3">Delivery Type</span>
                                                <select class="form-control" @change="showDate()" v-model="type" aria-label="Default select example">
                                                    <option selected>Select Pickup Type</option>
                                                    <option value="pickup">Pickup</option>
                                                    <option value="delivery">Delivery</option>
                                                </select>
                                            </div>
                                        </div>
                                      <div class="col-md-12 mt-3" v-if="show_date">
                                        <div class="input-group">
                                          <span class="input-group-text" id="basic-addon3">Delivery Date</span>
                                          <input type="date" v-model="date" class="form-control"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12 d-flex justify-content-end" >
                                            <button data-dismiss="modal" class="btn btn-danger mr-2">Close</button>
                                            <button @click="saveOrder()" data-dismiss="modal" class="btn btn-warning">Save</button>
                                      </div>
                                    </div>
         
                                    </div>
                                </div>
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