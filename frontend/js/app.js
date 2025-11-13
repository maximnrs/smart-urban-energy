const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");
const summary = document.getElementById("summary");
let token = null;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(loginForm);
  const username = fd.get("username");
  const password = fd.get("password");

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return alert("Login failed");
  const { token: t } = await res.json();
  token = t;
  document.getElementById("login").hidden = true;
  dashboard.hidden = false;
  loadSummary();
});

async function loadSummary() {
  const res = await fetch("/api/energy/summary", {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) return alert("Failed to fetch data");
  const data = await res.json();
  summary.innerText = JSON.stringify(data, null, 2);
}
