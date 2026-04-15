const API_BASE = "http://localhost:8080/api";

function renderNavbarAuth() {
  const navAuth = document.getElementById("nav-auth");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (!navAuth) return;

  if (!loggedInUser) {
    navAuth.innerHTML = `
      <a id="account-button" href="./account.html" style="
        background-color: #555;
        color: white;
        padding: 8px 20px;
        border-radius: 5px;
        display: inline-block;
        transition: background-color 0.3s ease;
        margin-right: 10px;
      ">Account</a>
      <a id="login-button" href="./login.html">Login</a>
    `;
    return;
  }
  const initial = loggedInUser.charAt(0).toUpperCase();

  navAuth.innerHTML = `
    <div class="profile-menu">
      <button id="profile-toggle" class="profile-toggle" type="button">
        <span class="avatar">${initial}</span>
        <span class="profile-email">${loggedInUser}</span>
      </button>

      <div id="profile-dropdown" class="profile-dropdown hidden">
        <a href="./account.html">Profile</a>
        <button id="logout-button" type="button">Logout</button>
      </div>
    </div>
  `;
  const toggle = document.getElementById("profile-toggle");
  const dropdown = document.getElementById("profile-dropdown");
  const logoutButton = document.getElementById("logout-button");

  toggle.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "./index.html";
  });
}

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
const card = document.createElement("div");
card.className = "topic-card";

renderNavbarAuth();
loadTopics();

console.log("home.js loaded");
