/**
 * Calculates ward-specific temperature based on base temperature and risk score
 * Uses deterministic random values based on ward ID to ensure consistency within a session
 */
export const calculateWardTemperature = (baseTemperature, riskScore, wardId) => {
  // Use wardId as seed for deterministic random values
  const seed = wardId * 9301 + 49297;
  const random = (min, max) => {
    const normalized = (seed % 233280) / 233280;
    return min + normalized * (max - min);
  };

  let adjustment = 0;

  switch (riskScore) {
    case 5:
      // Very High: Base + Random(1.0°C to 2.0°C)
      adjustment = random(1.0, 2.0);
      break;
    case 4:
      // High: Base + Random(0.5°C to 1.0°C)
      adjustment = random(0.5, 1.0);
      break;
    case 3:
      // Moderate: No adjustment
      adjustment = 0;
      break;
    case 2:
      // Low: Base - Random(0.5°C to 1.0°C)
      adjustment = -random(0.5, 1.0);
      break;
    case 1:
      // Very Low: Base - Random(1.0°C to 2.0°C)
      adjustment = -random(1.0, 2.0);
      break;
    default:
      adjustment = 0;
  }

  return Math.round((baseTemperature + adjustment) * 10) / 10;
};

/**
 * Returns temperature color based on temperature value
 */
export const getTemperatureColor = (temperature) => {
  if (temperature < 40) {
    return {
      bg: 'bg-[#16A34A]', // Dark Green
      text: 'text-white'
    };
  } else if (temperature < 42) {
    return {
      bg: 'bg-[#22C55E]', // Light Green
      text: 'text-white'
    };
  } else if (temperature < 44) {
    return {
      bg: 'bg-[#EAB308]', // Yellow
      text: 'text-black' // Black text for contrast on yellow
    };
  } else if (temperature < 46) {
    return {
      bg: 'bg-[#F97316]', // Orange
      text: 'text-white'
    };
  } else if (temperature < 48) {
    return {
      bg: 'bg-[#EF4444]', // Red
      text: 'text-white'
    };
  } else {
    return {
      bg: 'bg-[#B91C1C]', // Dark Red
      text: 'text-white'
    };
  }
};