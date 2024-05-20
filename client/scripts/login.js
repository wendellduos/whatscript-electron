const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", () => {
  handleLogin();
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "Enter") {
    handleLogin();
  }
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

    const loginSection = document.getElementById("login");

    setTimeout(() => {
      loginSection.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
      loginSection.style.display = "none";
    }, 1700);
  } else {
    popup("Usuário ou senha incorretos.", {
      duration: 4000,
      type: "error",
    });
  }
}
