export async function fetchOffers() {
  const response = await fetch("./data/offers.json");

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return response.json();
}
