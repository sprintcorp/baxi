<template>
  <!-- <RetailerLayoutComponent> -->
    <div>
      <div class="main-content style2" style="background-color: white;min-height:80vh">
        <div class="heading-sec">
          <div class="row">
            <div class="col-md-9" style="border-right:2px solid black">
              <div class="row mt-5">
                <div class="col-md-6 column">
                  <div class="heading-profile">
                    <h2>
                      Welcome back, <span>{{ name }}!</span
                      > 
                    </h2>
                  </div>
                </div>

                <div class="col-md-6">
                  
                  <div class="d-flex justify-content-end">
                    <button  class="btns shadow white-skin sml-btn sml-radius text-black mr-2 p-2"  style="border-radius:25px;border:2px solid black">
                      <i class="fa fa-microchip"></i> Restock Level
                    </button>
                    <button  class="btns shadow yellow-skin sml-btn sml-radius text-black p-2"  style="border-radius:25px">
                      <i class="fa fa-plus-circle"></i> Add Product 
                    </button>
                  </div>
                </div>
              </div>

              <div class="row mt-5">
                
                
              <div class="row">
                <section class="panel-content">
                   
                </section>
              </div>
              </div>
            </div>

             <div class="col-md-3 mt-5">
               <div class="row ml-3">
                  <div class="heading-profile">
                    <h4 class="font-weight-bold">
                     Inventory Summary
                    </h4>
                  </div>
               </div>
               <div class="row ml-3 p-4" style="border:1px solid grey;border-radius:10px;width:330px">
                 <div class="col-md-12">
                   <div class="row">
                     <div class="col-md-7">PRODUCTS SOLD</div>
                     <div class="col-md-1">|</div>
                     <div class="col-md-3">10099883</div>
                   </div>
                   <hr>
                   <div class="row">
                     <div class="col-md-7">PRODUCTS LEFT</div>
                     <div class="col-md-1">|</div>
                     <div class="col-md-3">10099883</div>
                   </div>
                 </div>                  
               </div>
               <div class="row ml-3">
                  <div class="heading-profile">
                    <h4 class="font-weight-bold">
                     Top Selling Products
                    </h4>
                  </div>
               </div>
               <div class="row ml-3 p-4" style="border:1px solid grey;border-radius:10px;width:330px">
                 <div class="col-md-12">
                   <div class="row">
                     <div class="col-md-6"><img src="/images/baxi.png" alt="" width="100" height="100"></div>
                     <div class="col-md-6">
                       <div>Product name</div>
                       <div>Product id</div>
                       <div>Amount Sold</div>
                       <div>Amount Left</div>
                     </div>
                   </div>
                   <hr>
                  
                 </div>                  
               </div>

             </div>
          </div>

          

        </div>

        <!-- All Businesses -->
        
      </div>
    </div>
  <!-- </RetailerLayoutComponent> -->
</template>

<script src="./Dashboard.js">
</script>

<style scoped>
</style>
