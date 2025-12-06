// Array com pelo menos 10 cores nomeadas do HTML
const cores = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "cyan",
];

// Estado do jogo
let corSecreta = "";
let tentativasRestantes = 3;
const corFundoOriginal = getComputedStyle(document.body).backgroundColor;

// Referências aos elementos do DOM
const inputCor = document.getElementById("input-cor");
const btnAdivinhar = document.getElementById("btn-adivinhar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const mensagem = document.getElementById("mensagem");
const spanTentativas = document.getElementById("tentativas-valor");
const listaCoresDiv = document.getElementById("lista-cores");

/**
 * Sorteia uma cor aleatória do array "cores"
 */
function sortearCor() {
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
}

/**
 * Atualiza o texto de tentativas restantes
 */
function atualizarTentativas() {
  spanTentativas.textContent = tentativasRestantes;
}

/**
 * Define uma mensagem com classe (visual diferente para erro, sucesso, alerta)
 */
function exibirMensagem(texto, tipo = "") {
  mensagem.textContent = texto;
  mensagem.className = "mensagem"; // limpa classes anteriores

  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

/**
 * Desabilita o jogo (após vitória ou fim das tentativas)
 */
function encerrarJogo() {
  btnAdivinhar.disabled = true;
  inputCor.disabled = true;
  btnReiniciar.hidden = false;
}

/**
 * Reinicia o jogo para o estado inicial
 */
function reiniciarJogo() {
  corSecreta = sortearCor();
  tentativasRestantes = 3;
  atualizarTentativas();
  exibirMensagem("Novo jogo iniciado! Tente adivinhar a cor 😄", "alerta");
  inputCor.value = "";
  inputCor.disabled = false;
  btnAdivinhar.disabled = false;
  btnReiniciar.hidden = true;
  document.body.style.backgroundColor = corFundoOriginal;
  inputCor.focus();
  // console.log("Cor secreta:", corSecreta); // útil para testes
}

/**
 * Inicializa a lista visual de cores possíveis
 */
function preencherListaCores() {
  cores.forEach((cor) => {
    const span = document.createElement("span");
    span.classList.add("tag-cor");
    span.textContent = cor;
    listaCoresDiv.appendChild(span);
  });
}

/**
 * Lida com o clique no botão "Adivinhar"
 */
function lidarComAdivinhacao() {
  let palpite = inputCor.value.trim().toLowerCase();

  if (!palpite) {
    exibirMensagem("Digite uma cor antes de tentar!", "alerta");
    return;
  }

  // Validação simples: verificar se está no array de cores
  if (!cores.includes(palpite)) {
    exibirMensagem(
      "Essa cor não está na lista de cores possíveis. Tente outra! 😉",
      "alerta",
    );
    inputCor.value = "";
    return;
  }

  if (palpite === corSecreta) {
    document.body.style.backgroundColor = corSecreta;
    exibirMensagem(
      `Parabéns! Você acertou! A cor era "${corSecreta}". 🎉`,
      "sucesso",
    );
    encerrarJogo();
  } else {
    tentativasRestantes -= 1;
    atualizarTentativas();

    if (tentativasRestantes > 0) {
      exibirMensagem(
        `Errou! Tentativas restantes: ${tentativasRestantes}.`,
        "erro",
      );
      inputCor.value = "";
      inputCor.focus();
    } else {
      exibirMensagem(
        `Fim de jogo! A cor correta era "${corSecreta}". 😢`,
        "erro",
      );
      encerrarJogo();
    }
  }
}

// --------- Eventos ---------
btnAdivinhar.addEventListener("click", lidarComAdivinhacao);

btnReiniciar.addEventListener("click", reiniciarJogo);

// Permitir pressionar Enter dentro do input para adivinhar
inputCor.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !btnAdivinhar.disabled) {
    lidarComAdivinhacao();
  }
});

// --------- Inicialização ao carregar a página ---------
window.addEventListener("DOMContentLoaded", () => {
  preencherListaCores();
  reiniciarJogo();
});
