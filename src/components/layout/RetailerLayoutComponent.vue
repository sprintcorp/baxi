<template>
    <div>
        <HeaderComponent>
            <slot></slot>
        </HeaderComponent>

        <router-view/> 

        <!-- <FooterComponent>
        </FooterComponent> -->
    </div>
</template>

<script>
    import HeaderComponent from "../partials/retailer/DemoComponent";
    // import BodyComponent from "../partials/BodyComponent";
    // import FooterComponent from "../partials/retailer/FooterComponent";

    export default {
        name: "RetailerLayoutComponent",
        components: {HeaderComponent}
    }
</script>

<style scoped>

</style>
