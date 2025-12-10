/****on recupére les element de la modale et on ajoute les listeners */

const dialog = document.querySelector("dialog");
const showModify = document.querySelector(".modify");
const closeModal = document.querySelectorAll(".fa-xmark");
const backDrop = document.querySelector("dialog");
const addPicture = document.querySelector(".modal-footer button");
const leftIcon = document.querySelector(".fa-arrow-left");
const modalPageOne = document.querySelector(".modal");
const modalPageTwo = document.querySelector(".modalTwo");

function modalOne() {
  modalPageOne.style.display = "flex";
  modalPageTwo.style.display = "none";
}

function modalTwo() {
  modalPageOne.style.display = "none";
  modalPageTwo.style.display = "flex";
}

showModify.addEventListener("click", () => {
  dialog.showModal();
  modalOne();
});

closeModal.forEach((element) => {
  element.addEventListener("click", () => {
    clearForm();
    dialog.close();
  });
});

backDrop.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.close();
  }
});
/** on ajoute les elements works avec fetch */

addPicture.addEventListener("click", () => {
  modalTwo();
});
leftIcon.addEventListener("click", () => {
  modalOne();
});
/*** on supprime les elements */
