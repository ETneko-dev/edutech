const API_BASE = "http://localhost:8080/api";

function renderNavbarAuth() {
  const navAuth = document.getElementById("nav-auth");
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const loggedInDisplayName = sessionStorage.getItem("loggedInDisplayName");

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

  const displayName = loggedInDisplayName || loggedInUser;
  const initial = displayName.charAt(0).toUpperCase();

  navAuth.innerHTML = `
    <div class="profile-menu">
      <button id="profile-toggle" class="profile-toggle" type="button">
        <span class="avatar">${initial}</span>
        <span class="profile-email">${displayName}</span>
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
    sessionStorage.removeItem("loggedInDisplayName");
    window.location.href = "./index.html";
  });
}

async function loadTopics() {
  const container = document.getElementById("topics");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE}/topics`);
    if (!response.ok) {
      throw new Error("Failed to load topics");
    }

    const topics = await response.json();

    container.innerHTML = "";
    topics.forEach((topic) => {
      const link = document.createElement("a");
      link.href = `./topic.html?id=${encodeURIComponent(topic.id)}`;

      const card = document.createElement("div");
      card.className = "topic-card";
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
    console.error("Could not load topics:", error);
    container.textContent = "Could not load topics.";
  }
}

function medalForIndex(index) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return "";
}

async function loadLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  try {
    const response = await fetch(`${API_BASE}/score/leaderboard`);
    if (!response.ok) {
      throw new Error("Failed to load leaderboard");
    }

    const rows = await response.json();
    list.innerHTML = "";

    if (!Array.isArray(rows) || rows.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No scores yet.";
      list.appendChild(empty);
      return;
    }

    rows.forEach((row, index) => {
      const li = document.createElement("li");
      li.className = "leaderboard-row";

      const left = document.createElement("div");
      left.className = "leaderboard-left";

      const rank = document.createElement("span");
      rank.className = "leaderboard-rank";
      const medal = medalForIndex(index);
      rank.textContent = medal ? medal : `${index + 1}.`;

      const name = document.createElement("span");
      name.className = "leaderboard-name";
      name.textContent = row.userName || "Unknown";

      const score = document.createElement("span");
      score.className = "leaderboard-score";
      score.textContent = `${row.totalScore ?? 0}`;

      left.appendChild(rank);
      left.appendChild(name);
      li.appendChild(left);
      li.appendChild(score);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Could not load leaderboard:", error);
    list.innerHTML = "<li>Could not load leaderboard.</li>";
  }
}

function setupLeaderboardRefreshButton() {
  const refreshBtn = document.getElementById("refresh-leaderboard-btn");
  if (!refreshBtn) return;

  refreshBtn.addEventListener("click", async () => {
    refreshBtn.disabled = true;
    const oldText = refreshBtn.textContent;
    refreshBtn.textContent = "Refreshing...";

    await loadLeaderboard();

    refreshBtn.textContent = oldText;
    refreshBtn.disabled = false;
  });
}

renderNavbarAuth();
loadTopics();
loadLeaderboard();
setupLeaderboardRefreshButton();
console.log("home.js loaded");
