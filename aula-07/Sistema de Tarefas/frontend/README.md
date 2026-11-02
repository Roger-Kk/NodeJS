# Frontend independente — Aula 05

O frontend é composto por `index.html`, `style.css` e `script.js`. O backend não serve esses arquivos.

## Como usar

1. Na pasta `Backend/aula05`, execute `npm run dev` para iniciar a API na porta 3000. Se o backend já estava rodando, reinicie-o para carregar a configuração de CORS. Reiniciar apaga as tarefas em memória.
2. Abra `frontend/index.html` diretamente no navegador, com um duplo clique, ou use **Open with Live Server** no VS Code.
3. Cadastre, edite, conclua, reabra e exclua tarefas pela interface. Use os filtros e a busca pelo título para organizar a lista.

O JavaScript envia requisições para **http://localhost:3000/tarefas**. Se mudar o endereço ou a porta do backend, altere `API_BASE_URL` no início de `script.js`.

O servidor permite CORS para páginas abertas por arquivo (`Origin: null`) ou servidas em localhost, 127.0.0.1 e ::1. Essa configuração permite que o navegador chame a API de uma origem diferente. O Express não hospeda as páginas.

Os dados vêm da API, sem simulação nem armazenamento local. As tarefas ficam em memória no backend e desaparecem quando ele reinicia. Contagens e progresso são calculados a partir da lista retornada pelo servidor.

Rotas utilizadas: `GET /tarefas`, `POST /tarefas`, `PUT /tarefas/:id` e `DELETE /tarefas/:id`.

A página anterior de testes continua como arquivo em `public/index.html` e também pode ser aberta diretamente no navegador.
