<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                        <div class="breadcrumbs">
                            <ul>
                                <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
                                <li><span>Profile</span></li>
                            </ul>
                        </div>
                        <section class="panel-content">    
                            <div class="row">
                            <div class="col-md-12">
                                <div class="widget">
                                <div class="widget-controls">
                                    <!-- <span class="close-content"><i class="fa fa-trash-o"></i></span> -->
                                    <span class="expand-content"><i class="fa fa-expand"></i></span>
                                    <span class="refresh-content"><i class="fa fa-refresh"></i></span>
                                </div>
                                <div class="our-clients-sec">
                                    <div class="widget-title">
                                    <h3> My Profile </h3>
                                    </div>
                                        <div class="col-md-12">
                                            <div class="input-group mb-2 mr-sm-2">
                                            <label for="exampleFormControlInput1" class="col-md-1 form-label">Name</label>
                                            <input type="text" :value="user.first_name +' '+ user.last_name +' '+ user.other_name" class="form-control" readonly>
                                            </div>

                                            <div class="input-group mb-2 mr-sm-2">
                                            <label for="exampleFormControlInput1" class="col-md-1 form-label">Email</label>
                                            <input type="text" :value="user.email" class="form-control" readonly>
                                            </div>
                                            
                                            <div class="input-group mb-2 mr-sm-2">
                                            <label for="exampleFormControlInput1" class="col-md-1 form-label">Username</label>
                                            <input type="text" :value="user.user_name" class="form-control" readonly>
                                            </div>
                                            
                                            <div class="input-group mb-2 mr-sm-2">
                                            <label for="exampleFormControlInput1" class="col-md-1 form-label">Phone</label>
                                            <input type="text" :value="user.phone_number" class="form-control" readonly>
                                            </div>
                                            
                                        </div>
                                    

                                    


                                    </div>
                                </div>
                            </div>                            
                            </div>
                        </section>


                    </div>
                </div>
            </div>
        </div>
    <!-- </RetailerLayoutComponent> -->
</template>
<script src="./Profile.js">
</script>

<style scoped>
</style>