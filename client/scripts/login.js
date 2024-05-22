loginBtn.addEventListener("click", () => {
  handleLogin();
});

// this logic will be updated
function handleLogin() {
  const form = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  if (!form.username || !form.password) {
    popup("Por favor preencha todos os campos.", {
      duration: 4000,
      type: "info",
    });
  } else if (form.username === "admin" && form.password === "admin") {
    popup("Login efetuado!", {
      duration: 4000,
      type: "success",
    });

    loginSection.style.opacity = "0";

    setTimeout(() => {
      loginSection.style.display = "none";
    }, 700);
  } else {
    popup("Usuário ou senha incorretos.", {
      duration: 4000,
      type: "error",
    });
  }
}
