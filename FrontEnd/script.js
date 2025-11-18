async function getData() {
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

const gallery = document.querySelector(".gallery");

async function showResult() {
  let results = await getData();
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
