const favoriteKey = 'followedOffers';

function getFavoriteIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(favoriteKey)) || [];
    return Array.isArray(ids) ? ids.map(Number) : [];
  } catch (error) {
    return [];
  }
}

function saveFavoriteIds(ids) {
  localStorage.setItem(favoriteKey, JSON.stringify(ids));
}

function refreshPage() {
  const ids = getFavoriteIds();

  document.querySelectorAll('[data-followed-count]').forEach(function (element) {
    element.textContent = ids.length;
  });

  document.querySelectorAll('[data-favorite-id]').forEach(function (button) {
    const id = Number(button.dataset.favoriteId);
    const isFavorite = ids.includes(id);
    button.classList.toggle('is-favorite', isFavorite);
    button.setAttribute('aria-pressed', isFavorite);
    button.textContent = isFavorite ? ' Suivie' : '? Suivre';
  });

  const followedList = document.querySelector('[data-followed-list]');
  if (followedList) {
    let visibleCount = 0;
    followedList.querySelectorAll('[data-offer-id]').forEach(function (card) {
      const isVisible = ids.includes(Number(card.dataset.offerId));
      card.hidden = !isVisible;
      if (isVisible) visibleCount++;
    });
    const emptyMessage = document.querySelector('[data-followed-empty]');
    emptyMessage.hidden = visibleCount > 0;
  }
}

document.addEventListener('click', function (event) {
  const favoriteButton = event.target.closest('[data-favorite-id]');
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favoriteId);
    let ids = getFavoriteIds();
    if (ids.includes(id)) {
      ids = ids.filter(function (favoriteId) { return favoriteId !== id; });
    } else {
      ids.push(id);
    }
    saveFavoriteIds(ids);
    refreshPage();
  }

  if (event.target.closest('[data-clear-favorites]')) {
    localStorage.removeItem(favoriteKey);
    refreshPage();
  }
});

refreshPage();
