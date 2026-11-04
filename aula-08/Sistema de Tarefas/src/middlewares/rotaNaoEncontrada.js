// Roda quando nenhuma rota casou com a requisição.
// Precisa vir DEPOIS de todas as rotas e ANTES do tratadorDeErros.

export function rotaNaoEncontrada(req, res) {
  res
    .status(404)
    .json({ erro: `Rota ${req.method} ${req.originalUrl} não existe` });
}
