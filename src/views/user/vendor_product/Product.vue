<template>
    <div>
        <div class="container-fluid" style="margin-left:50px;margin-right:50px">
           <div class="row">
               <div class="col-md-8" style="border-right:2px solid black;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="font-weight-bold h4">{{this.$route.query.vendor}}</div>
                            <div class="p">Please pick a product you would like.</div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-end">
                        <!-- <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <input type="text" v-model="search" placeholder="Type to search for product, or vendor" style="background-color:white;width:90% !important;border-radius:20px"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form> -->
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                           <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                           <router-link :to="{name:'walletHistory'}"><button class="btn btn-warning ml-2" style="border-radius:20px"><i class="fa fa-wallet"></i> Wallet History</button></router-link>
                        </div>

                        <div class="col-md-5 d-flex justify-content-end">
                            <p class="fs-15" style="color:red;font-weight:bold">MOQ : Minimum Order Quantity</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="vendor_products.length && !loading">
                            <div class="row mr-2 mb-4">
                                <div class="col-md-6 d-flex justify-content-center" v-for="(product,index) in filerResult" :key="index">
                                    <div class="card p-2" style="width: 25rem;height:8rem;border-radius:0px">
                                        <div class="row g-0">
                                        <div class="col-md-2 mt-2 mr-2"><img :src="product.image" class="rounded-circle" alt="" height="70"/></div>
                                        <div class="col-md-7">
                                           <p class="fs-14 font-weight-bold text-black"> {{product.name.length > 22 ? product.name.substr(0, 22)+'...' : product.name}}</p>
                                                <p class="fs-12 font-weight-bold text-black" style="margin-top:-20px">{{product.size}}</p>
                                                <p class="fs-12 font-weight-bold text-black" style="margin-top:-5px"> &#8358; {{ numberWithCommas(product.price) }}.00</p>
                                                <p class="fs-10 font-weight-bold text-black" style="margin-top:-19px"> {{product.quantity}} packs - MOQ {{product.minimum_order}} </p>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="mt-4">
                                                <button @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">
                                                    <i class="fa fa-shopping-cart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <nav aria-label="Page navigation example">
                                      <ul class="mb-5 pagination justify-content-center">
                                        <li class="page-item mr-1">
                                          <button @click="getPageVendorProducts(page.first_page_url)" class="page-link">First</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageVendorProducts(page.prev_page_url)" class="page-link">Previous</button>
                                        </li>
                                        <li class="page-item active mr-1" aria-current="page">
                                          <span class="page-link">{{page.current_page}}</span>
                                        </li>
                                        <li class="page-item mr-1" aria-current="page">
                                          <span class="page-link">of {{page.last_page > 1? page.last_page+ ' pages' : page.last_page+ ' page'}}</span>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageVendorProducts(page.next_page_url)" class="page-link">Next</button>
                                        </li>
                                        <li class="page-item mr-1">
                                          <button @click="getPageVendorProducts(page.last_page_url)" class="page-link">Last</button>
                                        </li>
                                      </ul>
                                    </nav>

                        </div>

                        <!-- Add Cart -->
                        <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content" style="width:450px !important;">
                                    <div class="row text-center">
                                        <div class="col-md-12 mt-4">
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to order?</div>
                                        </div>
                                    </div>
                                    <button type="button" class="close-modal" data-dismiss="modal"><img :src="require('@/assets/icon/noun_cancel_2014884.png')" class='rounded' alt="img"/></button>

                                <div class="modal-body" style="margin-top:-35px">
                                     <div class="row card border-0">

                                        <div class="text-center"><img :src="product.image" width="100" height="100"/></div>
                                        <div class="fs-15 mt-2 h5 text-center" v-if="product.size">{{product.name}} - {{product.size}}</div>
                                        <div class="fs-15 mt-2 h5 text-center" v-if="!product.size">{{product.name}}</div>
                                        <div class="fs-15 mt-1 h5 text-center">&#8358; {{numberWithCommas(product.price)}}.00</div>
                                        <!-- <div class="fs-15 mt-1 text-center">{{ product.quantity }} Quantity</div> -->
                                        <!-- <div class="fs-15 mt-1 text-center">{{ product.size }} </div> -->
                                        <!-- <div class="fs-15 mt-1 text-center">N:B Minimum Order {{ product.minimum_order }}</div> -->
                                        <div class="fs-15 mt-3 text-center">Select Quantity (Packs)</div>
                                        <div class="fs-15 text-center"><small>{{product.pack_qty}} unit/pack</small></div>
                                        <div class="row">
                                             <div class="col-md-12 d-flex justify-content-end">
                                                <div class="input-group rm">
                                                    <input type="button" @click="decrease(product.quantity)" v-if="quantity_value > product.minimum_order" value="-" class="button-minus" data-field="quantity">
                                                    <input type="button" @click="moq(product.minimum_order)" value="-" v-if="quantity_value <= product.minimum_order"  class="button-minus" data-field="quantity">
                                                    <input type="number" step="1" :max="product.quantity" :min="product.minimum_order" :value="quantity_value" name="quantity" @change="changes()" class="quantity-field">
                                                    <input type="button" @click="increase(product.quantity)" value="+" class="button-plus" data-field="quantity">
                                                    <!-- <h6 style="margin-top:12px;font-size:14px">{{product.pack_label}}s</h6> -->
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    

                                   
                                    
                                </div>
                                <div class="row pb-3 d-flex justify-content-center">
                                    <!-- <button type="button" class="btn btn-warning mr-3" v-if="quantity_value > 0 && !error && product.minimum_order <= quantity_value" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button> -->
                                    <button type="button" :class="quantity_value > 0 && !error ? 'btn btn-warning mr-3' : 'btn btn-warning mr-3 disabled'" data-dismiss="modal" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    
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
                    <div class="mt-3 mb-3" v-if="notification.length"> Today</div>
                    
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

                <div class="col-md-3 ml-2" style="" v-if="show_cart">
                            <div class="row p-3" style="margin-top:-17px;background-color:#d8d4d4">
                                <h5><i class="fa fa-shopping-cart"></i>  {{cart_order.length}} items in cart</h5>   
                            </div>
                            <div class="row" style="margin-top:-15px">
                                <div style="margin-top:-15px" class="col-md-12 d-flex justify-content-center" v-for="(cart,index) in cart_order" :key="index">
                                        <!-- <router-link :to="{name:'vendorProduct',params: { id: vendor.id }}"> -->
                                        <div class="card p-2" style="height:7rem;width:100%;border-radius:0px">
                                            <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                            <div class="row g-0">
                                            <div class="col-md-3 mt-2"><img :src="cart.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                            <div class="col-md-6 mt-2 ml-1">
                                                <p class="fs-10 font-weight-bold text-black"> {{cart.name.length > 22 ? cart.name.substr(0, 22)+'...' : cart.name}}</p>
                                                <p class="fs-10 font-weight-bold text-black" style="margin-top:-20px"> Quantity {{cart.qty}}</p>
                                                <p class="fs-14 font-weight-bold text-black" style="margin-top:-20px">&#8358;{{ numberWithCommas(cart.amount) }}</p>
                                            </div>
                                            <!-- <div class="col-md-3 mt-4 fs-10"></div> -->
                                            <div class="col-md-2">
                                                <div class="mt-1">
                                                    <button @click="removeFromCart(cart_order,index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                    <button class="text-black h4" @click="increaseCart(cart_order,index)">+</button>
                                                    <button class="text-black h4" @click="decreaseCart(cart_order,index)">-</button>
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
                                <div class="col-sm-4 d-flex justify-content-end" v-if="wallet >= total">
                                    <button type="button" data-toggle="modal" data-target="#type" class="btn btn-warning pl-4 pr-4" style="border-radius:15px">Order</button>
                                </div>
                                
                            </div>
                            <div class="row align-items-end p-3" v-if="total > wallet">
                                    <span style="border-radius:15px;color:red;font-style:bold">Available balance is less than order</span>
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
                                          <span class="input-group-text" id="basic-addon3">Delivery Period</span>
                                         <select class="form-control" v-model="date" aria-label="Default select example">
                                            <option value="1">24 Hours</option>
                                            <option value="2">48 Hours</option>
                                            <option value="3">72 Hours</option>
                                        </select>
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