import { OutletService } from "../../services";
import { GET_BUSINESS_OUTLETS } from "../action";
import { SET_BUSINESS_OUTLETS } from "../mutation";

const initialState = {
    outlets: [],
};

const state = {...initialState };

const actions = {
    async [GET_BUSINESS_OUTLETS](context, payload) {
        const { data } = await OutletService.getOutlets(payload);
        context.commit(SET_BUSINESS_OUTLETS, data.data);
        return data;
    },

};

const mutations = {
    [SET_BUSINESS_OUTLETS](state, outlets) {
        state.outlets = outlets;
    },
};

const getters = {
    outlets(state) {
        return state.outlets;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}