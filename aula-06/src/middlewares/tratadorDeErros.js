//A função tratadorDeErros é um middleware do Express que lida com erros lançados durante o processamento das requisições.
// Ela verifica o tipo do erro e envia uma resposta HTTP apropriada para o cliente, incluindo o código de status e a mensagem de erro.
// Se o erro não for reconhecido, ele registra o erro no console e envia uma resposta genérica de erro interno do servidor.

//fazer import de erro de validaçao e erro de aplicativo!!
import { ErroDaAplicacao, ErroDeConflito } from "../erros/index.js";
import { ErroDeNaoEncontrado } from "../erros/index.js";
import { ErroDeValidacao } from "../erros/index.js";


export function tratadorDeErros(erro, req, res, next) {

    if (erro instanceof ErroDeNaoEncontrado) {

        return res.status(erro.status).json({ mensagem: erro.message });

    } else if (erro instanceof ErroDeValidacao) {

        return res.status(erro.status).json({ mensagem: erro.message, detalhes: erro.mensagem });

    } else if (erro instanceof ErroDaAplicacao) {

       return res.status(erro.status).json({ mensagem: erro.message });

    } else {

        console.error(erro);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

}