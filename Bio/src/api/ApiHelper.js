import NetworkUtil from "../util/NetworkUtil";


var basePath = "helpers";
class ApiHelper {
    static getHelperByHash(hash, onSuccess, onError){
        NetworkUtil.doRequest("GET", basePath + "/" + hash, null, onSuccess, onError)
    }

}

export default ApiHelper