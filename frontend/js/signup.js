const API_BASE = "http://localhost:8080/api";

document.getElementById("signup-btn").addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("signup-message").textContent =
        "Account created! Redirecting to login...";
      setTimeout(() => (window.location.href = "login.html"), 1500);
    } else {
      document.getElementById("signup-message").textContent =
        data.error || "Signup failed.";
    }
  } catch (error) {
    document.getElementById("signup-message").textContent =
      "Could not reach server.";
  }
});