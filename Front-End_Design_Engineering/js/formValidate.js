const form = document.getElementById("loginForm");

const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");

const emailInput = document.getElementById("userEmailInput");
const passwordInput = document.getElementById("userPasswordInput");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

function validarLogin(email, password) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  return {
    validEmail: regexEmail.test(email),
    validPassword: regexpassword.test(password),
  };
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const result = validarLogin(email, password);

  // Email
  if (result.validEmail == false) {
    userEmail.classList.add("user-error");
    emailError.textContent = "O usuário deve ser um e-mail";
  } else {
    userEmail.classList.remove("user-error");
    emailError.textContent = "";
  }

  // Password
  if (result.validPassword == false) {
    userPassword.classList.add("user-error");
    passwordError.textContent =
      "A senha deve conter no mínimo 6 dígitos e 1 número.";
  } else {
    userPassword.classList.remove("user-error");
    passwordError.textContent = "";
  }

  // Sucess
  if (result.validEmail && result.validPassword) {
    alert("Logado!");
  }
});
