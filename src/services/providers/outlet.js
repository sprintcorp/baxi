import BaseHandler from "../../handler/handler";

class OutletProvider extends BaseHandler {
    getOutlets(payload) {
        return this.get('my/outlets/business/' + payload);
    }
}
export default OutletProvider;