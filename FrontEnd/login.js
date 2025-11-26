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
      localStorage.setItem("token", data.token);
      window.location = "index.html";
    })
    .catch((error) => console.log(error));
});
