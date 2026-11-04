// O ÚNICO lugar do projeto que decide qual status HTTP um erro vira.
//
// ⚠️ Um middleware de erro tem QUATRO parâmetros, com o "erro" na frente.
//    É isso que faz o Express reconhecê-lo como tratador de erros.
//    Se você escrever só (req, res, next), ele nunca será chamado.

import { ErroDeValidacao, ErroDaAplicacao } from "../errors/index.js";

export default function tratadorDeErros(erro, req, res, next) {
  if (erro instanceof ErroDeValidacao) {
    return res.status(400).json({ erro: erro.message });
  }

  if (erro instanceof ErroDaAplicacao) {
    return res.status(500).json({ erro: erro.message });
  }

  // Se o erro não for de validação nem da aplicação, é um erro inesperado.
  // Não queremos vazar detalhes do erro para o cliente, então só mandamos uma mensagem genérica.
  console.error(erro);
  return res.status(500).json({ erro: "Erro inesperado." });
}
