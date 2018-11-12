import NetworkUtil from "../util/NetworkUtil";


var basePath = "helpies";
class ApiHelpies {
    static addHelpieQuotation(quotation, onSuccess, onError){
        NetworkUtil.doRequest("POST", basePath + "/quotations", quotation, onSuccess, onError)
    }

    static getHelpieQuotation(quotationId, onSuccess, onError){
        NetworkUtil.doRequest("GET", basePath + "/quotations/" + quotationId, null, onSuccess, onError)
    }

    static addDeliveryQuotation(order, onSuccess, onError){
        NetworkUtil.doRequest("POST", basePath + "/quotations/delivery", order, onSuccess, onError)
    }

}

export default ApiHelpies