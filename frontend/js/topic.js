const API_BASE = "http://localhost:8080/api";

function getTopicIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadTopic() {
  const topicId = getTopicIdFromUrl();
  if (!topicId) {
    window.location.href = "./404.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/topics/${encodeURIComponent(topicId)}`);

    if (response.status === 404) {
      window.location.href = "./404.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to load topic");
    }

    const topic = await response.json();
    document.getElementById("topic-name").textContent = topic.name;
  } catch (error) {
    window.location.href = "./404.html";
  }
}

// button click effect
const buttons = document.querySelectorAll(".quizButton");
// btn is declared as the parameter of the arrow function.
buttons.forEach((btn) => {
  btn.classList.remove("is-selected");
});
buttons.forEach(button => {
  button.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('is-selected'));

    this.classList.add('is-selected');
  });
});

// variable set for questions
let allQuestions = [];
let currentIndex = 0;
let score = 0;


async function getQuestions() {
  const topicId = getTopicIdFromUrl();
  if (!topicId) return;

  try{
    const response = await fetch(`${API_BASE}/questions/${encodeURIComponent(topicId)}`);

    if (!response.ok) throw new Error("Failed to load questions");

    allQuestions = await response.json();

    // check if array has items > 0
    if (allQuestions.length > 0) {
      displayCurrentQuestion();
    } else {
      document.getElementById("question-text").textContent = "No questions found.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
// bring questions for each topic
function displayCurrentQuestion() {
  // defines current question
  const q = allQuestions[currentIndex];

  // score progress starts from 1
  // use the question_text value from the current question object(q.question_text)
  document.getElementById("question-text").textContent = q.question_text;
  // replace curren-progress with 'currentIndex + 1'
  document.getElementById("current-progress").textContent = `${currentIndex + 1}/${allQuestions.length}`;

  // finds all element from html (quizButton)
  const buttons = document.querySelectorAll(".quizButton");
  // read obtion_ABCD in q
  const options = [q.option_A, q.option_B, q.option_C, q.option_D];

  // forEach goes through each item in buttons
  // for each item, it puts that current item into the variable btn
  buttons.forEach((btn) => {
    btn.classList.remove("is-selected");
  });

  buttons.forEach((btn, index) => {
    btn.textContent = options[index];

    // set the button text to the matching option
    // call function when button is clicked
    btn.onclick = () => handleAnswer(options[index], q.answer);
  });
}
//
function handleAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score += 10;
    document.getElementById("current-score").textContent = score;
    alert("Correct!");
  } else {
    alert("Wrong! The correct answer was: " + correctAnswer);
  }

  // Move to next question automatically after they click
  nextQuestion();
}

function nextQuestion() {
  if (currentIndex < allQuestions.length - 1) {
    currentIndex++;
    displayCurrentQuestion();
  } else {
    alert(`Quiz Finished! Final Score: ${score}`);
    window.location.href = "index.html";
  }
}

loadTopic();
getQuestions();
