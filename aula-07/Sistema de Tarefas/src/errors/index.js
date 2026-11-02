// Erros do NEGÓCIO, não do HTTP.
//
// O service não sabe o que é status code — ele só sabe dizer "isso não existe"
// ou "isso conflita". A tradução para HTTP acontece em um lugar só:
// middlewares/tratadorDeErros.js

export class ErroDaAplicacao extends Error {
  constructor(mensagem, status) {
    super(mensagem);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class ErroNaoEncontrado extends ErroDaAplicacao {
  constructor(mensagem = "Recurso não encontrado") {
    super(mensagem, 404);
  }
}

export class ErroDeValidacao extends ErroDaAplicacao {
  constructor(erros) {
    super("Dados inválidos", 400);
    this.erros = erros; // guardamos a LISTA de problemas
  }
}

export class ErroDeConflito extends ErroDaAplicacao {
  constructor(mensagem = "Conflito com o estado atual dos dados") {
    super(mensagem, 409);
  }
}
