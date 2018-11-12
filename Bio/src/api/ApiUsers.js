import NetworkUtil from "../util/NetworkUtil";
import SecurityUtil from "../util/SecurityUtil";
import AuthUtil from "../util/AuthUtil";


var basePath = "users";
class ApiUsers {
    static doUserLogin(login, pass, helpie, onSuccess, onError) {
        var payload = {
            login: login,
            pass: SecurityUtil.sha256(pass),
            helpie: helpie

        }
        NetworkUtil.doRequest("POST", basePath + "/login", payload, onSuccess, onError)

    }

    static getHelpiesByUserId(onSuccess, onError) {
        NetworkUtil.doRequest("GET", basePath + "/" + AuthUtil.getUserId() + "/helpies", null, onSuccess, onError)

    }

    static doAddHelpie(helpie, onSuccess, onError) {
        NetworkUtil.doRequest("POST", basePath + "/" + AuthUtil.getUserId() + "/helpies", helpie, onSuccess, onError)

    }

    static doRegister(email, firstName, lastName, password, ddd, mobilePhone, onSuccess, onError) {
        var payload = {

            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            ddd: ddd,
            ddi: '+55',
            mobilePhone: mobilePhone
        }
        NetworkUtil.doRequest("POST", basePath + "/register", payload, onSuccess, onError)

    }

    static doForgotPassword(login, onSuccess, onError) {
        var payload = {
            login: login
        }
        NetworkUtil.doRequest("POST", basePath + "/forgot", payload, onSuccess, onError)

    }

    static getUsers(onSuccess, onError) {
        NetworkUtil.doRequest("GET", basePath + "/" + AuthUtil.getUserId(), null, onSuccess, onError)
    }

    static getTokenByRefreskToken(onSuccess, onError) {
        var payload = {
            userDeviceId: AuthUtil.getUserInfo().device.id,
            refreshToken: AuthUtil.getToken().refreshToken,
            accessToken: AuthUtil.getToken().accessToken
        }
        NetworkUtil.doRequest("POST", basePath + "/" + AuthUtil.getUserId() + "/token", payload, onSuccess, onError)
    }

    static getUsersPaymentMethods(onSuccess, onError) {
        NetworkUtil.doRequest("GET", basePath + "/" + AuthUtil.getUserId() + "/payments/cards", null, onSuccess, onError)
    }

    static getPaymentsByUser(onSuccess, onError) {
        NetworkUtil.doRequest("GET", basePath + "/" + AuthUtil.getUserId() + "/payments", null, onSuccess, onError)
    }

    static GetNotificationsByUserId(onSuccess, onError) {
        NetworkUtil.doRequest("GET", basePath + "/" + AuthUtil.getUserId() + "/notifications", null, onSuccess, onError)
    }

    static doAddUserCreditCard(cardHash, onSuccess, onError) {
        var hashInfo = {
            cardHash: cardHash
        }
        NetworkUtil.doRequest("POST", basePath + "/" + AuthUtil.getUserId() + "/payments/cards", hashInfo, onSuccess, onError)

    }

    static deleteUserCreditCard(cardId, onSuccess, onError) {
        NetworkUtil.doRequest("DELETE", basePath + "/" + AuthUtil.getUserId() + "/payments/cards/" + cardId, null, onSuccess, onError)
    }


}

export default ApiUsers