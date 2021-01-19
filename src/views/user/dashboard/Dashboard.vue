<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="container-fluid p-2" style="background-color: white;min-height:80vh">
        <div class="heading-sec">
          <div class="row p-5">
            <div class="col-md-12 ml-5" style="">   
                  <div class="heading-profile">
                    <h2 class="text-black">
                      Welcome back, <span>{{ username }}!</span> 
                    </h2>
                  </div>             
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 d-flex justify-content-start">
             <form class="form-inline search-form my-2 my-lg-0" style="width:90%">
                    <input type="text" v-model="search" placeholder="Type to search for a product" style="background-color:white;width:97%;border-radius:20px"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
              </form>
            </div>
          </div>

          <div class="row p-5">
            <div class="col-md-9 col-sm-2"><i class="fa fa-arrow-left fs-20"></i></div>
            <!-- <div class="col-md-1 col-sm-2" style="margin-right:-30px"><i class="fa fa-shopping-cart fs-20"></i></div> -->
            <div class="col-md-3 col-sm-3 d-flex justify-content-end">
              <select class="form-control" @change="getResponse()" v-model="type" aria-label="Default select example">
                <option value="product">View Product</option>
                <option value="category">View Category</option>
              </select>
            </div>
          </div>
          
          <div class="row">
            <div :class="[!show_cat ?  'col-md-12' : 'col-md-9']">
                        <div class="col-md-12" v-if="results.length && !loading">
                            <div class="row" v-if="cat">
                                <div class="col-md-3 d-flex justify-content-center" v-for="(category,index) in filerResult" :key="index">
                                    <router-link :to="{name:'categoryVendor',params: { id: category.id }}">
                                    <div class="card p-2" style="width: 15rem;height:10rem">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="text-center mt-3"><img :src="category.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="card-body text-center">
                                           <p class="fs-13"> {{category.name}}</p>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>

                            <div class="row" v-if="!cat">
                                <div class="col-md-3 d-flex justify-content-center" v-for="(product,index) in filerResult" :key="index">
                                    <!-- <router-link :to="{name:'categoryVendor',params: { id: category.id }}"> -->
                                    <div class="card p-2" style="width: 16rem;height:18rem">
                                        <!-- <div style="font-size:100px"><i class="fa fa-beer"></i></div> -->
                                        <div class="text-center mt-1"><img :src="product.public_image_url" class="rounded-circle" alt="" width="70" height="70"/></div>
                                        <div class="card-body text-center">
                                           <p class="fs-13"> {{product.name}}</p>
                                           <p class="fs-13"> {{product.qty}} Quantity</p>
                                           <p class="fs-13"> &#8358; {{ product.amount }}</p>
                                        </div>
                                        <button v-if="permission" class="btn btn-warning btn-block" @click="addToCart(product,index)" data-toggle="modal" data-target="#cart">Sell</button>
                                        <button v-if="!permission" class="btn btn-warning btn-block" @click="warning()">Sell</button>
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>

                        </div>

                        <div class="row col-md-12">
                            <div v-if="!results.length && loading" style="text-align:center;position: absolute;left: 50%;top: 50%;">                  
                                <div class="spinner-grow mt-5" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <br>
                                Loading...
                                                    
                            </div>
                            <div class="card" v-if="!filerResult.length && !loading">
                                <div class="card-body text-center">
                                    There are no response with your search words at the moment
                                </div>
                            </div>
                            <div class="card" v-if="!results.length && !loading">
                                <div class="card-body text-center">
                                    There are no products at the moment
                                </div>
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
                                        <div class="text-center"><img :src="product.public_image_url" width="100" height="100"/></div>
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

            <div class="col-md-3" v-if="show_cat" style="min-height:50vh">
              <div class="bg-dark" style="width:100%">
                  <table class="table table-dark">
                    <thead class="">
                        <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, i) in cart" :key='i'>
                           <td>{{product.name}}</td>
                           <td>{{product.quantity}}</td>
                           <td>₦{{product.price}}</td>
                           <td><button @click="removeFromCart(cart,i)">
                                                        <i class="fa fa-trash" style="color:white"></i>
                                                    </button></td>
                         </tr>
                        <br><br><br><br><br><br><br><br><br><br>
                        <tr>
                           <td>TAX</td>
                           <td></td>
                           <td></td>
                           <td>₦300</td>
                         </tr>
                        <tr>
                           <td>Total</td>
                           <td></td>
                           <td>{{cart.length}}</td>
                           <td>₦{{total}}</td>
                         </tr>
                         
                    </tbody>
                    </table>
                    <div class="row d-flex">
                    <div class="align-self-center mx-auto" style="margin-bottom:-20px">
                       <button class="btn btn-warning rounded-pill text-dark px-5 py-2" data-toggle="modal" data-target="#modeofpaymentModal">Pick a payment method</button>
                    </div>
                    </div>
                </div>
            </div>



            <div class="modal fade" id="modeofpaymentModal" tabindex="-1" role="dialog" aria-labelledby="modeofpaymentModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title font-weight-bold"> Pick a payment method</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body row">
        <div class="col-md-4 ">
          <div class="card mt-1 h-100">
              <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img8.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center">
                   <a href="#" class="nav-link text-dark" data-toggle="modal" data-target="#optionModal" data-dismiss="modal">
                     Wallet to Wallet
                     </a> 
                </div>
          </div>
        </div>
        <div class="col-md-4 ">
          <div class="card mt-1 h-100">
               <div class="mx-auto mt-1">
                <img :src="require('@/assets/images/img9.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center">
                    POS
                </div>
          </div>
        </div>
        <div class="col-md-4 ">
          <div class="card mt-1 h-100">
                <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img10.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center">
                    USSD
                </div>
          </div>
        </div>
        <div class="col-md-4 pt-3">
          <div class="card mt-1 h-100">
                <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img11.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center">
                   <!-- <a href="#exampleModalCenter" class="nav-link text-dark"> -->
                    Bank Transfer
                    <!-- </a>  -->
                </div>
          </div>
        </div>
        <div class="col-md-4 pt-3">
          <div class="card mt-1 h-100">
             <div class="mx-auto mt-1">
                  <img :src="require('@/assets/images/img12.png')" class='rounded' alt="img"/>
              </div>
                <div class="card-body text-center">
                    Cash
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="optionModal" tabindex="-1" role="dialog" aria-labelledby="optionModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button class="btn btn-outline-secondary rounded-pill">Wallet to wallet</button>
        <button type="button" class="" data-dismiss="" aria-label="">
          <span aria-hidden="true" class="text-primary mt-3" data-toggle="modal" data-target="#modeofpaymentModal" data-dismiss="modal">&leftarrow; Back to payment methods</span>
        </button>
      </div>
      <div class="modal-body text-center text-dark">
        <p class="">Please give the customer the Account ID <br> below to make payments.
        </p>
         <button class="btn btn-outline-secondary rounded-pill">Account ID: RST12345</button> <br>
         <a href="/CashierPayment" class="btn btn-warning rounded-pill mt-4">Continue</a>
      </div>
    </div>
  </div>
</div>
          </div>

        </div>
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Dashboard.js">
</script>

<style scoped>
th{
  font-size: 12px;
}
td{
  font-size: 13px;
}
</style>
