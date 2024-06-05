loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  const form = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  if (!form.username || !form.password) {
    popup("Por favor, preencha todos os campos.", {
      duration: 4000,
    });
  } else {
    fetch("http://localhost:5330/sign-in/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 404) {
          popup("Usuário ou Senha incorretos!", {
            type: "error",
            duration: 3000,
          });
        }

        return res.json();
      })
      .then((data) => {
        if (!data.message) {
          console.log("nice, save this data: ", data);

          // save data in localStorage

          popup("Login efetuado!", {
            duration: 4000,
            type: "success",
          });

          loginSection.style.opacity = "0";

          setTimeout(() => {
            loginSection.style.display = "none";
          }, 700);

          API.userLoggedIn();

          usernameEl.value = "";
          passwordEl.value = "";
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);

        popup("Erro desconhecido, contate um administrador.", {
          type: "error",
          duration: 4000,
        });
      });
  }

  // const form = {
  //   username: document.getElementById("username").value,
  //   usernameEl: document.getElementById("username"),
  //   password: document.getElementById("password").value,
  //   passwordEl: document.getElementById("password"),
  // };

  // if (!form.username || !form.password) {
  //   popup("Por favor preencha todos os campos.", {
  //     duration: 4000,
  //     type: "info",
  //   });
  // } else if (form.username === "admin" && form.password === "admin") {
  //   popup("Login efetuado!", {
  //     duration: 4000,
  //     type: "success",
  //   });

  //   loginSection.style.opacity = "0";

  //   setTimeout(() => {
  //     loginSection.style.display = "none";
  //   }, 700);

  //   API.userLoggedIn();

  //   form.usernameEl.value = "";
  //   form.passwordEl.value = "";
  // } else {
  //   popup("Usuário ou senha incorretos.", {
  //     duration: 4000,
  //     type: "error",
  //   });
  // }
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
