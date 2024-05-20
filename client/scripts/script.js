const qrCodeSection = document.getElementById("qr-code-section");
const qrDisplay = document.getElementById("qr-display");
const formSection = document.getElementById("form-section");
const messageInput = document.getElementById("message");
const sendTestMessageBtn = document.getElementById("send-test-msg-btn");

window.electronAPI.handleQr((qr) => {
  qrDisplay.innerHTML = "";

  new QRCode(qrDisplay, {
    text: qr,
    width: 264,
    height: 264,
    colorDark: "#132f31",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });
});

window.electronAPI.onClientReady((userName, contacts) => {
  formSection.style.display = "block";
  qrCodeSection.style.display = "none";
  qrDisplay.innerHTML = "";

  popup(`<span class="bold">${userName}</span> conectado.`, 4000);

  console.log(contacts);
});

window.electronAPI.onClientDisconenct(() => {
  formSection.style.display = "none";
  qrCodeSection.style.display = "block";

  popup("Usuário desconectado.", 4000);
});

sendTestMessageBtn.addEventListener("click", () => {
  const msgBody = messageInput.value;

  window.electronAPI.sendTestMessage(msgBody);
});
