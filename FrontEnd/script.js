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

async function showResult() {
  let results = await getDataWorks();
  createGallery(results);
  createGalleryModal(results);
}

function createGallery(results) {
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

// on creer les boutons de filtrages des elements
async function showFilters() {
  let resultsCat = await getDataCategories();
  let btnFilterAll = document.createElement("button");
  filters.appendChild(btnFilterAll);
  btnFilterAll.innerText = "Tous";
  btnFilterAll.id = "btnAll";
  btnFilterAll.addEventListener("click", () => {
    let elements = document.querySelectorAll(".gallery figure");
    elements.forEach((el) => {
      el.style.display = "block";
    });
  });
  createFilters(resultsCat);
}

function createFilters(resultsCat) {
  resultsCat.forEach((element) => {
    let btnFilters = document.createElement("button");
    filters.appendChild(btnFilters);
    btnFilters.innerText = element.name;
    btnFilters.id = `element_${element.id}`;
    btnFilters.addEventListener("click", (event) => {
      // document.querySelectorAll(".filters button").forEach((btn) => {
      //   btn.classList.remove("active-filter");
      // });
      // event.target.classList.add("active-filter");
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
    localStorage.clear("");
  });
}
