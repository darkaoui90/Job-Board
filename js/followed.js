import { fetchOffers } from "./data.js";
import { renderOffers } from "./render.js";
import { clearFollowedOffers, getFollowedOfferIds, removeFollowedOffer } from "./storage.js";

let allOffers = [];
let sortOrder = "newest";

const offersContainer = document.querySelector(".tracked-list");
const countElements = document.querySelectorAll("[data-followed-count]");
const clearButton = document.querySelector(".clear-followed-button");
const sortSelect = document.querySelector('select[name="status"]');

function updateFollowedCount() {
  const followedCount = getFollowedOfferIds().length;

  countElements.forEach(element => {
    element.textContent = followedCount;
  });
}

function getFollowedOffers() {
  const followedOfferIds = getFollowedOfferIds();

  return allOffers.filter(offer => followedOfferIds.includes(offer.id));
}

function showFollowedOffers() {
  const followedOffers = getFollowedOffers();

  followedOffers.sort((firstOffer, secondOffer) => {
    const firstDate = new Date(firstOffer.datePublication);
    const secondDate = new Date(secondOffer.datePublication);

    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });

  updateFollowedCount();

  if (followedOffers.length === 0) {
    offersContainer.innerHTML = `<p class="empty-state">Aucune offre suivie pour le moment. Retournez aux offres pour en enregistrer une.</p>`;
    return;
  }

  renderOffers(followedOffers, offersContainer);
}

offersContainer.addEventListener("change", event => {
  if (!event.target.matches(".bookmark-checkbox")) {
    return;
  }

  const offerCard = event.target.closest(".offer-card");
  const offerId = Number(offerCard.dataset.id);

  removeFollowedOffer(offerId);
  showFollowedOffers();
});

clearButton.addEventListener("click", () => {
  clearFollowedOffers();
  showFollowedOffers();
});

sortSelect.addEventListener("change", event => {
  sortOrder = event.target.value;
  showFollowedOffers();
});

async function loadOffers() {
  try {
    offersContainer.innerHTML = `<p class="loading-state">Chargement des offres suivies...</p>`;

    allOffers = await fetchOffers();
    showFollowedOffers();
  } catch (error) {
    offersContainer.innerHTML = `<p class="error-state">Impossible de charger les offres suivies pour le moment.</p>`;
    console.error("Erreur de chargement des offres suivies :", error);
  }
}

loadOffers();
