async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError").textContent = data.error;
  }
}

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  alert("Account aangemaakt. Je kunt nu inloggen.");
}
