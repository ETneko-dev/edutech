const API_BASE = "http://localhost:8080/api";

async function loadTopics() {
  const container = document.getElementById("topics");

  try {
    const response = await fetch(`${API_BASE}/topics`);
    if (!response.ok) {
      throw new Error("Failed to load topics");
    }

    const topics = await response.json();

    topics.forEach((topic) => {
      const link = document.createElement("a");
      link.href = `./topic.html?id=${encodeURIComponent(topic.id)}`;

      const card = document.createElement("div");
      card.style.border = "1px solid black";
      card.style.margin = "10px";
      card.style.padding = "20px";
      card.style.width = "200px";

      const title = document.createElement("h2");
      title.textContent = topic.name;

      card.appendChild(title);
      link.appendChild(card);
      container.appendChild(link);
    });
  } catch (error) {
    container.textContent = "Could not load topics.";
  }
}

loadTopics();

console.log("home.js loaded");
