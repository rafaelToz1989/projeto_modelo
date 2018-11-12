
class LocalizationUtil {
    static KEY_INPUT_VALID_EMAIL = 'Digite um email válido';
    static KEY_INPUT_NOT_EXISTS_EMAIL = 'O email informado já existe, digite um novo endereço válido.';
    static keys = {
        EVENT_REGISTER_USER: 'Bem-vindo ao Helpie!',
        EVENT_REGISTER_USER_BODY: 'Bem-vindo ao Helpie! Aqui você acompanhará as novidades e notificações.',
        EVENT_HELPIE_PAID: 'Pagamento efetuado com sucesso!',
        EVENT_HELPIE_PAID_BODY: 'Você efetuou uma reserva de pagamento! Acesse a aba de pagamentos para liberar o dinheiro ao profissional, quando quiser!',
        EVENT_PAYMENT_RELEASED: 'Pagamento Liberado!',
        EVENT_PAYMENT_RELEASED_BODY: 'Você liberou o pagamento! Se estiver tudo certo conclua a solicitação e avalie o seu profissional!',
        EVENT_PAYMENT_REFUNDED: 'Pagamento Estornado!',
        EVENT_PAYMENT_REFUNDED_BODY: 'Você estornou seu pagamento!',
        EVENT_PAYMENT_FINISHED: 'Serviço Concluído!',
        EVENT_PAYMENT_FINISHED_BODY: 'Você concluiu a solicitação! Avalie o profissional contratado e ajude a comunidade Helpie a ter cada vez mais qualidade :)',
        EVENT_USER_WANTS_YOU: '',
        EVENT_USER_WANTS_YOU_BODY: 'Você escolheu um profissional e poderá começar a negociar!',
        EVENT_HELPER_PAID: '',
        EVENT_HELPER_PAID_BODY: 'Pagamento reservado com sucesso! Acesse a aba de pagamentos e libere o $$ para o profissional quando o serviço for concluído!',
        EVENT_HELPER_PAYMENT_CANCELLED: '',
        EVENT_HELPER_PAYMENT_CANCELLED_BODY: 'Você estornou seu pagamento!',
        EVENT_HELPER_PAYMENT_RELEASED: '',
        EVENT_HELPER_PAYMENT_RELEASED_BODY: 'Você liberou o pagamento! Se estiver tudo certo conclua a solicitação e avalie o seu profissional!',
        EVENT_WIN_PROMOCODE: 'Você ganhou um cupom de desconto. Acesse o menu Promoções!',
        EVENT_PASSWORD_CHANGED: 'Sua senha foi alterada!',
        EVENT_RELEASE_HELPER_CONTACT: '',
        EVENT_RELEASE_HELPER_CONTACT_BODY: '',
        EVENT_HELPIE_FINISHED_RATING_AVAILABLE_USER: 'Avaliação Disponível',
        EVENT_HELPIE_FINISHED_RATING_AVAILABLE_USER_BODY: 'Agora você já pode avaliar o profissional',
     };

    static getLocalizationByKey(key) {
        key = key.replace(/([[\]])/g, "")
        return(this.keys[key])
    }
}
export default LocalizationUtil