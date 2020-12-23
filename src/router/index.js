import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "../config";

import WelcomeComponent from "../views/public/welcome/WelcomeComponent.vue";
import DashboardComponent from "../views/user/dashboard/DashboardComponent.vue";
import BusinessComponent from "../views/user/business/Business.vue";
import OutletComponent from "../views/user/outlet/Outlet.vue";
import TransactionComponent from "../views/user/transaction/Transaction.vue";
import ProductComponent from "../views/user/product/Product.vue";

Vue.use(VueRouter);

const preventRoutes = {
    beforeEnter: (to, from, next) => {
        if (getToken()) {
            next()
        } else {
            next('/')
        }
    }
};

const routes = [{
        name: "welcome",
        path: "/",
        component: WelcomeComponent,

    }, {
        name: "dashboard",
        path: "/user",
        component: DashboardComponent,
        ...preventRoutes
    }, {
        name: "business",
        path: "/business/:id",
        component: BusinessComponent,
        ...preventRoutes
    },
    {
        name: "outletOverview",
        path: "/outlet/:id",
        component: OutletComponent,
        ...preventRoutes
    },
    {
        name: "transactionOverview",
        path: "/transaction/overview/:id",
        component: TransactionComponent,
        ...preventRoutes
    },
    {
        name: "productOverview",
        path: "/product/overview/:id",
        component: ProductComponent,
        ...preventRoutes
    },


];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;