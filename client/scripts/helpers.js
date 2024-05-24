// needs to use a different method to enable multiple popups at once
function popup(message, { duration = 5000, type = "info" }) {
  const popupEl = document.getElementById("popup");
  const popupImgEl = document.getElementById("popup-img");
  const popupMsgEl = document.getElementById("popup-msg");

  let icon;

  switch (type) {
    case "error":
      icon = `<img src="./assets/icons/circle-xmark.svg" alt="icone de erro" />`;
      break;
    case "success":
      icon = `<img src="./assets/icons/circle-check.svg" alt="icone de sucesso" />`;
      break;
    case "warning":
      icon = `<img src="./assets/icons/circle-warning.svg" alt="icone de aviso" />`;
      break;
    case "info":
      icon = `<img src="./assets/icons/circle-info.svg" alt="icone de informação" />`;
  }

  popupImgEl.innerHTML = icon;
  popupMsgEl.innerHTML = message;
  popupEl.style.opacity = 1;
  popupEl.style.bottom = "1rem";

  setTimeout(() => {
    popupEl.style.bottom = "0";
    popupEl.style.opacity = 0;
  }, duration);

  setTimeout(() => {
    popupImgEl.innerHTML = "";
    popupMsgEl.innerHTML = "";
  }, duration + 200);
}
