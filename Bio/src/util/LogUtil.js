
class LogUtil {
    static log(message){
        if(process.env.NODE_ENV !== "production"){
            console.log(message)
        }
    }

}

export default LogUtil