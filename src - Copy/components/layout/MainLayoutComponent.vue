<template>
    <div>
        <HeaderComponent>
            <slot></slot>
        </HeaderComponent>

        <slot></slot>

        <FooterComponent>
            <slot></slot>
        </FooterComponent>
    </div>
</template>

<script>
    import HeaderComponent from "../partials/HeaderComponent";
    // import BodyComponent from "../partials/BodyComponent";
    import FooterComponent from "../partials/FooterComponent";

    export default {
        name: "MainLayoutComponent",
        components: {HeaderComponent, FooterComponent}
    }
</script>

<style scoped>

</style>
