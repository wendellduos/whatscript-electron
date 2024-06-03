const popupWrapper = document.getElementById("popup-wrp");

function popup(message, { duration = 5000, type = "info" }) {
  const newPopupIndex = document.querySelectorAll("popup").length;

  let icon = () => {
    switch (type) {
      case "error":
        return `<img src="./assets/icons/circle-xmark.svg" alt="icone de erro" />`;
      case "success":
        return `<img src="./assets/icons/circle-check.svg" alt="icone de sucesso" />`;
      case "warning":
        return `<img src="./assets/icons/circle-warning.svg" alt="icone de aviso" />`;
      case "info":
        return `<svg xmlns="http://www.w3.org/2000/svg" class="popup-info-icon" viewBox="0 0 512 512">><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`;
    }
  };

  const popup = `<div class="popup" id="popup-${newPopupIndex}"><div class="popup-img">${icon()}</div><small class="popup-msg" class="center">${message}</small></div>`;

  popupWrapper.innerHTML += popup;
}
