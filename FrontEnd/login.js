const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(formData);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token !== undefined) {
        localStorage.setItem("token", data.token);
        window.location = "index.html";
      } else {
        let errorDiv = document.querySelector(".error");
        let errorMessage = document.createElement("p");
        errorMessage.classList = "error-message";
        errorDiv.appendChild(errorMessage);
        errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
      }
    });
});
