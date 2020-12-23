import axios from "axios";
import {
    BASE_URL
} from "../env";
import { getToken } from "../config";

if (getToken()) {
    axios.defaults.headers.common['Authorization'] = getToken();
    console.log(getToken());
}

const baseHandler = axios.create({
    baseURL: BASE_URL,
    timeout: 1000000
});

baseHandler.interceptors.request.use(function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error)
    });

baseHandler.interceptors.response.use(function(response) {
        return response
    },

    function(error) {
        if (error.response.data.status === 401) {
            location.reload();
        }
        return Promise.reject(error)
    });

class BaseHandler {
    constructor() {
        this.axios = axios;
    }

    setHeader(header) {
        baseHandler.defaults.headers.common[header.key] = header.value;
        baseHandler.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    query(res, params) {
        return baseHandler.get(res, params);
    }

    get(res, slug = "") {
        return baseHandler.get(`${ res }/${slug}`);
    }

    patch(res, params) {
        return baseHandler.patch(`${res}`, params);
    }

    post(res, params) {
        return baseHandler.post(`${res}`, params);
    }

    update(res, slug, params) {
        return baseHandler.put(`${res}/${slug}`, params);
    }

    put(res, params) {
        return baseHandler.put(`${res}`, params);
    }

    delete(res, params) {
        return baseHandler.delete(res, params);
    }
}

export default BaseHandler;