import BusinessProvider from "./providers/businesses";
import AuthProvider from "./providers/auth";
import OutletProvider from "./providers/outlet";
import ProductProvider from "./providers/product";
import OrderProvider from "./providers/order";


export const BusinessService = new BusinessProvider();
export const OutletService = new OutletProvider();
export const ProductService = new ProductProvider();
export const AuthService = new AuthProvider();
export const OrderService = new OrderProvider();