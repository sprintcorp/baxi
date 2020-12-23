import BaseHandler from "../../handler/handler";

class AuthProvider extends BaseHandler {
    register(payload) {
        return this.post("", payload);
    }

    login(payload) {
        return this.post("/users/loginByUserId", payload);
    }

    getUserInformation() {
        return this.query("");
    }
}

export default AuthProvider;