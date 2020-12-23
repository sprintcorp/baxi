import { ProductService } from "../../services";
import { CREATE_PRODUCT } from "../action";



const actions = {
    async [CREATE_PRODUCT](context, payload) {
        const { data } = await ProductService.createProduct(payload);
        return data;
    },
};


export default {
    actions,
}