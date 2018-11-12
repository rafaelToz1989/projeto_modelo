import cookie from 'react-cookies'

class CookieUtil {
  static saveCookie(name, value) {
    cookie.save(name, value, { path: '/' })
  }

  static loadCookie(name) {
    if (cookie.load(name) != null) {
      return cookie.load(name)
    } else {
      return null
    }
  }

  static removeCookie(name) {
    console.log("rm ck " + name)
    cookie.remove(name, { path: '/' })
  }
}
export default CookieUtil