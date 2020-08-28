// VUE_vue中本地存储sessionStorage 去存储token、获取token，删除token

//设置键名，这里设置的是固定的
const tokenKey = 'admin-token';

//设置token
export function setToken(token){
    return sessionStorage.setItem(tokenKey,token);
}
//获取token
export function getToken(){
    return sessionStorage.getItem(tokenKey)
}
//删除token
export function removeToken(){
    return sessionStorage.removeItem(tokenKey)
}