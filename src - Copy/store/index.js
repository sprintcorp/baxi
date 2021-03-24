import Vue from 'vue';
import Vuex from 'vuex';

import auth from './module/auth';
import business from './module/business';
import outlet from './module/outlet';
import order from './module/order';
import product from './module/product';

Vue.use(Vuex);

const modules = {
    auth,
    business,
    outlet,
    product,
    order,
};

export default new Vuex.Store({
    modules
})