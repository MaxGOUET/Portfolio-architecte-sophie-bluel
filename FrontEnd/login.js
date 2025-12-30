const form = document.querySelector(".form");
let errorDiv = document.querySelector(".error");
let errorMessage = document.createElement("p");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.innerText = "";
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(formData);

  if (!data.email || !data.password) {
    errorMessage.classList = "error-message";
    errorDiv.appendChild(errorMessage);
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
  } else {
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
          errorMessage.classList = "error-message";
          errorDiv.appendChild(errorMessage);
          errorMessage.innerText =
            "Erreur dans l’identifiant ou le mot de passe";
        }
      });
  }
});
