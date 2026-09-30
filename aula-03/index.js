//Async Await


async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data[0]); // Exibe o primeiro post no console
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
//A função fetchData é uma função assíncrona que utiliza o async/await para buscar dados de uma API. 
// Ela faz uma requisição para o endpoint 'https://jsonplaceholder.typicode.com/posts', 
// aguarda a resposta, converte os dados para JSON e os imprime no console. 
// Caso ocorra algum erro durante o processo, ele será capturado e exibido no console.



//Tratamento de Erros com Try/Catch

async function buscarCep(cep) {
    try{
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        //O fetch não retorna um erro para códigos de status HTTP diferentes de 200, 
        // então é importante verificar se a resposta foi bem-sucedida antes de tentar processar os dados.
        if (!resposta.ok) {
            throw new Error('A requisição falhou com o status: ' + resposta.status);
        }

        const dados = await resposta.json();
        console.log(dados);
        return dados;
    } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        return null;
    } finally {
        console.log('Busca de CEP finalizada.');
    }
}

//O Try/Catch é usado para capturar erros que possam ocorrer durante a execução do código assíncrono.
// O finally é um bloco opcional que será executado independentemente de o try ter sido bem-sucedido ou se ocorreu um erro, 
// permitindo que você faça limpeza ou registre informações adicionais.

//Teste da função buscarCep
buscarCep('80610020'); // Substitua pelo CEP desejado


//Promises
// Uma Promise é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante. 
// Ela pode estar em um dos três estados: pendente, resolvida ou rejeitada. 
// As Promises permitem encadear operações assíncronas de forma mais legível e organizada, evitando o "callback hell". 

//Promisse.all
// A função buscarVariosCeps recebe um array de CEPs e utiliza o método map para criar um array de promessas,
// chamando a função buscarCep para cada CEP. Em seguida, ela utiliza Promise.all para aguardar que todas as promessas sejam resolvidas.
// O resultado será um array contendo os dados de todos os CEPs buscados.

async function buscarVariosCeps(ceps) { 
    const promises = ceps.map(cep => buscarCep(cep));
    return Promise.all(promises);
}   

//Teste da função buscarVariosCeps
const ceps = ['01001000', '30140071', '80010000'];
buscarVariosCeps(ceps);



//Lendo e escrevendo arquivos com Node.js
// Para ler e escrever arquivos em Node.js, você pode usar o módulo 'fs' (File System). 
// Abaixo está um exemplo de como ler um arquivo JSON e escrever em outro arquivo.  

import fs from 'fs/promises';
//ou da pra importar só as funções que você vai usar, como readFile e writeFile, assim:
// import { readFile, writeFile } from 'fs/promises';

async function lerArquivo(caminho) {
    const dados = await fs.readFile(caminho, 'utf8');
    console.log(dados);
    return dados;
}

async function escreverArquivo(caminho, dados) {
    await fs.writeFile(caminho, "Linha 2" );
}

async function appendFile(caminho, dados) {
    await fs.appendFile(caminho, "\nLinha 3" );
}

//Teste das funções lerArquivo e escreverArquivo
const caminhoArquivo = './dados.txt';
lerArquivo(caminhoArquivo);
//retorna o conteúdo do arquivo dados.txt no console

escreverArquivo(caminhoArquivo, { id: 2, conteudo: 'teste 2' });
//sobrescreve o conteúdo do arquivo dados.txt com a nova linha "Linha 2"

appendFile(caminhoArquivo, { id: 3, conteudo: 'teste 3' }); 
//adiciona a nova linha "Linha 3" ao final do arquivo dados.txt



//Requisições HTTP com Fetch API
// A Fetch API é uma interface moderna para fazer requisições HTTP em JavaScript. 
// Ela retorna uma Promise que resolve para a resposta da requisição, permitindo que você trabalhe com dados de APIs de forma assíncrona. 
// A Fetch API é amplamente utilizada em aplicações web para buscar dados de servidores e APIs externas.
//Ela traz os retornos: 
//resposta.ok // Retorna true se a resposta for bem-sucedida (status HTTP 200-299), caso contrário, retorna false.
//resposta.status // Retorna o código de status HTTP da resposta (por exemplo, 200, 404, 500).
//resposta.text() // Retorna uma Promise que resolve com o corpo da resposta como uma string.
//resposta.json() // Retorna uma Promise que resolve com o corpo da resposta convertido em JSON.

//Exemplo de requisição GET com Fetch API:
async function requisicaoApi() {
    const resposta = await fetch('https://api.example.com/dados');
    const dados = await resposta.json();
    console.log(dados);
    return dados;
}

//Throw e Throw new Error
// O throw é usado para lançar uma exceção em JavaScript. Quando uma exceção é lançada, 
// a execução do código é interrompida e o controle é transferido para o bloco catch mais próximo, se houver um. 
// O throw new Error cria um objeto de erro com uma mensagem personalizada, 
// permitindo que você forneça informações adicionais sobre o erro que ocorreu.    

//Exemplo de uso do throw e throw new Error:
function verificarIdade(idade) {
    if (idade < 18) {
        throw new Error('Idade inválida. Você deve ter pelo menos 18 anos.');
    }
}

//Error é um objeto que contém informações sobre o erro que ocorreu, como a mensagem de erro e a pilha de chamadas.
//Error.message // Retorna a mensagem de erro fornecida ao criar o objeto Error.
//Error.stack // Retorna a pilha de chamadas no momento em que o erro foi lançado, útil para depuração.
//Error.name // Retorna o nome do tipo de erro (por exemplo, "Error", "TypeError", "ReferenceError").


//JSON.parse e JSON.stringify

// JSON.parse é usado para converter uma string JSON em um objeto JavaScript. 
// Ele analisa a string JSON e cria um objeto correspondente, permitindo que você acesse e manipule os dados de forma programática. 
//Exemplo de uso do JSON.parse:
const jsonString = '{"nome": "Roger", "idade": 30}';
const objeto = JSON.parse(jsonString);
console.log(objeto.nome);   // Saída: Roger
console.log(objeto.idade);  // Saída: 30    

// JSON.stringify é usado para converter um objeto JavaScript em uma string JSON.
// Ele serializa o objeto, transformando-o em uma representação de texto que pode ser armazenada ou transmitida. 
//Exemplo de uso do JSON.stringify: 
const objeto2 = { nome: "Roger", idade: 30 };
const jsonString2 = JSON.stringify(objeto2);
console.log(jsonString2);  // Saída: {"nome":"Roger","idade":30}     
