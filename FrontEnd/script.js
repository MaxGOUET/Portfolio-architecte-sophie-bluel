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
  createGallery(results);
}

showResult();
showFilters().then(() => {
  galleryFiltered();
});

// on creer les boutons de filtrages des elements
async function showFilters() {
  let resultsCat = await getDataCategories();
  let btnFilterAll = document.createElement("button");
  filters.appendChild(btnFilterAll);
  btnFilterAll.innerText = "Tous";
  btnFilterAll.id = "btnAll";
  function createFilters(resultsCat) {
    resultsCat.forEach((element) => {
      let btnFilters = document.createElement("button");
      filters.appendChild(btnFilters);
      btnFilters.innerText = element.name;
      btnFilters.id = `element_${element.id}`;
    });
  }
  createFilters(resultsCat);
}

/* On recupere les boutons precedement créer et on set up l'affichage des elements en fonction des filtres selectionés*/
function galleryFiltered() {
  let elements = document.querySelectorAll(".gallery figure");
  let btnFilterAll = document.querySelector("#btnAll");
  let btnObjects = document.querySelector("#element_1");
  let btnFlats = document.querySelector("#element_2");
  let btnHotels = document.querySelector("#element_3");
  btnFilterAll.addEventListener("click", () => {
    elements.forEach((element) => {
      element.style.display = "block";
    });
  });

  btnObjects.addEventListener("click", () => {
    elements.forEach((element) => {
      if (element.dataset.categoryId != 1) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });
  });

  btnFlats.addEventListener("click", () => {
    elements.forEach((element) => {
      if (element.dataset.categoryId != 2) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });
  });

  btnHotels.addEventListener("click", () => {
    elements.forEach((element) => {
      if (element.dataset.categoryId != 3) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });
  });
}
