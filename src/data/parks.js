export const parks = [
  {
    id: 1,
    name: "Nature Park",
    latitude: 28.2929456,
    longitude: 74.9597594,
  },
  {
    id: 2,
    name: "Children's Garden (Nature Park Complex)",
    latitude: 28.2937273,
    longitude: 74.9596497,
  },
  {
    id: 3,
    name: "Indramani Park",
    latitude: 28.2923073,
    longitude: 74.9712111,
  },
  {
    id: 4,
    name: "Agrasen Nagar Park",
    latitude: 28.2793830,
    longitude: 74.9642149,
  },
  {
    id: 5,
    name: "Gandhi Park",
    latitude: 28.2947137,
    longitude: 74.9774731,
  },
  {
    id: 6,
    name: "Oswal Garden",
    latitude: 28.3040058,
    longitude: 74.9733143,
  },
  {
    id: 7,
    name: "Van Vihar Park",
    latitude: 28.2973974,
    longitude: 74.9558715,
  },
  {
    id: 8,
    name: "Teja Ji Park",
    latitude: 28.3054983,
    longitude: 74.9393394,
  },
];

// Haversine formula to calculate distance between two coordinates (in km)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};