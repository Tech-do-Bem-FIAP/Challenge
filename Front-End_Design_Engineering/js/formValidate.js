const form = document.getElementById("loginForm");

const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");

const emailInput = document.getElementById("userEmailInput");
const senhaInput = document.getElementById("userPasswordInput");

const emailError = document.getElementById("emailError");
const senhaError = document.getElementById("passwordError");

function validarLogin(email, senha) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  return {
    emailValido: regexEmail.test(email),
    senhaValida: regexSenha.test(senha),
  };
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const senha = senhaInput.value;

  const resultado = validarLogin(email, senha);

  // Email
  if (resultado.emailValido == false) {
    userEmail.classList.add("user-error");
    emailError.textContent = "O usuário deve ser um e-mail";
  } else {
    userEmail.classList.remove("user-error");
    emailError.textContent = "";
  }

  // Senha
  if (resultado.senhaValida == false) {
    userPassword.classList.add("user-error");
    senhaError.textContent =
      "A senha deve conter no mínimo 6 dígitos e 1 número.";
  } else {
    userPassword.classList.remove("user-error");
    senhaError.textContent = "";
  }

  // Sucesso
  if (resultado.emailValido && resultado.senhaValida) {
    alert("Logado!");
  }
});
