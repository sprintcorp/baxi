import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "../config";

//Public page
import WelcomeComponent from "../views/public/welcome/WelcomeComponent.vue";

//Distributor
import DistributorLayoutComponent from "../components/layout/DistributorLayoutComponent.vue";
import DistributorDashboardComponent from "../views/distributor/dashboard/Dashboard.vue";
import DistributorProductCategoryComponent from "../views/distributor/category/Category.vue";
import DistributorProductComponent from "../views/distributor/product/Product.vue";
import DistributorOrderComponent from "../views/distributor/order/Order.vue";
import DistributorTransactionComponent from "../views/distributor/transaction/Transaction.vue";

//Retailer
import RetailerLayoutComponent from "../components/layout/RetailerLayoutComponent.vue";

import DemoLayoutComponent from "../components/layout/Demo.vue";
import DemoComponent from "../views/user/demo.vue";

import DashboardComponent from "../views/user/dashboard/Dashboard.vue";
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
        path: '/distributor',
        component: DistributorLayoutComponent,
        redirect: {
            name: 'distributorDashboard'
        },
        children: [{
                name: "distributorDashboard",
                path: "/distributor",
                component: DistributorDashboardComponent,
                ...preventRoutes
            }, {
                name: "distributorProductCategory",
                path: "/category",
                component: DistributorProductCategoryComponent,
                ...preventRoutes
            }, {
                name: "distributorProduct",
                path: "/product/:id",
                component: DistributorProductComponent,
                ...preventRoutes
            }, {
                name: "distributorOrder",
                path: "/order",
                component: DistributorOrderComponent,
                ...preventRoutes
            },
            {
                name: "distributorTransaction",
                path: "/transaction",
                component: DistributorTransactionComponent,
                ...preventRoutes
            }
        ]
    },
    {
        path: '/demo',
        component: DemoLayoutComponent,
        redirect: {
            name: 'demo'
        },
        children: [{
            name: "demo",
            path: "/demo",
            component: DemoComponent,

        }]
    }, {
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
                path: "/retailer/products/",
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
                path: "/retailer/profile",
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