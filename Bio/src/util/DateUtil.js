
class DateUtil {
    static getDateFromLong(value){
        var options = { year: '2-digit', month: '2-digit', day: '2-digit', hour:'2-digit' , minute:'2-digit' };
        if(value > 0){
            return new Date(value).toLocaleString("pt-BR", options)    
        } else{ 
            return 
        }
    }

}


export default DateUtil