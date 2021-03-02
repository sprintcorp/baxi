import { BASE_URL, AUTH_TOKEN, NAME, ID, OUTLET, ROLE,PERMISSION, CASHIER_BUSINESS, CASHIER_OUTLET } from "./env";

export const saveToken = (token) => {
    let bearer_token = "Bearer "+token;
    window.localStorage.setItem(AUTH_TOKEN, bearer_token);
};

export const saveUser = (user) => {
    if(user.roles[0].name == 'Retailer'){
        window.localStorage.setItem(NAME, user.buid);
        window.localStorage.setItem("retailer_business", user.business_id);
        window.localStorage.setItem("retailer_outlet", JSON.stringify(user.outlets_ids[0]));
    }else{
        window.localStorage.setItem(NAME, user.buid); 
        window.localStorage.setItem(CASHIER_OUTLET,user.outlet_id)
        window.localStorage.setItem(CASHIER_BUSINESS,user.business_id)
    }
    window.localStorage.setItem(ID, user.id);
    window.localStorage.setItem(ROLE, user.roles[0].name);
    window.localStorage.setItem("image", user.public_image_url);
    // window.localStorage.setItem(PERMISSION, JSON.stringify(user.roles[0].permissions));
    console.log(user.roles[0].name)
};

export const savePermission = (data,role) =>{
    if(role.toLowerCase() == 'distributor'){
    data.push( {action:"distributor"})
    window.localStorage.setItem(PERMISSION, JSON.stringify(data)); 

    }else{

    window.localStorage.setItem(PERMISSION, JSON.stringify(data));

    }
}

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

export const getPermissions = () => {
    return JSON.parse(window.localStorage.getItem(PERMISSION));
};

export const checkUserPermission = (data)=>{
    const found = getPermissions().some(permission => permission.action == data);
        if (found){
            return true
        }else{
            return false
        }
}

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
    window.localStorage.removeItem("retailer_business");
    // window.localStorage.removeItem("retailer_reta");
    window.localStorage.removeItem("ledger-balance");
    window.localStorage.removeItem(ROLE);
    window.localStorage.removeItem(PERMISSION);
    window.localStorage.removeItem("outlet_name");
    window.localStorage.removeItem("wallet-balance");
    
    window.localStorage.removeItem("cahier_outlet");
    window.localStorage.removeItem("cahier_business");
};

export const logout = () => {
    removeToken();
    removeUser();
};