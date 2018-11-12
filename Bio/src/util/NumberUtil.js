
class NumberUtil {
    static getDoubleAsCurrency(value){
        return Intl.NumberFormat('pt', {
            style: 'currency',
            currency: 'BRL'
          }).format(value)
    }

}


export default NumberUtil