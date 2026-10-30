const fases = [
  {
    nome: "🏰 Portal da Introdução",
    historia: "O guardião do portal exige que você demonstre domínio da construção de uma tese crítica e bem delimitada.",
    pergunta: "Considerando o tema 'Os desafios para combater o bullying nas escolas brasileiras', qual alternativa apresenta a tese mais consistente?",
    alternativas: [
      "O bullying é um problema muito grave e acontece em várias escolas brasileiras.",
      "A persistência do bullying nas escolas brasileiras está relacionada à insuficiência de políticas de prevenção e à naturalização de comportamentos discriminatórios no ambiente escolar.",
      "O bullying existe há muito tempo e precisa ser combatido por todos."
    ],
    correta: 1,
    explicacao: "A alternativa apresenta um posicionamento específico e dois eixos argumentativos que podem ser desenvolvidos ao longo da redação."
  },
  {
    nome: "🌳 Floresta dos Argumentos",
    historia: "O dragão da superficialidade bloqueia a passagem. Para derrotá-lo, você precisa construir uma argumentação aprofundada.",
    pergunta: "Em uma redação sobre o bullying escolar, qual estratégia apresenta maior aprofundamento argumentativo?",
    alternativas: [
      "Afirmar que o bullying é prejudicial porque machuca os sentimentos dos estudantes.",
      "Repetir que a violência escolar é um problema grave e que precisa ser resolvido imediatamente.",
      "Analisar como a ausência de ações educativas e a reprodução de preconceitos contribuem para a naturalização da violência, comprometendo a saúde emocional e o desempenho acadêmico das vítimas."
    ],
    correta: 2,
    explicacao: "A alternativa apresenta relações de causa e consequência, explica os mecanismos que sustentam o problema e demonstra suas consequências sociais."
  },
  {
    nome: "📚 Biblioteca dos Sábios",
    historia: "O bibliotecário desafia você a utilizar repertórios socioculturais de maneira legítima, pertinente e produtiva.",
    pergunta: "Em uma redação sobre a responsabilidade das instituições de ensino no combate ao bullying, qual utilização de repertório é mais produtiva?",
    alternativas: [
      "Relacionar o artigo 205 da Constituição Federal de 1988, que estabelece a educação como direito de todos e dever do Estado e da família, à necessidade de garantir um ambiente escolar adequado à formação dos estudantes.",
      "Mencionar a Constituição Federal de 1988 sem explicar sua relação com o problema discutido.",
      "Citar um filósofo famoso sem apresentar sua ideia ou relacioná-la ao tema."
    ],
    correta: 0,
    explicacao: "O repertório é legítimo, pertinente e produtivo porque relaciona um dispositivo constitucional à discussão sobre o direito à educação."
  },
  {
    nome: "🏯 Castelo da Conclusão",
    historia: "O último guardião protege o castelo. Para vencê-lo, você precisa elaborar uma proposta de intervenção detalhada e articulada ao problema.",
    pergunta: "Qual proposta de intervenção apresenta maior completude para combater o bullying nas escolas brasileiras?",
    alternativas: [
      "O bullying deve acabar, pois todos precisam respeitar uns aos outros e viver em harmonia.",
      "O Ministério da Educação, em parceria com as secretarias estaduais de ensino, deve implementar programas permanentes de prevenção ao bullying, por meio de formação docente, rodas de conversa e canais seguros de denúncia, a fim de promover o acolhimento das vítimas e reduzir as práticas de violência escolar.",
      "Os alunos que praticarem bullying devem ser retirados imediatamente da escola, independentemente da situação."
    ],
    correta: 1,
    explicacao: "A proposta apresenta agente, ação, meio de execução, finalidade e detalhamento, respeitando os direitos humanos e priorizando a prevenção e o acolhimento."
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

