import { OrderService } from "../../services";
import { CREATE_ORDER, CREATE_RETAILER_ORDER } from "../action";



const actions = {
    async [CREATE_ORDER](context, payload) {
        const { data } = await OrderService.createOrder(payload);
        return data;
    },
    async [CREATE_RETAILER_ORDER](context, payload) {
        const { data } = await OrderService.createRetailerOrder(payload);
        return data;
    },
};


export default {
    actions,
}