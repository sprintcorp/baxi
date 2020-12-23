import BaseHandler from "../../handler/handler";

class BusinessProvider extends BaseHandler {
    getBusinesses(payload) {
        return this.get('/my/businesses', payload);
    }
}
export default BusinessProvider;