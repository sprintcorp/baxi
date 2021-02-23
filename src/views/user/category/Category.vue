<template>
    <div>
        <div class="container mt-5">
           <div class="row">
               <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="font-weight-bold h4">Order Categories</div>
                            <div class="p">Please pick a category of products you would want to make an order</div>
                        </div>
                        <div class="col-md-4 d-flex justify-content-end">
                        <form class="form-inline search-form my-2 my-lg-0" style="width:100%">
                            <input type="text" v-model="search" @change="checkfield()" placeholder="Search Products" style="background-color:white;width:90% !important;border-radius:20px"/>
                            <button type="submit" @click.prevent="searchProduct()"><i class="fa fa-search"></i></button>
                        </form>
                        
                        </div>
                    </div>
                    <div class="row mt-3">
                        <router-link :to="{name:'productOrderOverview'}"><button class="btn btn-warning" style="border-radius:20px"><i class="fa fa-calendar"></i> Order History</button></router-link>
                    </div>
                    <div class="row">
                        <!-- {{show_business}} -->
                        <div v-if="!show_business">
                            <div class="col-md-12" v-if="categories.length && !loading && search.length < 1">
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
                        </div>
<!-- {{show_cart}} -->
                        
                        <div class="row mr-2" v-if="show_business">
                            <div :class="[!show_cart ? 'col-md-12' : 'col-md-8']" style="">
                                <div class="row">
                                    <div :class="[!show_cart ? 'col-md-4 d-flex justify-content-center' : 'col-md-6 d-flex justify-content-center']" v-for="(product,index) in list_products" :key="index">
                                        <div class="card p-2" style="width: 25rem;height:8rem;border-radius:0px">
                                            <!-- <div class=""> -->
                                                <div class="row g-0">
                                                <div class="col-md-2 mr-2"><img :src="product.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                                <div class="col-md-7">
                                                    <p class="fs-14 font-weight-bold text-black"> {{product.name.length > 22 ? product.name.substr(0, 22)+'...' : product.name}}</p>
                                                    <p class="fs-12 font-weight-bold text-black" style="margin-top:-20px">{{product.size}}</p>
                                                    <p class="fs-12 font-weight-bold text-black" style="margin-top:-5px"> &#8358; {{ numberWithCommas(product.price) }}.00</p>
                                                    <p class="fs-10 font-weight-bold text-black" style="margin-top:-19px"> {{product.quantity}} units - {{product.business_name}}</p>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="mt-4">
                                                        <button @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">
                                                            <i class="fa fa-shopping-cart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                </div>
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4" v-if="show_cart">
                                <!-- <div class="col-md-3" style="" v-if="show_cart"> -->
                                <div class="row p-3" style="margin-top:-17px;background-color:#d8d4d4">
                                    <h5><i class="fa fa-shopping-cart"></i>  {{cart_order.length}} items added to order</h5>   
                                </div>
                                <div class="row" style="margin-top:-15px">
                                    <div style="margin-top:-15px" class="col-md-12 d-flex justify-content-center" v-for="(carts,index) in cart_order" :key="index">
                                            
                                            <div class="card p-2" style="width:100%;height:6.5rem;border-radius:0px">
                                                <!-- hello -->
                                                <div class="row g-0">
                                                <div class="col-md-2 mt-2"><img :src="carts.image" class="rounded-circle" alt="" width="70" height="70"/></div>
                                                <div class="col-md-5 mt-2 ml-1">
                                                    <p class="fs-10 font-weight-bold text-black"> {{carts.name}}</p>
                                                    <p class="fs-10 font-weight-bold text-black" style="margin-top:-20px"> Quantity {{carts.qty}}</p>
                                                </div>
                                                <div class="col-md-3 mt-4 fs-10">&#8358;{{ numberWithCommas(carts.amount) }}</div>
                                                <div class="col-md-1">
                                                    <div class="mt-4">
                                                        <button @click="removeFromCart(cart_order,index)">
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            
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


                            <!-- </div> -->
                            </div>


                            
                        </div>



                            <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="product" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                
                                <div class="modal-content">
                                    <div class="card rounded-circle text-center p-3" style="width:6rem;height:6rem;margin-top:-50px;background-color:#ffc107;border:0px">
                                        <i class="fa fa-shopping-cart" style="font-size:50px"></i>
                                    </div>
                                    <button type="button" class="btn btn-light" style="border-radius:20px;color:red;position:absolute;right:0" data-dismiss="modal">X</button>                                    
                                    <div class="row text-center">
                                        <div class="col-md-12">
                                            <div class="fs-20 font-weight-bolder text-black">Add this item to order?</div>                                        
                                        </div>
                                    </div>
                                    
                                <div class="modal-body" style="margin-top:-30px">
                                     <div class="row card border-0">
                                         
                                        <div class="text-center"><img :src="product.image" width="100" height="100"/></div>
                                        <div class="fs-15 mt-2 text-center" v-if="product.size">{{product.name}} - {{product.size}}</div>
                                        <div class="fs-15 mt-2 text-center" v-if="!product.size">{{product.name}}</div>
                                        <div class="fs-15 mt-1 text-center">&#8358; {{numberWithCommas(product.price)}}.00</div>
                                        <!-- <div class="fs-15 mt-1 text-center">{{ product.quantity }} Quantity</div> -->
                                        <!-- <div class="fs-15 mt-1 text-center">{{ product.size }} </div> -->
                                        <!-- <div class="fs-15 mt-1 text-center">N:B Minimum Order {{ product.minimum_order }}</div> -->
                                        <div class="fs-15 mt-3 text-center">Select Quantity (Packs)</div>
                                        <div class="fs-15 text-center"><small>{{product.pack_qty}} unit/pack</small></div>
                                        <div class="row">
                                             <div class="col-md-12 d-flex justify-content-end">
                                                <div class="input-group rm">
                                                    <input type="button" @click="decrease(product.quantity)" v-if="quantity_value > product.minimum_order" value="-" class="button-minus" data-field="quantity">
                                                    <input type="button" value="-" v-if="quantity_value <= product.minimum_order"  class="button-minus" data-field="quantity">
                                                    <input type="number" step="1" :max="product.quantity" :min="product.minimum_order" :value="quantity_value" name="quantity" @change="changes()" class="quantity-field">
                                                    <input type="button" @click="increase(product.quantity)" value="+" class="button-plus" data-field="quantity">
                                                    <!-- <h6 style="margin-top:12px;font-size:14px">{{product.pack_label}}s</h6> -->
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    

                                   
                                    
                                </div>
                                <div class="row p-5 d-flex justify-content-center" style="margin-bottom:-20px">
                                    <button type="button" class="btn btn-warning mr-3" v-if="quantity_value > 0 && !error && product.minimum_order <= quantity_value" @click="submitToCart(quantity_value,product)" style="border-radius:20px"><i class="fa fa-shopping-cart"></i> ADD TO CART</button>
                                    
                                </div>
                                 <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="error">Selected quantity is more than available quantity</div>
                                        <div class="fs-15 mt-3 mb-1 text-center" style="color:red" v-if="product.minimum_order > quantity_value && quantity_value > 0">Selected quantity is less than minimum order pack</div>
                                   
                                </div>
                            </div>
                        </div>
                        

                        <div class="row col-md-12">
                            <Loading v-if="!categories.length && loading || saving"></Loading>
                            <div class="card" v-if="!categories.length && !loading && !show_business">
                                <div class="card-body text-center">
                                    There are no category at the moment
                                </div>
                            </div>
                            <div class="card" v-if="!list_products.length && !loading && show_business">
                                <div class="card-body text-center">
                                    There are no product for this search at the moment
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-md-1"></div> -->
                <!-- <div class="col-md-3 ml-4" style="" v-if="!show_cart">
                    <div class="row">
                        <div class="font-weight-bold h4">Order Notifications</div>
                    </div>
                    <div class="mt-3 mb-3" v-if="notification.length"> Today <i class="fa fa-angle-down"></i></div>

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
                </div> -->


                 
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
            <!-- <Loading v-if="loading || saving"></Loading> -->


        </div>
    </div>
</template>


<style scoped>

</style>

<script src="./Category.js">
</script>