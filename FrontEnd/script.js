// on recupere les données de l'API

async function getDataWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
async function getDataCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

// On récupére les élements du DOM et on affiche le resultats du retour de l'API pour image et titre.

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

function showResult() {
  createGallery();
  createGalleryModal();
  getCategoriesList();
}
/**affichage de la gallerie */
async function createGallery() {
  gallery.innerHTML = "";
  let results = await getDataWorks();
  results.forEach((element) => {
    let figure = document.createElement("figure");
    figure.dataset.categoryId = element.categoryId;
    gallery.appendChild(figure);
    let imgGallery = document.createElement("img");
    figure.appendChild(imgGallery);
    imgGallery.src = element.imageUrl;
    imgGallery.alt = element.title;
    let figCaption = document.createElement("figcaption");
    figure.appendChild(figCaption);
    figCaption.innerText = element.title;
  });
}
/**modale */
let galleryModify = document.querySelector(".picture-remove");
async function createGalleryModal() {
  galleryModify.innerHTML = "";
  let results = await getDataWorks();
  results.forEach((element) => {
    let figure = document.createElement("figure");
    figure.dataset.workId = element.id;
    galleryModify.appendChild(figure);
    let imgGallery = document.createElement("img");
    figure.appendChild(imgGallery);
    imgGallery.src = element.imageUrl;
    imgGallery.alt = element.title;
    let removeIcon = document.createElement("i");
    figure.appendChild(removeIcon);
    removeIcon.className = "fa-solid fa-trash-can";
  });
  removePicture();
}

function removePicture() {
  const trashCan = document.querySelectorAll(".picture-remove i");
  trashCan.forEach((el) => {
    el.addEventListener("click", (event) => {
      let iPicture = event.target.parentNode.dataset.workId;
      fetch(`http://localhost:5678/api/works/${iPicture}`, {
        method: "DELETE",
        headers: { accept: "*/*", Authorization: `Bearer ${token}` },
      }).then((response) => {
        response.json();
        if (response.status == 204) {
          showResult();
        } else {
          console.log(response);
        }
      });
    });
  });
}

// on creer les boutons de filtrages des elements
async function showFilters() {
  let resultsCat = await getDataCategories();

  createFilters(resultsCat);
}

function createFilters(resultsCat) {
  let btnFilterAll = document.createElement("button");
  filters.appendChild(btnFilterAll);
  btnFilterAll.innerText = "Tous";
  btnFilterAll.id = "btnAll";
  btnFilterAll.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.classList.remove("active-filter");
    });
    btnFilterAll.classList.toggle("active-filter");
    let elements = document.querySelectorAll(".gallery figure");
    elements.forEach((el) => {
      el.style.display = "block";
    });
  });
  resultsCat.forEach((element) => {
    let btnFilters = document.createElement("button");
    filters.appendChild(btnFilters);
    btnFilters.innerText = element.name;
    btnFilters.id = `element_${element.id}`;
    btnFilters.addEventListener("click", (event) => {
      document.querySelectorAll(".filters button").forEach((btn) => {
        btn.classList.remove("active-filter");
      });
      event.target.classList.toggle("active-filter");
      let elements = document.querySelectorAll(".gallery figure");
      elements.forEach((el) => {
        if (el.dataset.categoryId != element.id) {
          el.style.display = "none";
        } else {
          el.style.display = "block";
        }
      });
    });
  });
}

// On verifie si le token est present dans le local storage et on affiches les elements si oui

let token = localStorage.getItem("token");

if (token === null) {
  showResult();
  showFilters();
} else {
  showResult();
  log();
}
function log() {
  let logout = document.getElementById("logout");
  let login = document.getElementById("login");
  let modify = document.querySelector(".modify");
  let edition = document.querySelector(".edition");
  logout.style.display = "block";
  login.style.display = "none";
  modify.style.display = "flex";
  edition.style.display = "flex";
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
  });
}
/** on recupére les catégories pour les afficher dans la liste déroulante */

async function getCategoriesList() {
  const categoriesSelect = document.getElementById("categories");
  let resultsCat = await getDataCategories();
  resultsCat.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.id;
    option.innerText = element.name;
    categoriesSelect.appendChild(option);
  });
  categoriesSelect.value = "";
}

/** on previsualise l'image uploadée */

document.querySelector(".drop-zone").addEventListener("change", previewImage);

function previewImage(e) {
  const imageUploaded = e.target;
  const imgPreview = document.getElementById("img-uploaded");
  if (imageUploaded.files && imageUploaded.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgPreview.src = e.target.result;
    };
    reader.readAsDataURL(imageUploaded.files[0]);
    let clearZone = document.getElementById("input-img");
    clearZone.style.display = "none";
  }
}

/** on envoi les données du formulaire à l'API */
const formUploadImg = document.getElementById("upload");
const imgPreview = document.getElementById("img-uploaded");
const imageUploadInput = document.getElementById("image-upload");
const titleInput = document.getElementById("title");
const categoriesSelect = document.getElementById("categories");

formUploadImg.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitForm();
});

const errorMessage = document.querySelector(".error-message");
async function submitForm() {
  const imageFile = imageUploadInput.files[0];
  const title = titleInput.value;
  const categoryId = categoriesSelect.value;
  /** Vérifier que tous les champs sont remplis */
  if (!imageFile || !title || !categoryId) {
    errorMessage.innerText = "Veuillez remplir tous les champs.";
    return;
  }
  // Créer un FormData pour envoyer l'image et les données
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", title);
  formData.append("category", categoryId);
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    clearForm();
    // Actualiser la galerie
    showResult();
    // Fermer la modale
    const dialog = document.querySelector("dialog");
    dialog.close();
  } catch (error) {
    console.error(error.message);
    errorMessage.innerText = "Erreur lors de l'ajout du projet.";
  }
}
// Réinitialiser le formulaire
function clearForm() {
  formUploadImg.reset();
  imgPreview.src = "";
  document.getElementById("input-img").style.display = "block";
  errorMessage.innerText = "";
}
