function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
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

      const numberCount = (password.match(/\d/g) || []).length;
      if (numberCount < 4) {
        message.textContent = "La contraseña debe contener al menos 4 números.";
        message.style.color = "red";
        return;
      }

      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialCharRegex.test(password)) {
        message.textContent = "La contraseña debe contener al menos un carácter especial.";
        message.style.color = "red";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some(user => user.username === username || user.email === email);
      if (userExists) {
        message.textContent = "Este nombre de usuario o correo ya está registrado.";
        message.style.color = "red";
        return;
      }

      const hashedPassword = hashCode(password).toString();

      users.push({ username, email, password: hashedPassword });
      localStorage.setItem("users", JSON.stringify(users));

      message.textContent = "Registro exitoso. Por favor inicia sesión.";
      message.style.color = "green";

      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let email = document.getElementById("loginEmail").value.trim();
      let password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const hashedPassword = hashCode(password).toString();

      const matchedUser = users.find(user => user.email === email && user.password === hashedPassword);

      if (matchedUser) {
        localStorage.setItem("currentUser", matchedUser.username);

        message.textContent = "Inicio de sesión exitoso.";
        message.style.color = "green";

        window.location.href = "index.html";
      } else {
        message.textContent = "Correo o contraseña incorrectos.";
        message.style.color = "red";
      }
    });
  }
  const ctx = document.getElementById("myChart").getContext("2d");

});
