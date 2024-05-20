const qrCodeSection = document.getElementById("qr-code-section");
const qrDisplay = document.getElementById("qr-display");
const formSection = document.getElementById("form-section");
const messageInput = document.getElementById("message");
const sendTestMessageBtn = document.getElementById("send-test-msg-btn");
const contactCheckboxes = document.getElementById("contact-checkboxes");

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

  populateContactList(userName, contacts);
});

window.electronAPI.onClientDisconenct(() => {
  formSection.style.display = "none";
  qrCodeSection.style.display = "block";

  popup("Usuário desconectado.", {
    display: 4000,
    type: "warning",
  });
});

sendTestMessageBtn.addEventListener("click", () => {
  const msgBody = messageInput.value;

  window.electronAPI.sendTestMessage(msgBody);
});

function populateContactList(name, contactList) {
  contactList.forEach((contact, index) => {
    contactCheckboxes.innerHTML += `<div class="contact-checkitem"><input type="checkbox" id="contact-${index}" data-id="${contact.id}" checked /><div><label class="contact-inner-align" for="contact-${index}">${contact.name}<small class="dim">+${contact.number}</small></label></div></div></div>`;
  });
}
