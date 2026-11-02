// Middleware de log. Existe só para você VER a ordem em que as coisas acontecem.

export function registrador(req, res, next) {
  const inicio = Date.now();

  // "finish" dispara quando a resposta terminou de ser enviada.
  res.on("finish", () => {
    const hora = new Date().toLocaleTimeString("pt-BR");
    console.log(
      `[${hora}] ${req.method.padEnd(7)}${req.originalUrl.padEnd(30)}` +
        `${res.statusCode} · ${Date.now() - inicio}ms`
    );
  });

  next(); // ⚠️ sem next(), a requisição morre aqui
}
