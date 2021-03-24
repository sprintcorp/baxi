<template>
    <div>
        <HeaderComponent>
            <slot></slot>
        </HeaderComponent>

        <router-view/> 

        <FooterComponent>
        </FooterComponent>
    </div>
</template>

<script>
    import HeaderComponent from "../partials/distributor/HeaderComponent";
    // import BodyComponent from "../partials/BodyComponent";
    import FooterComponent from "../partials/distributor/FooterComponent";

    export default {
        name: "RetailerLayoutComponent",
        components: {HeaderComponent, FooterComponent}
    }
</script>

<style scoped>

</style>
