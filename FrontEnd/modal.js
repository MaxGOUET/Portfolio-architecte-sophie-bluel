/****on recupére les element de la modale et on ajoute les listeners */

const dialog = document.querySelector("dialog");
const showModify = document.querySelector(".modify");
const closeModal = document.querySelector(".fa-xmark");
const backDrop = document.querySelector("dialog");

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
let pictureRemove = document.querySelector(".picture-remove");
function createGalleryModal(results) {
  results.forEach((element) => {
    let figure = document.createElement("figure");
    figure.dataset.categoryId = element.categoryId;
    pictureRemove.appendChild(figure);
    let imgGallery = document.createElement("img");
    figure.appendChild(imgGallery);
    imgGallery.src = element.imageUrl;
    imgGallery.alt = element.title;
    let removeIcon = document.createElement("i");
    figure.appendChild(removeIcon);
    removeIcon.className = "fa-solid fa-trash-can";
  });
}
/** ajout de l'eventlistener sur l'icone */
function removeImg() {}
removeIcon.addEventListener("click", () => {});
