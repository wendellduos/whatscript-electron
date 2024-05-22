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
  formSection.style.display = "block";
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

  if (hasImageSelected()) {
    imgMsgSelector.classList.add("has-img");
  } else {
    imgMsgSelector.classList.remove("has-img");
  }
});

// send to user's own number
sendTestMessageBtn.addEventListener("click", () => {
  API.sendTestMessage(messageInput.value);
});

// send to all selected contacts
sendMessageBtn.addEventListener("click", () => {
  const userIds = [];

  checkedContacts().forEach((contact) => {
    userIds.push(contact.dataset.id);
  });

  // API.sendMessage(messageInput.value, userIds);
  console.log(userIds);
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
