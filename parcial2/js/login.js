
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("registerUser").value.trim();
  let email = document.getElementById("registerEmail").value.trim();
  let password = document.getElementById("registerPassword").value;

  const message = document.getElementById("registerMessage");

  if (!username || !email || !password) {
    message.textContent = "Por favor, completa todos los campos.";
    message.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    message.textContent = "Este correo ya está registrado.";
    message.style.color = "red";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registro exitoso. Por favor inicia sesión.";
  message.style.color = "green";

  this.reset();
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    localStorage.setItem("currentUser", matchedUser.email);  
    message.textContent = "Inicio de sesión exitoso.";
    message.style.color = "green";
    window.location.href = "index.html";  
  } else {
    message.textContent = "Correo o contraseña incorrectos.";
    message.style.color = "red";
  }
});
