import { BusinessService } from "../../services";
import { GET_BUSINESS } from "../action";
import { SET_BUSINESS } from "../mutation";

const initialState = {
    businesses: [],
};

const state = {...initialState };
const actions = {
    async [GET_BUSINESS](context) {
        const { data } = await BusinessService.getBusinesses();
        context.commit(SET_BUSINESS, data.data);
        return data;
    },
};

const mutations = {
    [SET_BUSINESS](state, businesses) {
        state.businesses = businesses;
    },
};

const getters = {
    businesses(state) {
        return state.businesses;
    }
};

export default {
    actions,
    state,
    getters,
    mutations

}