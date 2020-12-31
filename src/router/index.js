import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "../config";

import WelcomeComponent from "../views/public/welcome/WelcomeComponent.vue";
import RetailerLayoutComponent from "../components/layout/RetailerLayoutComponent.vue";
import DashboardComponent from "../views/user/dashboard/DashboardComponent.vue";
import BusinessComponent from "../views/user/business/Business.vue";
import OutletComponent from "../views/user/outlet/Outlet.vue";
import TransactionComponent from "../views/user/transaction/Transaction.vue";
import ProductComponent from "../views/user/product/Product.vue";
import OrderComponent from "../views/user/order/Orders.vue";
import RetailerOrderOverviewComponent from "../views/user/order_overview/Order.vue";
import RetailerOrderComponent from "../views/user/place_order/PlaceOrder.vue";
import RetailerProfileComponent from "../views/user/profile/Profile.vue";

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

    },

    {
        path: '/retailer',
        component: RetailerLayoutComponent,
        redirect: {
            name: 'dashboard'
        },
        children: [{
                name: "dashboard",
                path: "/retailer",
                component: DashboardComponent,
                ...preventRoutes
            },
            {
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
            {
                name: "outletOrder",
                path: "/my/order/:id",
                component: OrderComponent,
                ...preventRoutes
            },
            {
                name: "retailerOrder",
                path: "/user/order/:id",
                component: RetailerOrderComponent,
                ...preventRoutes
            },
            {
                name: "retailerOrderOverview",
                path: "/retailer/order/:id",
                component: RetailerOrderOverviewComponent,
                ...preventRoutes
            },
            {
                name: "retailerProfile",
                path: "/retailer/profile/:id",
                component: RetailerProfileComponent,
                ...preventRoutes
            },
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;