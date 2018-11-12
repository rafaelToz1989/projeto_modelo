import CookieUtil from "./CookieUtil";

const COOKIE_NEW_HELPIE = "COOKIE_NEW_HELPIE"

class HelpieUtil {

  static setNewHelpieInfo(helpieInfo) {
    console.log("SALVANDO COOKIE HELPIE")
    console.log(helpieInfo)
    CookieUtil.saveCookie(COOKIE_NEW_HELPIE, helpieInfo)
  }

  static clearNewHelpieInfo(helpieInfo) {
    CookieUtil.removeCookie(COOKIE_NEW_HELPIE)
  }

  static getNewHelpieInfo() {
    if(CookieUtil.loadCookie(COOKIE_NEW_HELPIE) != null){
      return CookieUtil.loadCookie(COOKIE_NEW_HELPIE)
    }
  }

}
export default HelpieUtil