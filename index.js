//curl 'https://geo.api.gouv.fr/communes?nom=Nantes&fields=departement&boost=population&limit=5'
document.addEventListener("submit", searchByCP);
document.addEventListener("submit", searchByVille);

// Function CP

function searchByCP(event) {
  event.preventDefault();
  const ValueCP = document.querySelector("#searchCP").value;
  console.log(ValueCP);
  const UrlCP = `https://geo.api.gouv.fr/communes?codePostal=${ValueCP}`;
  console.log(UrlCP);
  fetch(UrlCP)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const ville = data[0].nom;
    const code = data[0].codesPostaux;
    console.log(`Ville: ${ville}, code: ${code}`);
    document.querySelector("#codepostal").textContent = code;
    document.querySelector("#logo a").href = `https://www.google.fr/maps/place/${code}+${ville}`;
    document.querySelector("#ville").textContent = ville;
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
}

// Function Ville

function searchByVille(event) {
  event.preventDefault();
  const ValueVille = document.querySelector("#searchVille").value;
  console.log(ValueVille);
  const UrlVille = `https://geo.api.gouv.fr/communes?nom=${ValueVille}`;
  console.log(UrlVille);
  fetch(UrlVille)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const ville = data[0].nom;
    const code = data[0].codesPostaux;
    console.log(`Ville: ${ville}, code: ${code}`);
    document.querySelector("#codepostal").textContent = code;
    document.querySelector("#logo a").href = `https://www.google.fr/maps/place/${code}+${ville}`;
    document.querySelector("#ville").textContent = ville;
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
}

