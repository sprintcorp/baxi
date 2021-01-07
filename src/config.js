import { BASE_URL, AUTH_TOKEN, NAME, ID, OUTLET,ROLE } from "./env";

export const saveToken = (token) => {
    window.localStorage.setItem(AUTH_TOKEN, token);
};

export const saveUser = (user) => {

    window.localStorage.setItem(NAME, user.info.first_name + " " + user.info.last_name);
    window.localStorage.setItem(ID, user.id);
    window.localStorage.setItem(ROLE, user.role[0].name);
};



export const saveUserData = (data) => {
    console.log(data.data);
    saveToken(data.data.token);
    saveUser(data.data.user);

};

export const saveOutlet = (data) => {
    window.localStorage.setItem(OUTLET, data);

};

export const getOutlet = () => {
    return window.localStorage.getItem(OUTLET);
};

export const isValidToken = (token = this.getToken) => {
    return splitToken(token).iss === BASE_URL + 'api/v1/users/loginByUserId';
};

export const hasToken = (token) => {
    return isValidToken(token);
};

export const splitToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
};

export const getToken = () => {
    return window.localStorage.getItem(AUTH_TOKEN);
};

export const getName = () => {
    // if (hasToken(getToken())) {
    return window.localStorage.getItem(NAME);
    // }
};

export const getRole = () => {
    // if (hasToken(getToken())) {
    return window.localStorage.getItem(ROLE);
    // }
};
export const getId = () => {
    return window.localStorage.getItem(ID);
};

export const removeToken = () => {
    return window.localStorage.removeItem(AUTH_TOKEN);
};

export const removeUser = () => {
    window.localStorage.removeItem(NAME);
    window.localStorage.removeItem(ID);
};

export const logout = () => {
    removeToken();
    removeUser();
};