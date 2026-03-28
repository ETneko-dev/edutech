const API_BASE = "http://localhost:8080/api";

async function loadLoginPage() {
  try {
    const response = await fetch(`${API_BASE}/login`);
    if (!response.ok) {
      throw new Error("Failed to load login data");
    }

    const data = await response.json();

    document.getElementById("login-title").textContent = data.title || "Login";
    document.getElementById("login-message").textContent = data.message || "No login message returned.";
  } catch (error) {
    document.getElementById("login-title").textContent = "Login";
    document.getElementById("login-message").textContent = "Failed to load login data.";
  }
}

loadLoginPage();
