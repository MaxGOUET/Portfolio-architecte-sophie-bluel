/****on recupére les element de la modale et on ajoute les listeners */

const dialog = document.querySelector("dialog");
const showModify = document.querySelector(".modify");
const closeModal = document.querySelector(".fa-xmark");
const backDrop = document.querySelector("dialog");
const addPicture = document.querySelector(".modal-footer button");
const leftIcon = document.querySelector(".fa-arrow-left");
const modalHeader = document.querySelector(".modal-header");
const modalMain = document.querySelector(".modal-main");
const modalMain2 = document.querySelector(".modal-main2");

function modalOne() {
  modalHeader.style.justifyContent = "flex-end";
  leftIcon.style.display = "none";
  modalMain.style.display = "block";
  modalMain2.style.display = "none";
}

function modalTwo() {
  modalHeader.style.justifyContent = "space-between";
  leftIcon.style.display = "block";
  modalMain.style.display = "none";
  modalMain2.style.display = "block";
}

showModify.addEventListener("click", () => {
  dialog.showModal();
});

closeModal.addEventListener("click", () => {
  dialog.close();
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
