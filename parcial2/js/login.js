document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("registerUser").value.trim();
  let email = document.getElementById("registerEmail").value.trim();
  let password = document.getElementById("registerPassword").value;

  if (!username || !email || !password) {
    const message = document.getElementById("registerMessage");
    message.textContent = "Por favor, completa todos los campos.";
    message.style.color = "red";
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  const message = document.getElementById("registerMessage");
  message.textContent = "Registro exitoso. Por favor inicia sesión.";
  message.style.color = "green";

  
  this.reset();
});

  document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;

  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");

  const message = document.getElementById("loginMessage");

  if (email === storedEmail && password === storedPassword) {
    message.textContent = "Inicio de sesión exitoso.";
    message.style.color = "green";

  //dashboard.html
  window.location.href = "../Landing.html";
} else {
  alert("Correo o contraseña incorrectos.");
  message.style.color = "red";
}
});
