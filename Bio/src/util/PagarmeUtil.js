import pagarme from 'pagarme';

class PagarmeUtil {

  static doCardHash(cardNumber, holderName, expiry, cvc, onSuccess, onError) {
    console.log(cardNumber, holderName, expiry, cvc)
    const card = {
      card_number: cardNumber,
      card_holder_name: holderName,
      card_expiration_date: expiry,
      card_cvv: cvc,
    }

    pagarme.client.connect({ encryption_key: process.env.REACT_APP_PAGAR_ME_ENCRYPTION_KEY })
      .then(client => client.security.encrypt(card))
      .then(card_hash => onSuccess(card_hash))
      .catch(error => onError(error))
  }
}
export default PagarmeUtil