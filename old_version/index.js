//curl 'https://geo.api.gouv.fr/communes?nom=Nantes&fields=departement&boost=population&limit=5'
document.addEventListener("submit", searchCP);
document.addEventListener("submit", searchVille);


// CP
function searchCP(event){
  event.preventDefault();
  const cpInput = document.querySelector("#searchCP").value;
  const cpUrl = `https://geo.api.gouv.fr/communes?codePostal=${cpInput}`;
  fetch(cpUrl)
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      showData(data);
              // Récupération du nom de la première commune de la liste
              const nomCommune = data[0].nom;

              // Affichage du nom de la commune dans le champ #ville
              document.querySelector("#ville").value = nomCommune;
  })

  .catch((error) => {
    console.error(error);
    // document.querySelector("#ville").textContent = "Non";
    document.querySelector("#codepostal").textContent = "Non valide!";
});

}

// Ville
function searchVille(event){
  event.preventDefault();
  document.querySelector("#ville").innerHTML = ""; // vide le contenu précédent
  const cityInput = document.querySelector("#searchVille").value;
  const cityUrl = `https://geo.api.gouv.fr/communes?nom=${cityInput}`;
  fetch(cityUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showData(data);
    })
    .catch((error) => console.error(error));
   
}

function showData(data) {
  const communes = data.map(d => d.nom); // récupère les noms des communes
  const cp = data[0].codesPostaux[0]; // récupère le premier code postal renvoyé
  const select = document.createElement("select"); // crée un élément liste déroulante
  communes.forEach(commune => { // pour chaque commune
      const option = document.createElement("option"); // crée une option de liste déroulante
      option.textContent = commune; // ajoute le nom de la commune comme texte
      select.appendChild(option); // ajoute l'option à l'élément liste déroulante
  });
  document.querySelector("#codepostal").innerHTML = ""; // efface le contenu précédent
  // document.querySelector("#searchCP").value = "";
  document.querySelector("#codepostal").textContent = cp; // ajoute le code postal à l'élément résultat
  document.querySelector("#ville").appendChild(select); // ajoute l'élément liste déroulante à l'élément résultat
  // document.querySelector("#logo a").href = (url=`https://www.google.fr/maps/place/${cp}`);
  document.querySelector("#searchCP").value = ""; // vide le champ code postal
  document.querySelector("#searchVille").value = ""; // vide le champ ville
  select.addEventListener("change", (event) => {
    // const cpSelected = cp;
    const villeSelected = event.target.value;
    const url = `https://www.google.fr/maps/place/${villeSelected}`;
    document.querySelector("#logo a").href = url;
  });
}

