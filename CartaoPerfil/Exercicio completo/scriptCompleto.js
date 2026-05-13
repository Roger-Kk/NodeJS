// ===================================
// Exercício 1 — Cartão de Perfil
// ===================================

// Variável que guarda o estado atual do tema
let temaEscuro = false;

// ── Alterna entre modo claro e escuro ──
function alternarTema() {
  temaEscuro = !temaEscuro; // inverte o valor: true vira false, false vira true

  const botao = document.getElementById("btnTema");

  if (temaEscuro) {
    document.body.classList.add("escuro"); // adiciona a classe "escuro" ao <body>
    botao.textContent = "☀️ Ativar Modo Claro";
  } else {
    document.body.classList.remove("escuro"); // remove a classe "escuro" do <body>
    botao.textContent = "🌙 Ativar Modo Escuro";
  }
}

// ── Atualiza o nome exibido no cartão ──
function atualizarNome() {
  const valor = document.getElementById("inputNome").value;
  const elemento = document.getElementById("nomeExibido");

  // Só atualiza se o campo não estiver vazio
  if (valor.trim() !== "") {
    elemento.textContent = valor;
  }
}

// ── Atualiza as iniciais do avatar ──
function atualizarIniciais() {
  const valor = document.getElementById("inputIniciais").value;
  const avatar = document.getElementById("avatar");

  if (valor.trim() !== "") {
    avatar.textContent = valor.toUpperCase(); // converte para maiúsculas
  }
}

// ── Atualiza a cor de fundo do avatar ──
function atualizarCor() {
  const cor = document.getElementById("inputCor").value;
  document.getElementById("avatar").style.backgroundColor = cor;
}

// ── Atualiza o cargo exibido no cartão ──
function atualizarCargo() {
  const valor = document.getElementById("inputCargo").value;
  document.getElementById("cargoExibido").textContent = valor;
}

// ── Adiciona uma nova habilidade ao cartão ──
function adicionarHabilidade() {
  const input = document.getElementById("inputHabilidade");
  const texto = input.value.trim();

  if (texto === "") return; // não adiciona se o campo estiver vazio

  // Cria um novo elemento <span> com a classe "tag"
  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.textContent = texto;

  // Insere a tag na div de habilidades
  document.getElementById("habilidades").appendChild(tag);

  // Limpa o campo de input após adicionar
  input.value = "";
  input.focus();
}

// ── Permite pressionar Enter para adicionar habilidade ──
function teclaEnter(evento) {
  if (evento.key === "Enter") {
    adicionarHabilidade();
  }
}

function atualizarBio() {

  const input = document.getElementById("inputBio");
  const novaBio = input.value.trim();

  //Atualizar o texto da bio no cartão
  document.querySelector(".bio").textContent = novaBio;

  input.value = "";

}

const input = document.getElementById("inputBio");

input.addEventListener("keydown", function (evento) {

  if (evento.key === "Enter") {
    atualizarBio();
  }

});
