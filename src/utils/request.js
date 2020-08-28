import axios from "axios";
import {getToken} from './token'
import {Message} from 'element-ui';

axios.defaults.baseURL = 'http://139.196.42.209:5004/api/';

//请求拦截器
axios.interceptors.request.use(function(config){
    //发送请求前,判断请求头token是否和设置的请求头一致
    config.headers['token'] = getToken();
    return config;
},function(error){
    //请求错误 返回拒绝原因
    //Promise.reject()方法返回一个带有拒绝原因的Promise对象
    return Promise.reject(error)
});

//相应拦截器
axios.interceptors.response.use(function(response){
    //响应数据
    if(response.data.code !==20000){
        if(response.data.code == 10001){
            Message({
                message:'token已过期,请重新登录',
                type:'warning',
                duration:2000
            })
        }else{
            Message({
                message:response.data.message,
                type:'warning',
                duration:2000
            })
        }
    }
    return response;
},function(error){
    Message({
        message:error.message,
        type:'error',
        duration:2000
    })
    //响应数据错误
    return Promise.reject(error)
});

export default axios;
