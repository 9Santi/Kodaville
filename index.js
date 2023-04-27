//curl 'https://geo.api.gouv.fr/communes?nom=Nantes&fields=departement&boost=population&limit=5'
document.addEventListener("submit", searchCP);



// CP
function searchCP(event){
  event.preventDefault();
  document.querySelector("#ville").value = "";
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
    document.querySelector("#codepostal").textContent = "Non valide!";
});
}
const select = document.createElement("select");

function showData(data) {
  while (select.hasChildNodes()) {
    select.removeChild(select.lastChild);
  }
  const communes = data.map(d => d.nom);
  const cp = data[0].codesPostaux[0];
  document.querySelector("#codepostal").textContent = cp;
  
  // Effacer le contenu précédent du champ ville
  document.querySelector("#ville").innerHTML = "";

  communes.forEach(commune => {
      const option = document.createElement("option");
      option.textContent = commune;
      select.appendChild(option);
  });
  
  document.querySelector("#ville").appendChild(select);
  document.querySelector("#searchCP").value = "";
}


