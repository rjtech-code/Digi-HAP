export const parks = [
  {
    id: 1,
    name: "AGARSEN PARK",
    latitude: 28.281389,
    longitude: 74.965000,
  },
  {
    id: 2,
    name: "VAN VIHAR PARK",
    latitude: 28.297500,
    longitude: 74.956111,
  },
  {
    id: 3,
    name: "GANDHI NAGAR PARK",
    latitude: 28.298333,
    longitude: 74.974444,
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