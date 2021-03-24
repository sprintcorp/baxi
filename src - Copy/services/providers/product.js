import BaseHandler from "../../handler/handler";

class ProductProvider extends BaseHandler {
    createProduct(payload) {
        return this.post('/my/outlet/' + payload.outlet + '/products/new', payload);
    }
}
export default ProductProvider;