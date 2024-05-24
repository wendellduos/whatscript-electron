// create tooltip functionality on parent elements
tooltips.forEach((tooltip) => {
  tooltip.parentElement.classList.add("tooltip-parent");
});

API.onQr((qr) => {
  qrDisplay.innerHTML = "";

  new QRCode(qrDisplay, {
    text: qr,
    width: 200,
    height: 200,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });
});

API.onClientReady((userName, contacts) => {
  formSection.style.display = "flex";
  qrCodeSection.style.display = "none";
  qrDisplay.innerHTML = "";

  popup(`<span class="bold">${userName}</span> conectado.`, {
    type: "info",
  });

  contactCount.innerText = contacts.length;
  contactCount.style.display = "inline";

  contacts.forEach((contact, index) => {
    contactCheckboxes.innerHTML += `<div class="contact-checkitem" data-name="${contact.name.toLowerCase()}"><input type="checkbox" id="contact-${index}" class="contact-item" data-id="${
      contact.id
    }" checked /><div><label class="contact-inner-align" for="contact-${index}">${
      contact.name
    }<small class="dim">+${contact.number}</small></label></div></div></div>`;
  });

  contactCheckItems = document.querySelectorAll(".contact-checkitem");
  contactItemList = document.querySelectorAll(".contact-item");

  contactItemList.forEach((item) => {
    item.addEventListener("change", () => {
      updateSelectedCount();
    });
  });

  updateSelectedCount();
});

API.onClientDisconenct(() => {
  formSection.style.display = "none";
  qrCodeSection.style.display = "block";

  popup("Usuário desconectado.", {
    type: "warning",
  });
});

imgMsg.addEventListener("change", () => {
  imageNameEl.innerHTML = imgMsg.files[0].name;

  updateImageSelectorDisplay();
});

removeImageBtn.addEventListener("click", () => {
  imgMsg.value = null;
  imageNameEl.innerHTML = "";

  updateImageSelectorDisplay();
});

// send to user's own number
sendTestMessageBtn.addEventListener("click", () => {
  if (hasImageSelected()) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgData = {
        data: e.target.result.split(":", 2)[1].split(";", 1)[0],
        base64: e.target.result.split(",", 2)[1],
      };

      API.sendTestMediaMessage(
        messageInput.value,
        imgData.data,
        imgData.base64
      );
    };
    reader.readAsDataURL(imgMsg.files[0]);

    popup("Mensagem enviada!", {
      duration: 3000,
      type: "success",
    });
  } else {
    if (messageInput.value === "") {
      popup("A mensagem precisa ter conteúdo.", {
        duration: 3000,
        type: "warning",
      });
    } else {
      API.sendTestMessage(messageInput.value);
    }
  }
});

// timeout animation and message sendind logic
sendMessageBtn.addEventListener("mousedown", () => {
  let timeout = setTimeout(() => {
    timeoutAnimation.style.opacity = 0;

    const userIds = [];

    checkedContacts().forEach((contact) => {
      userIds.push(contact.dataset.id);
    });

    if (checkedContacts().length === 0) {
      popup("Nenhum contato selecionado.", {
        duration: 3000,
        type: "warning",
      });
    } else {
      if (hasImageSelected()) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = {
            data: e.target.result.split(":", 2)[1].split(";", 1)[0],
            base64: e.target.result.split(",", 2)[1],
          };
          API.sendMediaMessage(
            messageInput.value,
            userIds,
            imgData.data,
            imgData.base64
          );
        };
        reader.readAsDataURL(imgMsg.files[0]);

        popup("Mensagem enviada!", {
          duration: 3000,
          type: "success",
        });
      } else {
        if (messageInput.value === "") {
          popup("A mensagem precisa ter conteúdo.", {
            duration: 3000,
            type: "warning",
          });
        } else {
          API.sendMessage(messageInput.value, userIds);
        }
      }
    }
  }, 2000);

  timeoutAnimation.style.opacity = 1;
  timeoutBar.style.animationPlayState = "running";

  sendMessageBtn.addEventListener("mouseup", () => {
    clearTimeout(timeout);

    timeoutBar.style.animation = "none";
    timeoutBar.offsetHeight;
    timeoutBar.style.animation = "move-bar 2s linear infinite forwards";
    timeoutBar.style.animationPlayState = "paused";
    timeoutAnimation.style.opacity = 0;
  });
});

// search
searchQueryField.addEventListener("input", () => {
  if (searchQueryField.value) {
    updateContactListDisplay();
  } else {
    resetContactListDisplay();
  }
});

// select all contacts
selectAllBtn.addEventListener("click", () => {
  contactItemList.forEach((item) => {
    item.checked = true;
  });

  updateSelectedCount();
});

// deselect all contacts
deselectAllBtn.addEventListener("click", () => {
  contactItemList.forEach((item) => {
    item.checked = false;
  });

  updateSelectedCount();
});
