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
      icon = `<svg xmlns="http://www.w3.org/2000/svg" id="popup-info-icon" viewBox="0 0 512 512">><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
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
