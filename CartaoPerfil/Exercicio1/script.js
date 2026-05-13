
//Estrurura básica de uma função em JavaScript

/*
function soma(a, b){
alert(a+b);
}
soma(10,20);

*/
//Manipulação de elementos do DOM com JavaScript 

//Declarar uma variavel
let temaEscuro = false;

//Funçao para alterar o tema
function alterarTema() {

temaEscuro = !temaEscuro; //Inverte o valor da variável temaEscuro
const botao = document.getElementById('btnTema');

    if(temaEscuro === true){
        document.body.classList.add('escuro');
        botao.textContent = '☀️ Mudar para claro';
    } else{
        document.body.classList.remove('escuro');
        botao.textContent = '🌙 Mudar para escuro';
    }
}