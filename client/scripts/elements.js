const minimizeBtn = document.getElementById("min-btn");
const closeBtn = document.getElementById("close-btn");
const tooltips = document.querySelectorAll(".tooltip");
const loginSection = document.getElementById("login");
const loginForm = document.getElementById("login-form-wrp");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const qrCodeSection = document.getElementById("qr-code-section");
const qrDisplay = document.getElementById("qr-display");
const formSection = document.getElementById("form-section");
const messageInput = document.getElementById("message");
const imgMsgSelector = document.getElementById("img-msg-selector");
const imgMsg = document.getElementById("img-msg");
const imageNameEl = document.getElementById("image-name");
const removeImageBtn = document.getElementById("remove-img-btn");
const sendTestMessageBtn = document.getElementById("send-test-msg-btn");
const sendMessageBtn = document.getElementById("send-msg-btn");
const timeoutAnimation = document.getElementById("timeout-animation");
const timeoutBar = document.getElementById("timeout-bar");
const contactCheckboxes = document.getElementById("contact-checkboxes");
const searchQueryField = document.getElementById("search-query");
const contactCount = document.getElementById("contact-count");
const checkedCount = document.getElementById("checked-count");
const deselectAllBtn = document.getElementById("deselect-all-btn");
const selectAllBtn = document.getElementById("select-all-btn");

// contactCheckItems refers to the entire block of content
// of a single contact, containing name, number and checkbox
let contactCheckItems;

// contactItemList is a list of every CHECKBOX inside contactCheckItems
let contactItemList;

// returns list of currently checked contact checkbox
let checkedContacts = () => document.querySelectorAll(".contact-item:checked");

let generatedQr = new QRCode(qrDisplay, {
  width: 200,
  height: 200,
  colorDark: "#303030",
  colorLight: "#fff",
  correctLevel: QRCode.CorrectLevel.H,
});
