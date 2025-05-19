function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convierte a 32 bits
  }
  return hash;
}

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("registerUser").value.trim();
  let fullName = document.getElementById("registerFullName").value.trim();
  let password = document.getElementById("registerPassword").value;

  const message = document.getElementById("registerMessage");

  if (!username || !fullName || !password) {
    message.textContent = "Por favor, completa todos los campos.";
    message.style.color = "red";
    return;
  }

  // Validar que la contraseña tenga mínimo 4 números
  const numberCount = (password.match(/\d/g) || []).length;
  if (numberCount < 4) {
    message.textContent = "La contraseña debe contener al menos 4 números.";
    message.style.color = "red";
    return;
  }

  // Validar que la contraseña tenga al menos un caracter especial
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(password)) {
    message.textContent = "La contraseña debe contener al menos un carácter especial.";
    message.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    message.textContent = "Este nombre de usuario ya está registrado.";
    message.style.color = "red";
    return;
  }

  const hashedPassword = hashCode(password).toString();

  users.push({ username, fullName, password: hashedPassword });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registro exitoso. Por favor inicia sesión.";
  message.style.color = "green";

  this.reset();
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("loginUser").value.trim();
  let password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const hashedPassword = hashCode(password).toString();

  const matchedUser = users.find(user => user.username === username && user.password === hashedPassword);

  if (matchedUser) {
    localStorage.setItem("currentUser", matchedUser.username);

    message.textContent = "Inicio de sesión exitoso.";
    message.style.color = "green";

    window.location.href = "index.html";
  } else {
    message.textContent = "Usuario o contraseña incorrectos.";
    message.style.color = "red";
  }
});
