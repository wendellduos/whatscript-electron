const qrCodeSection = document.getElementById("qr-code-section");
const qrDisplay = document.getElementById("qr-display");
const formSection = document.getElementById("form-section");
const messageInput = document.getElementById("message");
const sendTestMessageBtn = document.getElementById("send-test-msg-btn");
const sendMessageBtn = document.getElementById("send-msg-btn");
const contactCheckboxes = document.getElementById("contact-checkboxes");
const searchQueryField = document.getElementById("search-query");
const deselectAllBtn = document.getElementById("deselect-all-btn");
const selectAllBtn = document.getElementById("select-all-btn");

let userData = {
  name: "",
  contactList: [],
};

window.electronAPI.handleQr((qr) => {
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

window.electronAPI.onClientReady((userName, contacts) => {
  formSection.style.display = "block";
  qrCodeSection.style.display = "none";
  qrDisplay.innerHTML = "";

  popup(`<span class="bold">${userName}</span> conectado.`, {
    type: "info",
  });

  const contactCount = document.getElementById("contact-count");
  contactCount.innerText = contacts.length;
  contactCount.style.display = "inline";

  contacts.forEach((contact, index) => {
    contactCheckboxes.innerHTML += `<div class="contact-checkitem" data-name="${contact.name.toLowerCase()}"><input type="checkbox" id="contact-${index}" class="contact-item" data-id="${
      contact.id
    }" checked /><div><label class="contact-inner-align" for="contact-${index}">${
      contact.name
    }<small class="dim">+${contact.number}</small></label></div></div></div>`;
  });

  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("change", () => {
      console.log("changed");
      updateSelectedCount();
    });
  });
});

window.electronAPI.onClientDisconenct(() => {
  formSection.style.display = "none";
  qrCodeSection.style.display = "block";

  popup("Usuário desconectado.", {
    display: 4000,
    type: "warning",
  });
});

// send to user's own number
sendTestMessageBtn.addEventListener("click", () => {
  const msgBody = messageInput.value;
  window.electronAPI.sendTestMessage(msgBody);
});

// send to all selected contacts
sendMessageBtn.addEventListener("click", () => {
  const userIds = [];
  const checkedContacts = document.querySelectorAll(".contact-item:checked");

  checkedContacts.forEach((contact) => {
    userIds.push(contact.dataset.id);
  });

  const msgBody = messageInput.value;
  // window.electronAPI.sendMessage(msgBody, userIds);
  console.log(userIds);
});

// search
searchQueryField.addEventListener("input", () => {
  if (searchQueryField.value) {
    updateContactListDisplay();
  } else {
    resetContactList();
  }
});

// select all contacts
selectAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.checked = true;
  });

  updateSelectedCount();
});

// deselect all contacts
deselectAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.checked = false;
  });

  updateSelectedCount();
});

function updateContactListDisplay() {
  const searchQuery = searchQueryField.value.toLowerCase();
  const contactCheckItems = document.querySelectorAll(".contact-checkitem");

  contactCheckItems.forEach((contact) => {
    if (!contact.dataset.name.includes(searchQuery)) {
      contact.style.display = "none";
    } else {
      contact.style.display = "flex";
    }
  });
}

function resetContactList() {
  const contactCheckItems = document.querySelectorAll(".contact-checkitem");

  contactCheckItems.forEach((contact) => {
    contact.style.display = "flex";
  });
}

function updateSelectedCount() {
  const count = document.getElementById("checked-count");
  const list = document.querySelectorAll(".contact-item:checked");

  count.innerText = list.length;
}
