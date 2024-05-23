function updateContactListDisplay() {
  const searchQuery = searchQueryField.value.toLowerCase();

  contactCheckItems.forEach((contact) => {
    if (!contact.dataset.name.includes(searchQuery)) {
      contact.style.display = "none";
    } else {
      contact.style.display = "flex";
    }
  });
}

function resetContactListDisplay() {
  contactCheckItems.forEach((contact) => {
    contact.style.display = "flex";
  });
}

function updateSelectedCount() {
  checkedCount.innerText = checkedContacts().length;
}

function hasImageSelected() {
  if (imgMsg.value) {
    return true;
  } else {
    return false;
  }
}

function updateImageSelectorDisplay() {
  if (hasImageSelected()) {
    imgMsgSelector.classList.add("has-img");
    removeImageBtn.style.display = "flex";
  } else {
    imgMsgSelector.classList.remove("has-img");
    removeImageBtn.style.display = "none";
  }
}
