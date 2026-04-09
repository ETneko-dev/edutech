const API_BASE = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-title").textContent = "Login";
  document.getElementById("login-message").textContent = "";

  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", async () => {
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("loggedInUser", data.email);
        document.getElementById("login-message").textContent = "Login successful!";
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } else {
        document.getElementById("login-message").textContent =
          data.error || "Login failed.";
      }
    } catch (error) {
      document.getElementById("login-message").textContent =
        "Could not reach server.";
    }
  });
});
