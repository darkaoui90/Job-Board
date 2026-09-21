const storageKey = "followedOffers";

// Read the saved offer IDs. The empty array is used the first time the visitor has no saved offers.
export function getFollowedOfferIds() {
  const savedOffers = localStorage.getItem(storageKey);

  if (!savedOffers) {
    return [];
  }

  try {
    const followedOfferIds = JSON.parse(savedOffers);

    return Array.isArray(followedOfferIds) ? followedOfferIds : [];
  } catch (error) {
    console.error("Impossible de lire les offres suivies :", error);
    return [];
  }
}

function saveFollowedOfferIds(followedOfferIds) {
  localStorage.setItem(storageKey, JSON.stringify(followedOfferIds));
}

export function isOfferFollowed(offerId) {
  const followedOfferIds = getFollowedOfferIds();

  return followedOfferIds.includes(offerId);
}

export function toggleFollowedOffer(offerId) {
  const followedOfferIds = getFollowedOfferIds();
  const offerIsFollowed = followedOfferIds.includes(offerId);

  const updatedOfferIds = offerIsFollowed
    ? followedOfferIds.filter(id => id !== offerId)
    : [...followedOfferIds, offerId];

  saveFollowedOfferIds(updatedOfferIds);

  return updatedOfferIds;
}

export function removeFollowedOffer(offerId) {
  const followedOfferIds = getFollowedOfferIds();
  const updatedOfferIds = followedOfferIds.filter(id => id !== offerId);

  saveFollowedOfferIds(updatedOfferIds);

  return updatedOfferIds;
}

export function clearFollowedOffers() {
  localStorage.removeItem(storageKey);
}
