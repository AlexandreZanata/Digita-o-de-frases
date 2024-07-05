const main = document.querySelector(".main");
const typeArea = document.querySelector(".typingArea");
const btn = document.querySelector(".btn");

const words = [
  "Qual é o seu animal favorito?",
  "Você pode nomear as cores do arco-íris?",
  "O que você fez no último fim de semana?",
  "Por que o céu é azul?",
  "Qual é a sua matéria favorita na escola?",
  "Como as plantas crescem?",
  "Qual é o seu livro favorito?",
  "Onde você gosta de passar as férias?",
  "Quem é o seu melhor amigo?",
  "Como está o tempo hoje?",
  "Por que você gosta de brincar ao ar livre?",
  "Qual esporte você mais gosta?",
  "Como você faz um sanduíche?",
  "O que você quer ser quando crescer?",
];

const game = {
  start: 0,
  end: 0,
  user: "",
  arrText: "",
  index: 0 // Adicionando um índice para rastrear a frase atual
};

btn.addEventListener("click", () => {
  if (btn.textContent === "Começar") {
    play();
    typeArea.value = "";
    typeArea.disabled = false;
  } else if (btn.textContent === "Feito") {
    typeArea.disabled = true;
    main.style.borderColor = "white";
    end();
  }
});

function play() {
  // Seleciona a frase em ordem
  let randText = game.index % words.length;
  main.textContent = words[randText];
  game.arrText = words[randText];
  main.style.borderColor = "#c8c8c8";
  btn.textContent = "Feito";
  const duration = new Date();
  game.start = duration.getTime(); // unix timestamp
  
  // Incrementa o índice para a próxima frase
  game.index++;
}

function end() {
  const duration = new Date();
  game.end = duration.getTime();
  const totalTime = (game.end - game.start) / 1000;
  game.user = typeArea.value;
  const correct = results();
  main.style.borderColor = "white";
  main.innerHTML = `Tempo: ${totalTime} Pontuação: ${correct.score} de ${correct.total}`;
  btn.textContent = "Começar";

  // Destacar palavras corretas e incorretas
  let highlightedText = highlightText(game.arrText, game.user);
  main.innerHTML += `<br /><br />${highlightedText}`;
}

function highlightText(original, userInput) {
  let originalWords = original.split(/(\s+)/); // Mantém espaços na separação
  let userWords = userInput.split(/(\s+)/); // Mantém espaços na separação

  let highlighted = originalWords.map((word, idx) => {
    if (word === userWords[idx]) {
      return `<span style="color: green;">${word}</span>`; // Palavra correta em verde
    } else {
      return `<span style="color: red;">${word}</span>`; // Palavra incorreta em vermelho
    }
  });

  return highlighted.join("");
}

function results() {
  let valueOne = game.arrText.split(/\s+/); // Separa as palavras por espaços
  let valueTwo = game.user.split(/\s+/); // Separa as palavras por espaços
  let score = 0;

  valueOne.forEach((word, idx) => {
    if (word === valueTwo[idx]) {
      score++;
    }
  });

  // Considera todas as palavras na contagem total
  const total = valueOne.length;

  return { score, total };
}
