// Arrow functions
//Função clássica: 
function minhaFuncao() {
  console.log('Função clássica');
}

//Arrow function:
const minhaArrowFunction = () => {
  console.log('Arrow function');
}

//Arrow function com um único parâmetro:
const minhaArrowFunction2 = parametro => {
  console.log('Arrow function com um único parâmetro: ' + parametro);
}

//Atenção para retorno de valores em arrow functions, quando não há chaves, o retorno é implícito:
//Arrow function com retorno implícito:
const minhaArrowFunction3 = (a, b) => a + b;

//Arrow function com retorno json implícito:
const minhaArrowFunction4 = () => ({ nome: 'Roger', idade: 30 });


//Exercício: Dado o array de vendas, crie uma função que retorne o total de vendas por categoria.
const vendas = [
    {
        produto: "Notebook",
        categoria: "eletronicos",
        valor: 3500,
        quantidade: 2
    },
    {
        produto: "Mouse",
        categoria: "eletronicos",
        valor: 80,
        quantidade: 10
    },
    {
        produto: "Cadeira",
        categoria: "moveis",
        valor: 900,
        quantidade: 3
    },
    {
        produto: "Mesa",
        categoria: "moveis",
        valor: 1200,
        quantidade: 1
    },
    {
        produto: "Teclado",
        categoria: "eletronicos",
        valor: 250,
        quantidade: 5
    }
];

//Map:
const valoresVendas = vendas.map((venda) => ({ produto:venda.produto, "valor total": venda.valor * venda.quantidade }));
//Como funciona o map: ele percorre o array e retorna um novo array com os elementos transformados. No caso,
// ele retorna um array com os produtos e o valor total de cada venda.

//Filter:
const vendasEletronicos = vendas.filter((venda) => venda.categoria === "eletronicos");
//Como funciona o filter: ele percorre o array e retorna um novo array com os elementos que atendem a condição. No caso,
// ele retorna um array com as vendas da categoria informada.

//Reduce:
const totalVendas = vendas.reduce((total, venda) => total + (venda.valor * venda.quantidade), 0);
//Como funciona o reduce: ele percorre o array e retorna um único valor, que é o total de vendas. No caso,
// ele retorna o total de vendas de todas as categorias.
//Como funciona os parâmetros do reduce: o primeiro parâmetro é o acumulador, que é o valor retornado na última iteração. 
// O segundo parâmetro é o elemento atual do array. 
// O terceiro parâmetro é o índice do elemento atual do array. 
// O quarto parâmetro é o array original.
// Exemplo de reduce com todos os parâmetros:
const totalVendas2 = vendas.reduce((total, venda, index, array) => {
    console.log('Index: ' + index);
    console.log('Array: ' + array);
    return total + (venda.valor * venda.quantidade);
}, 0);
// o 0 no final é o valor inicial do acumulador. Se não for informado, o valor inicial será o primeiro elemento do array.


//Função que retorna o total de vendas por categoria
const totalVendasPorCategoria = (categoria) => {
    return vendas
        .filter(venda => venda.categoria === categoria)
        .reduce((total, venda) => total + (venda.valor * venda.quantidade), 0);
}

//DESESTRUTURAÇÃO DE OBJETOS:
// Em vez de:
function saudar(usuario) {
  return `Olá, ${usuario.nome}`;
}
// Escreva:
function saudar({ nome }) {
  return `Olá, ${nome}`;
}
//Explicação: A função saudar recebe um objeto como parâmetro e utiliza a desestruturação para acessar a propriedade nome do objeto.

// Ou ainda:
const saudarArrow = ({ nome }) => `Olá, ${nome}`;
//Explicação: A função saudar recebe um objeto como parâmetro e utiliza a desestruturação para acessar a propriedade nome do objeto.


//Rest operator: permite que uma função receba um número indefinido de argumentos como um array.
function somar(...numeros) {
  return numeros.reduce((total, numero) => total + numero, 0);
}

const { nome, idade, ...resto } = { nome: 'Roger', idade: 30, cidade: 'São Paulo', estado: 'SP' };
//Explicação: A desestruturação permite que você extraia propriedades de um objeto e as atribua a variáveis. 
// O operador rest permite que você agrupe o restante das propriedades em um objeto.