const tooltips = document.querySelectorAll(".tooltip");
const loginSection = document.getElementById("login");
const loginBtn = document.getElementById("login-btn");
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
