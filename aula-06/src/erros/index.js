//A classe ErroDaAplicacao é uma classe base para erros personalizados na aplicação. 
// Ela estende a classe Error do JavaScript e adiciona uma propriedade status para armazenar o código de status HTTP associado ao erro.
//Exemplo de classe javascript:
// class ErroDaAplicacao extends Error {
//     constructor(mensagem, status) {
//         super(mensagem);
//         this.status = status;
//     }  
// }

//O super(mensagem) chama o construtor da classe pai (Error) para definir a mensagem de erro, e o status é armazenado como uma propriedade adicional na instância do erro.

export class ErroDaAplicacao extends Error {
    constructor(mensagem, status) {
        super(mensagem);
        this.status = status;
    }  
}

export class ErroDeNaoEncontrado extends ErroDaAplicacao {
    constructor(mensagem = 'Recurso não encontrado') {
        super(mensagem, 404);
    }
}

export class ErroDeValidacao extends ErroDaAplicacao {
    constructor(mensagem) {

        super('Dados inválidos', 400);
        this.mensagem = mensagem;
    }
}

export class ErroDeConflito extends ErroDaAplicacao {
    constructor(mensagem = 'Conflito de dados') {
        super(mensagem, 409);
    }
}   

