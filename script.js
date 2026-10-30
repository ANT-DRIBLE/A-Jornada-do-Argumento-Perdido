const fases = [
  {
    nome: "🏰 Portal da Introdução",
    historia: "A vila está sendo atacada por ideias confusas! Você precisa demonstrar que sabe apresentar uma tese.",
    pergunta: "Qual é a principal função da introdução?",
    alternativas: [
      "Apresentar o tema e a tese defendida.",
      "Apresentar apenas uma solução.",
      "Contar uma história sem relação com o tema."
    ],
    correta: 0,
    explicacao: "A introdução apresenta o tema e o posicionamento que será defendido."
  },
  {
    nome: "🌳 Floresta dos Argumentos",
    historia: "Um dragão bloqueia seu caminho. Para passar, você precisa demonstrar que sabe argumentar.",
    pergunta: "O que torna um argumento consistente?",
    alternativas: [
      "Repetir a mesma opinião.",
      "Apresentar justificativas, explicações e exemplos.",
      "Utilizar palavras difíceis sem explicar."
    ],
    correta: 1,
    explicacao: "Argumentos consistentes apresentam justificativas que sustentam a tese."
  },
  {
    nome: "📚 Biblioteca dos Sábios",
    historia: "Você encontrou uma biblioteca mágica. Escolha o melhor repertório sociocultural.",
    pergunta: "O que é repertório sociocultural?",
    alternativas: [
      "Uma lista de palavras difíceis.",
      "Uma opinião sem justificativa.",
      "Conhecimentos históricos, culturais, científicos ou sociais relacionados ao tema."
    ],
    correta: 2,
    explicacao: "Repertórios fortalecem a argumentação quando são pertinentes e bem relacionados ao tema."
  },
  {
    nome: "🏯 Castelo da Conclusão",
    historia: "Você chegou ao castelo! Agora precisa demonstrar que sabe propor uma solução.",
    pergunta: "O que deve conter uma proposta de intervenção completa?",
    alternativas: [
      "Somente uma opinião.",
      "Agente, ação, meio de execução e finalidade, com detalhamento quando pertinente.",
      "Uma pergunta ao leitor."
    ],
    correta: 1,
    explicacao: "Uma proposta completa apresenta quem fará, o que fará, como e para quê."
  }
];

let personagem = "";
let nome = "";
let faseAtual = 0;
let xp = 0;
let respostaEscolhida = null;
let respondida = false;

function escolherPersonagem(tipo) {
  personagem = tipo;

  document.getElementById("personagemEscolhido").textContent =
    "Personagem escolhido: " + tipo;
}

function iniciarJogo() {
  nome = document.getElementById("nome").value.trim();

  if (!nome) {
    alert("Digite seu nome para começar!");
    return;
  }

  if (!personagem) {
    alert("Escolha um personagem!");
    return;
  }

  mostrarTela("jogo");

  document.getElementById("jogador").textContent =
    "🧙 " + nome + " | " + personagem;

  carregarFase();
}

function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(tela => {
    tela.classList.remove("ativa");
  });

  document.getElementById(id).classList.add("ativa");
}

function carregarFase() {
  const fase = fases[faseAtual];

  respostaEscolhida = null;
  respondida = false;

  document.getElementById("fase").textContent = fase.nome;
  document.getElementById("historia").textContent = fase.historia;
  document.getElementById("pergunta").textContent = fase.pergunta;
  document.getElementById("feedback").textContent = "";

  document.getElementById("confirmar").classList.remove("escondido");
  document.getElementById("proxima").classList.add("escondido");

  const alternativas = document.getElementById("alternativas");
  alternativas.innerHTML = "";

  fase.alternativas.forEach((alternativa, indice) => {
    const botao = document.createElement("button");

    botao.textContent =
      String.fromCharCode(65 + indice) + ") " + alternativa;

    botao.className = "alternativa";

    botao.onclick = () => selecionarResposta(indice, botao);

    alternativas.appendChild(botao);
  });

  atualizarStatus();
}

function selecionarResposta(indice, botao) {
  if (respondida) return;

  respostaEscolhida = indice;

  document.querySelectorAll(".alternativa").forEach(item => {
    item.classList.remove("selecionada");
  });

  botao.classList.add("selecionada");
}

function confirmarResposta() {
  if (respostaEscolhida === null) {
    alert("Escolha uma alternativa!");
    return;
  }

  if (respondida) return;

  respondida = true;

  const fase = fases[faseAtual];

  if (respostaEscolhida === fase.correta) {
    xp += 100;

    document.getElementById("feedback").textContent =
      "🎉 Resposta correta! Você ganhou 100 XP!";
  } else {
    xp += 20;

    document.getElementById("feedback").textContent =
      "❌ Resposta incorreta! Resposta certa: " +
      String.fromCharCode(65 + fase.correta) +
      ". Você ganhou 20 XP pela tentativa.";
  }

  document.getElementById("feedback").textContent +=
    "\n📖 " + fase.explicacao;

  document.querySelectorAll(".alternativa").forEach((botao, i) => {
    botao.disabled = true;

    if (i === fase.correta) {
      botao.style.background = "#26734d";
    } else if (i === respostaEscolhida) {
      botao.style.background = "#9c3535";
    }
  });

  document.getElementById("confirmar").classList.add("escondido");
  document.getElementById("proxima").classList.remove("escondido");

  atualizarStatus();
}

function atualizarStatus() {
  document.getElementById("xp").textContent = "XP: " + xp;

  document.getElementById("nivel").textContent =
    "Nível: " + (Math.floor(xp / 200) + 1);

  document.getElementById("progresso").style.width =
    (xp / 4) + "%";
}

function proximaFase() {
  faseAtual++;

  if (faseAtual >= fases.length) {
    mostrarTela("chefao");
    return;
  }

  carregarFase();
}

function finalizarJogo() {
  const texto = document.getElementById("redacao").value.trim();

  const palavras = texto.split(/\s+/).filter(Boolean).length;

  if (palavras < 30) {
    alert("Sua redação precisa ter pelo menos 30 palavras!");
    return;
  }

  xp += 200;

  mostrarTela("vitoria");

  document.getElementById("resultadoNome").textContent =
    "Aventureiro: " + nome;

  document.getElementById("resultadoXP").textContent =
    "⭐ XP conquistados: " + xp;

  document.getElementById("resultadoNivel").textContent =
    "🏅 Nível alcançado: " + (Math.floor(xp / 200) + 1);

  document.getElementById("resultadoPalavras").textContent =
    "📝 Palavras escritas: " + palavras;

}

