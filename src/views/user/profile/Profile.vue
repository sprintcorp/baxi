<template>
    <!-- <RetailerLayoutComponent> -->
        <div>
            <div class="main-content style2" style="background-color: #e8edf2;min-height:80vh">
                <div class="heading-sec">
                    <div class="row">
                        <div class="breadcrumbs">
                            <ul>
                                <li><router-link :to="{name:'dashboard'}" title="">Home</router-link></li>
                                <li><router-link :to="{name: 'outletOverview', params: { id: outlet }}" title="">Outlet</router-link></li>
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