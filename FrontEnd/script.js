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
  function createGallery(results) {
    results.forEach((element) => {
      let figure = document.createElement("figure");
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
  createGallery(results);
}

showResult();
showFilters();

// on creer les boutons de filtrages des elements
async function showFilters() {
  let results = await getDataCategories();
  let btnFilterAll = document.createElement("button");
  filters.appendChild(btnFilterAll);
  btnFilterAll.innerText = "Tous";
  function createFilters(results) {
    results.forEach((element) => {
      let btnFilters = document.createElement("button");
      filters.appendChild(btnFilters);
      btnFilters.innerText = element.name;
    });
  }
  createFilters(results);
}
