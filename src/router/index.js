import Vue from "vue";
import VueRouter from "vue-router";
import { getToken,getPermissions } from "../config";

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
import OrderCategoryComponent from "../views/user/category/Category.vue";
import VendorComponent from "../views/user/vendor/Vendor.vue";
import VendorProductComponent from "../views/user/vendor_product/Product.vue";
import BusinessComponent from "../views/user/business/Business.vue";
import OutletComponent from "../views/user/retailer_outlet/Outlet.vue";
import OrderHistoryComponent from "../views/user/order_history/OrderHistory.vue";
import TransactionComponent from "../views/user/transaction/Transaction.vue";
import ProductComponent from "../views/user/product/Product.vue";
import WalletComponent from "../views/user/wallet/Wallet.vue";
import OrderComponent from "../views/user/order/Orders.vue";
import DistributorOrdersComponent from "../views/user/distributor/Order.vue";
import RetailerOrderOverviewComponent from "../views/user/order_overview/Order.vue";
import RetailerOrderComponent from "../views/user/place_order/PlaceOrder.vue";
import RetailerProfileComponent from "../views/user/profile/Profile.vue";
import RestockLevelComponent from "../views/user/restock_level/RestockLevel.vue";

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
                name: "categoryOrder",
                path: "/order/category",
                component: OrderCategoryComponent,
                ...preventRoutes
            },
            {
                name: "categoryVendor",
                path: "/category/vendor/:id",
                component: VendorComponent,
                ...preventRoutes
            },
            {
                name: "vendorProduct",
                path: "/vendor/product/:id",
                component: VendorProductComponent,
                ...preventRoutes,
                meta: { authorize: 'order products' } 
            },
            {
                name: "walletHistory",
                path: "/wallet/history",
                component: WalletComponent,
                ...preventRoutes,
                meta: { authorize: 'order products' } 
            },
            {
                name: "restockLevel",
                path: "/outlet/restock/level",
                component: RestockLevelComponent,
                ...preventRoutes,
                // meta: { authorize: 'order products' } 
            },
            {
                name: "outletOverview",
                path: "/retailer/outlet/:id",
                component: OutletComponent,
                ...preventRoutes
            },
            {
                name: "transactionOverview",
                path: "/transaction/overview/",
                component: TransactionComponent,
                ...preventRoutes
            },
            {
                name: "productOrderOverview",
                path: "/retailer/distributor/orders/",
                component: OrderHistoryComponent,
                ...preventRoutes,
                meta: { authorize: 'order products' } 
            },
            {
                name: "distributorOrders",
                path: "/distributor/orders/",
                component: DistributorOrdersComponent,
                ...preventRoutes,
                meta: { authorize: 'order products' } 
            },
            {
                name: "productOverview",
                path: "/retailer/products/",
                component: ProductComponent,
                ...preventRoutes,
                meta: { authorize: 'view products' } 
            },
            {
                name: "orderInformation",
                path: "/retailer/distributor/orders/:id",
                component: OrderComponent,
                ...preventRoutes,
                meta: { authorize: 'order products' } 
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
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const authorize  = to.meta;
    const userPermission = getPermissions();

  console.log(userPermission);

        // check if route is restricted by role
        if (authorize.authorize) {
            const found = userPermission.some(permission => permission.action === authorize.authorize);
            if (found){
                next();
              }else{
                next(router.back())
              }
            console.log(authorize.authorize)
            // next();
        }
    

    next();
})

export default router;