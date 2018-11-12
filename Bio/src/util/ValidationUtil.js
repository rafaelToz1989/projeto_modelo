
class ValidationUtil {

    static validateCelular(celular) {
        const re = /(\(?[0]?[1-9][0-9]\)?)(\.|-|\s)?([9]{1})?[6-9][0-9]{3}(\.|-|\s)?[0-9]{4}/g
        return re.test(celular)
    }

    static validateEmail(email) {
        const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        return re.test(email)
    }

    static validatePassword(pass) {
        const n = /[0-9]/
        const a = /[a-zA-Z]/i
        if(pass.length > 5 && n.test(pass) && a.test(pass)){
            return true
        } else {
            return false
        }
    }
}

export default ValidationUtil