const API_BASE = "http://localhost:8080/api";

function getTopicIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Map topicId to the score key returned by backend
function getScoreKeyForTopic(topicId) {
  const map = {
    "1": "mathTotalScore",
    "2": "scienceTotalScore",
    "3": "historyTotalScore",
    "4": "musicTotalScore",
    "5": "sportsTotalScore",
  };
  return map[topicId] || null;
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

// Load saved score for logged-in user and display it
async function loadSavedScore() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) return;

  const topicId = getTopicIdFromUrl();
  const scoreKey = getScoreKeyForTopic(topicId);
  if (!scoreKey) return;

  try {
    const response = await fetch(`${API_BASE}/score?email=${encodeURIComponent(loggedInUser)}`);
    if (response.ok) {
      const scores = await response.json();
      const savedScore = scores[scoreKey] || 0;
      document.getElementById("current-score").textContent = savedScore;
      // Initialize the local score variable with the saved value
      score = savedScore;
    }
  } catch (error) {
    console.error("Could not load saved score:", error);
  }
}

// button click effect
const buttons = document.querySelectorAll(".quizButton");
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

    if (allQuestions.length > 0) {
      displayCurrentQuestion();
    } else {
      document.getElementById("question-text").textContent = "No questions found.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayCurrentQuestion() {
  const q = allQuestions[currentIndex];

  document.getElementById("question-text").textContent = q.question_text;
  document.getElementById("current-progress").textContent = `${currentIndex + 1}/${allQuestions.length}`;

  const buttons = document.querySelectorAll(".quizButton");
  const options = [q.option_A, q.option_B, q.option_C, q.option_D];

  buttons.forEach((btn) => {
    btn.classList.remove("is-selected");
  });

  buttons.forEach((btn, index) => {
    btn.textContent = options[index];
    btn.onclick = () => handleAnswer(options[index], q.answer);
  });
}

function handleAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score += 10;
    document.getElementById("current-score").textContent = score;
    alert("Correct!");
  } else {
    alert("Wrong! The correct answer was: " + correctAnswer);
  }

  nextQuestion();
}

async function nextQuestion() {
  if (currentIndex < allQuestions.length - 1) {
    currentIndex++;
    displayCurrentQuestion();
  } else {
    // Quiz finished — save score if logged in
    await saveScore();
    alert(`Quiz Finished! Final Score: ${score}`);
    window.location.href = "index.html";
  }
}

async function saveScore() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) return; // not logged in, don't save

  const topicId = getTopicIdFromUrl();
  if (!topicId) return;

  // Send only the points earned this quiz session (10 per correct answer)
  // The backend ADDS this to the existing total
  const pointsEarned = score - (await getExistingScore());

  try {
    await fetch(`${API_BASE}/score/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loggedInUser,
        topicId: parseInt(topicId),
        score: pointsEarned,
      }),
    });
  } catch (error) {
    console.error("Failed to save score:", error);
  }
}

async function getExistingScore() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) return 0;

  const topicId = getTopicIdFromUrl();
  const scoreKey = getScoreKeyForTopic(topicId);
  if (!scoreKey) return 0;

  try {
    const response = await fetch(`${API_BASE}/score?email=${encodeURIComponent(loggedInUser)}`);
    if (response.ok) {
      const scores = await response.json();
      return scores[scoreKey] || 0;
    }
  } catch (error) {
    console.error("Could not fetch existing score:", error);
  }
  return 0;
}

loadTopic();
loadSavedScore();
getQuestions();
