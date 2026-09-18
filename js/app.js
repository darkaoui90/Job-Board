import { fetchOffers } from "./data.js";
import { renderOffers } from "./render.js";

let allOffers = [];
let sortOrder = "newest";

const offersContainer = document.querySelector(".offers-grid");
const filterForm = document.querySelector(".filter-card form");
const searchInput = document.querySelector(".search-input");
const locationSelect = document.querySelector('select[name="location"]');
const technologySelect = document.querySelector('select[name="technology"]');
const sortButtons = document.querySelectorAll(".sort-opt");

function showFilteredOffers() {
  const searchText = searchInput.value.trim().toLowerCase();
  const contract = document.querySelector('input[name="contract-filter"]:checked').value;
  const location = locationSelect.value;
  const technology = technologySelect.value;

  const filteredOffers = allOffers.filter(offer => {
    const searchableText = [
      offer.titre,
      offer.entreprise,
      offer.ville,
      offer.descriptionCourte,
      ...offer.technologies
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchText);
    const matchesContract = contract === "all" || offer.typeContrat === contract;
    const matchesLocation = location === "all" || offer.ville === location;
    const matchesTechnology = technology === "all" || offer.technologies.includes(technology);

    return matchesSearch && matchesContract && matchesLocation && matchesTechnology;
  });

  filteredOffers.sort((firstOffer, secondOffer) => {
    const firstDate = new Date(firstOffer.datePublication);
    const secondDate = new Date(secondOffer.datePublication);

    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });

  renderOffers(filteredOffers, offersContainer);
}

function updateContractCounts() {
  const stageCount = allOffers.filter(offer => offer.typeContrat === "Stage").length;
  const alternanceCount = allOffers.filter(offer => offer.typeContrat === "Alternance").length;

  document.querySelector('label[for="c-all"]').textContent = `Tous (${allOffers.length})`;
  document.querySelector('label[for="c-stage"]').textContent = `Stage (${stageCount})`;
  document.querySelector('label[for="c-alternance"]').textContent = `Alternance (${alternanceCount})`;
}

filterForm.addEventListener("input", showFilteredOffers);
filterForm.addEventListener("submit", event => {
  event.preventDefault();
  showFilteredOffers();
});
filterForm.addEventListener("reset", () => {
  setTimeout(showFilteredOffers, 0);
});

sortButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    sortOrder = index === 0 ? "newest" : "oldest";

    sortButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    showFilteredOffers();
  });
});

async function loadOffers() {
  try {
    offersContainer.innerHTML = `<p class="loading-state">Chargement des offres en cours...</p>`;

    allOffers = await fetchOffers();
    updateContractCounts();
    showFilteredOffers();
  } catch (error) {
    offersContainer.innerHTML = `
      <div class="error-state" style="color: var(--danger-text); padding: 1rem;">
        <p>Impossible de charger les offres pour le moment. Veuillez réessayer plus tard.</p>
      </div>
    `;
    console.error("Erreur d'initialisation :", error);
  }
}

loadOffers();
