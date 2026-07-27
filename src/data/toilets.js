export const toilets = [
  {
    id: 1,
    name: "Public Toilet - Subash Chowk",
    latitude: 28.3017966,
    longitude: 74.9509577,
  },
  {
    id: 2,
    name: "Public Toilet - Agrasen Nagar Fatak, Civil Lines",
    latitude: 28.289613,
    longitude: 74.9581453,
  },
  {
    id: 3,
    name: "SBM Toilet - Railway Station, Naya Bass",
    latitude: 28.2892277,
    longitude: 74.9665979,
  },
  {
    id: 4,
    name: "SBM Toilet - Nai Sarak (Near Krishna Hotel)",
    latitude: 28.2915237,
    longitude: 74.9655804,
  },
  {
    id: 5,
    name: "SBM Toilet - Station Road (Opp. PWD Office)",
    latitude: 28.2871433,
    longitude: 74.9630411,
  },
  {
    id: 6,
    name: "SBM Toilet - Collectory Circle, Civil Lines",
    latitude: 28.2853082,
    longitude: 74.9612309,
  },
  {
    id: 7,
    name: "Sulabh Shochalaya Complex, Naya Bass",
    latitude: 28.2909649,
    longitude: 74.9590443,
  },
  {
    id: 8,
    name: "SBM Toilet - Near Narmada Park, Civil Lines",
    latitude: 28.2825612,
    longitude: 74.9604065,
  },
  {
    id: 9,
    name: "SBM Toilet - Agrasen Nagar Phatak",
    latitude: 28.2921318,
    longitude: 74.9601709,
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