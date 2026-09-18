
export function createOfferCard(offer) {
 
  const techTagsHtml = offer.technologies.map(tech => {
    return `<span class="tech-tag">${tech}</span>`;
  }).join('');

 
  let badgeClass = 'badge-alternance';
  if (offer.typeContrat === 'Stage') {
    badgeClass = 'badge-stage';
  }


  return `
    <article class="offer-card" data-id="${offer.id}">
      <div class="offer-header">
        <div class="company-meta">
          <div class="company-logo-placeholder">IMG</div>
          <div>
            <h2 class="company-name">${offer.entreprise}</h2>
            <div class="location-text">📍 ${offer.ville}</div>
          </div>
        </div>
        <span class="badge ${badgeClass}">${offer.typeContrat}</span>
      </div>

      <div>
        <h3 class="offer-title">${offer.titre}</h3>
        <div class="offer-details-row" style="margin-top:0.4rem; margin-bottom:0.6rem;">
          <span>🕒 ${offer.datePublication}</span>
        </div>
        <p class="offer-desc">${offer.descriptionCourte}</p>
      </div>

      <div class="tech-tags-list">
        ${techTagsHtml}
      </div>

      <div class="offer-card-footer">
        <input type="checkbox" id="fav-${offer.id}" class="bookmark-checkbox">
        <label for="fav-${offer.id}" class="bookmark-btn" title="Mettre en favori">
          <svg style="width:18px;height:18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
        </label>
        <a href="offre-detail.html?id=${offer.id}" class="btn btn-primary btn-sm">
          Voir l'offre
        </a>
      </div>
    </article>
  `;
}


export function renderOffers(offers, container) {

  const counterElement = document.querySelector(".results-count strong");
  if (counterElement) {
    counterElement.textContent = offers.length;
  }

 
  if (offers.length === 0) {
    container.innerHTML = `<p style="text-align: center; padding: 2rem;">Aucune offre ne correspond à vos critères.</p>`;
    return;
  }

  
  const allCardsHtml = offers.map(offer => createOfferCard(offer)).join('');
  container.innerHTML = allCardsHtml;
}