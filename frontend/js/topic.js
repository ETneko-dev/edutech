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
const buttons = document.querySelectorAll('.quizButton');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    buttons.forEach(btn => btn.classList.remove('is-selected'));

    this.classList.add('is-selected');
  });
});

loadTopic();