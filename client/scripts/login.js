loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = {
    username: document.getElementById("username").value,
    usernameEl: document.getElementById("username"),
    password: document.getElementById("password").value,
    passwordEl: document.getElementById("password"),
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

    API.userLoggedIn();

    form.usernameEl.value = "";
    form.passwordEl.value = "";
  } else {
    popup("Usuário ou senha incorretos.", {
      duration: 4000,
      type: "error",
    });
  }
});

logoutBtn.addEventListener("click", () => {
  API.userLoggedOut();
  if (contactCheckItems) {
    contactCheckItems.innerHTML = "";
  }

  setTimeout(() => {
    formSection.style.display = "none";
    loginSection.style.display = "flex";
    loginSection.style.opacity = "1";
  }, 700);

  setTimeout(() => {
    qrCodeSection.style.display = "block";
    contactCheckboxes.innerHTML = "";
    contactCount.innerText = "";
    contactCount.style.display = "none";
    searchQueryField.value = "";
    updateSelectedCount();
    generatedQr.clear();
  }, 1700);

  popup("Logout efetuado.", {
    type: "success",
  });
});
