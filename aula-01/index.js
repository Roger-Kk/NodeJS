//Instalar node em seu computador: https://nodejs.org/en/download/

//Verificar versão do node: node -v

//Verificar versão do npm: npm -v

//Ir para o terminal e criar uma pasta para o projeto: cd caminho/da/pasta

//Começar um projeto em node rode no terminal: npm init

//Process arguments: node aula-01/node-init.js argumento1 argumento2
//Exemplo: node aula-01/node-init.js teste 123
console.log(process.argv);

const argumentos = process.argv.slice(2);
console.log(argumentos);

//Criar um arquivo package.json: npm init -y

//npm run dev
//Acrescentar no package.json:
//"scripts": {
//  "dev": "node aula-01/index.js"
//}

//export/import: 
//index.js faz o import de uma função de outro arquivo, e esse outro arquivo faz o export da função, exemplo:
//index.js
//import { minhaFuncao } from './meuArquivo.js';
//minhaFuncao();

//meuArquivo.js
//export function minhaFuncao() {
//  console.log('Função importada com sucesso!');
//}



