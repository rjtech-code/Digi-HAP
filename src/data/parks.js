export const parks = [
  {
    id: 1,
    name: "Nature Park",
    latitude: 28.2929456,
    longitude: 74.9597594,
    description: "Bhartiya Rd, Naya Bass, Churu, Rajasthan 331001. Largest public park in Churu - open gym, watch tower, open theatre, pond, girls' library.",
  },
  {
    id: 2,
    name: "Children's Garden (Nature Park Complex)",
    latitude: 28.2937273,
    longitude: 74.9596497,
    description: "Bhartiya Rd, Naya Bass, Churu, Rajasthan 331001. Children's play area within the Nature Park complex.",
  },
  {
    id: 3,
    name: "Indramani Park",
    latitude: 28.2923073,
    longitude: 74.9712111,
    description: "Gandhi Nagar, Churu, Rajasthan 331001. Central park with gym and jhula.",
  },
  {
    id: 4,
    name: "Agrasen Nagar Park",
    latitude: 28.2793830,
    longitude: 74.9642149,
    description: "Agrasen Nagar, Churu, Rajasthan 331001. Colony park, recently upgraded.",
  },
  {
    id: 5,
    name: "Gandhi Park",
    latitude: 28.2947137,
    longitude: 74.9774731,
    description: "Gandhi Nagar, Churu, Rajasthan 331001. Dense tree cover, popular for morning/evening walks.",
  },
  {
    id: 6,
    name: "Oswal Garden",
    latitude: 28.3040058,
    longitude: 74.9733143,
    description: "Agunaa Mohalla, Churu, Rajasthan 331001. Note: privately managed garden, limited public access.",
  },
  {
    id: 7,
    name: "Van Vihar Park",
    latitude: 28.2973974,
    longitude: 74.9558715,
    description: "Van Vihar Colony, Churu, Rajasthan 331001",
  },
  {
    id: 8,
    name: "Teja Ji Park",
    latitude: 28.3054983,
    longitude: 74.9393394,
    description: "Housing Board Colony, Churu, Rajasthan 331001",
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