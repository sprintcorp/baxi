import { OrderService } from "../../services";
import { CREATE_ORDER } from "../action";



const actions = {
    async [CREATE_ORDER](context, payload) {
        const { data } = await OrderService.createOrder(payload);
        return data;
    },
};


export default {
    actions,
}