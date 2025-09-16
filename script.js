const maxTentativas = 5;
let numeroMagico;
let tentativas;
let tempoRestante = 30;
let intervaloTempo = null;
let cronometroIniciado = false;
let pontosUsuario = 0;
let pontosServidor = 0;

// Elementos
const entrada = document.getElementById("entrada");
const mensagem = document.getElementById("mensagem");
const tentarBtn = document.getElementById("tentarBtn");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const cronometro = document.getElementById("cronometro");
const pontosUsuarioEl = document.getElementById("pontosUsuario");
const pontosServidorEl = document.getElementById("pontosServidor");

function iniciarJogo() {
  numeroMagico = Math.floor(Math.random() * 10) + 1;
  tentativas = 0;
  tempoRestante = 30;
  cronometroIniciado = false;
  cronometro.textContent = tempoRestante;
  mensagem.textContent = "";
  entrada.disabled = false;
  tentarBtn.disabled = false;
  reiniciarBtn.disabled = true;
  entrada.value = "";
  entrada.focus();
  clearInterval(intervaloTempo);

  iniciarCronometro();
}

function iniciarCronometro() {
  if (cronometroIniciado) return;
  cronometroIniciado = true;

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    cronometro.textContent = tempoRestante;

    if (tempoRestante <= 0) {
      encerrarJogo(false, true);
    }
  }, 1000);
}

function encerrarJogo(acertou, porTempo = false) {
  clearInterval(intervaloTempo);
  entrada.disabled = true;
  tentarBtn.disabled = true;
  reiniciarBtn.disabled = false;

  if (acertou) {
    mensagem.textContent = `🎉 Você acertou! O número era ${numeroMagico}.`;
    pontosUsuario++;
  } else if (porTempo) {
    mensagem.textContent = `⏰ Tempo esgotado! O número era ${numeroMagico}.`;
    pontosServidor++;
  } else {
    mensagem.textContent = `❌ Você perdeu! O número era ${numeroMagico}.`;
    pontosServidor++;
  }

  pontosUsuarioEl.textContent = pontosUsuario;
  pontosServidorEl.textContent = pontosServidor;
}

tentarBtn.addEventListener("click", () => {
  const valor = parseInt(entrada.value);

  if (isNaN(valor) || valor < 1 || valor > 10) {
    mensagem.textContent = "❌ Digite um número válido entre 1 e 10.";
    return;
  }

  tentativas++;

  if (valor === numeroMagico) {
    encerrarJogo(true);
  } else if (tentativas >= maxTentativas) {
    encerrarJogo(false);
  } else {
    // Corrigido: atualiza mensagem em cada tentativa
    if (valor > numeroMagico) {
      mensagem.textContent = "🔽 O número mágico é menor.";
    } else {
      mensagem.textContent = "🔼 O número mágico é maior.";
    }
  }

  entrada.value = "";
  entrada.focus();
});

reiniciarBtn.addEventListener("click", iniciarJogo);

// Cronômetro começa quando o usuário clica no campo
entrada.addEventListener("focus", iniciarCronometro);

// Inicia o jogo ao carregar a página
window.onload = iniciarJogo;