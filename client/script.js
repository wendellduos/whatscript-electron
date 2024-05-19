const mode = document.getElementById("mode");
const messageBody = document.getElementById("message");
const imageField = document.getElementById("image");

const qrField = document.getElementById("qr");
const qrMask = document.getElementById("qr-mask");

window.electronAPI.handleQr((qr) => {
  generateQrCode(qr);
});

window.electronAPI.onClientReady(() => {
  document.getElementById("status").innerHTML = "ready";
});

generateQrCode(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`);

// clear image input field to avoid false positives when sending message
imageField.value = null;

// update name of file selector to selected image's name
const imageTitleField = document.getElementById("image-title");

imageField.addEventListener("change", () => {
  imageTitleField.innerHTML = imageField.files[0].name;
});

// trigger events on PROSSEGUIR button click
document.getElementById("submit-form").addEventListener("click", () => {
  const message = {
    for: mode.value,
    body: messageBody.value,
    // image: () => {
    // if (messageHasImage) {
    //   new FormData().append("image", imageField.files[0]);
    // }
    // },
  };
});

function generateQrCode(data) {
  new QRCode(qrField, {
    text: data,
    width: 264,
    height: 264,
    colorDark: "#132f31",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
