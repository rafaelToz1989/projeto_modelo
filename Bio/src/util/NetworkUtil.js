import axios from 'axios'
import AuthUtil from './AuthUtil';
import LogUtil from './LogUtil';
import ApiUsers from '../api/ApiUsers';


let isRefreshing = false;
let refreshSubscribers = [];

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

const refreshAccessToken = (response) => {
    return new Promise((resolve, reject) => {
        ApiUsers.getTokenByRefreskToken((token) => {
            resolve(token)
        }, (error) => { 
            console.log(error)
            console.log("fail refresh token")
            reject(error)
         })
    })
}

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
}

const onRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}

httpClient.interceptors.response.use(response => {
    return response;
}, error => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
        console.log(isRefreshing)
        if (!isRefreshing) {
            isRefreshing = true;
            refreshAccessToken()
                .then(newToken => {
                    isRefreshing = false;
                    AuthUtil.setToken(newToken)
                    onRefreshed(newToken.accessToken);
                }).catch(error =>{
                    isRefreshing = false;
                    if(error.message === "KEY_INVALID_REFRESH_TOKEN"){
                        AuthUtil.logoutUser()
                    }
                });
        }

        const retryOrigReq = new Promise((resolve, reject) => {
            subscribeTokenRefresh(token => {
                // replace the expired token and retry
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                resolve(httpClient(originalRequest));
            });
        });
        return retryOrigReq;
    } else {
        return Promise.reject(error);
    }
});



class NetworkUtil {




    static doRequest(method, route, body, onSuccess, onError) {
        var accessToken = AuthUtil.getAccessToken()

        httpClient({
            method: method,
            url: route,
            data: body,
            headers: {
                Authorization: "Bearer " + accessToken
            }
        }).then(response => {
            onSuccess(response.data)
        })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    onError(error.response.data)
                }
                if (error.response) {
                    if (error.response.status === 401) {
                        AuthUtil.logoutUser()
                    }
                } else {
                    LogUtil.log(error.message);
                }
            })
    }
}
export default NetworkUtil