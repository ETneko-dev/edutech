const API_BASE = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", async () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  const notLoggedInDiv = document.getElementById("not-logged-in");
  const loggedInDiv = document.getElementById("logged-in");

  if (!loggedInUser) {
    notLoggedInDiv.style.display = "block";
    return;
  }

  // User is logged in — show their info
  loggedInDiv.style.display = "block";
  document.getElementById("user-email").textContent = loggedInUser;

  // Fetch scores from backend
  try {
    const response = await fetch(
      `${API_BASE}/score?email=${encodeURIComponent(loggedInUser)}`
    );

    if (response.ok) {
      const scores = await response.json();

      const math = scores.mathTotalScore || 0;
      const science = scores.scienceTotalScore || 0;
      const history = scores.historyTotalScore || 0;
      const music = scores.musicTotalScore || 0;
      const sports = scores.sportsTotalScore || 0;

      document.getElementById("score-math").textContent = math;
      document.getElementById("score-science").textContent = science;
      document.getElementById("score-history").textContent = history;
      document.getElementById("score-music").textContent = music;
      document.getElementById("score-sports").textContent = sports;
      document.getElementById("score-total").textContent =
        math + science + history + music + sports;
    } else {
      console.error("Failed to load scores");
    }
  } catch (error) {
    console.error("Could not reach server:", error);
  }

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});