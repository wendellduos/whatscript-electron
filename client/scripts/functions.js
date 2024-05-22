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
  if (imgMsg.files[0].name) {
    return true;
  } else {
    return false;
  }
}
