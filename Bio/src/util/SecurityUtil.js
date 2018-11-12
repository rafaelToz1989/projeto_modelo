import sha256 from 'sha256'

class SecurityUtil {
    static sha256(string){
        return sha256(string).toUpperCase()
    }
}
export default SecurityUtil