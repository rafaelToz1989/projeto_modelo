import CookieUtil from "./CookieUtil";

const COOKIE_AUTH_TOKEN = "COOKIE_AUTH_TOKEN"
const COOKIE_USER_INFO = "COOKIE_USER_INFO"

class AuthUtil {

  static logoutUser() {
    CookieUtil.removeCookie(COOKIE_AUTH_TOKEN)
    CookieUtil.removeCookie(COOKIE_USER_INFO)
    this.verifyLoggedIn()
  }

  static getAccessToken() {
    const token = this.getToken()
    if(token != null){
      return token.accessToken
    } else {
      return null
    }
  }

  static verifyLoggedIn(){
    if(CookieUtil.loadCookie(COOKIE_AUTH_TOKEN) == null) {
      window.location.href = "/app/login"
    }
  }

  static getToken() {
    if(CookieUtil.loadCookie(COOKIE_AUTH_TOKEN) != null){
      return CookieUtil.loadCookie(COOKIE_AUTH_TOKEN)
    }
  }

  static getUserId() {
    return this.getUserInfo().id
  }

  static setToken(token) {
    CookieUtil.saveCookie(COOKIE_AUTH_TOKEN, token)
  }

  static setUserInfo(userInfo) {
    console.log(userInfo)
    CookieUtil.saveCookie(COOKIE_USER_INFO, userInfo)
  }

  static getUserInfo() {
    if(CookieUtil.loadCookie(COOKIE_USER_INFO) != null){
      return CookieUtil.loadCookie(COOKIE_USER_INFO)
    }
  }

}
export default AuthUtil