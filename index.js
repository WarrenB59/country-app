// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// 3 - Passer les données à une variable

const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "";

const fetchData = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
  displayCountries();
};

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
const displayCountries = () => {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
        <div class="card">
            <img src="${country.flags.svg}"
            alt="Drapeau ${country.translations.fra.common}">
            <h2>${country.translations.fra.common}</h2>
            <h4>Capital : ${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()}</p>
        </div>
    `
    )
    .join("");
};

window.addEventListener("load", fetchData);

inputSearch.addEventListener("input", displayCountries);

inputRange.addEventListener("input", () => {
  displayCountries();
  rangeValue.textContent = inputRange.value;
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
// Au lieu de créer 3 événements, utiliser le forEach
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    displayCountries();
  });
});

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// country.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
