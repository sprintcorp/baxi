import BaseHandler from "../../handler/handler";

class OrderProvider extends BaseHandler {
    createOrder(payload) {
        return this.post('/my/retailer/orders', payload);
    }

    createRetailerOrder(payload) {
        return this.post('/my/distributor/orders', payload);
    }
}
export default OrderProvider;