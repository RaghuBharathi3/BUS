// List of standard bus operators in India
const operators = [
  { name: 'Safar Luxe Class', rating: 4.8, reviewsCount: 342, logoColor: 'var(--brand-primary)' },
  { name: 'Parveen Travels', rating: 4.5, reviewsCount: 890, logoColor: '#2b5797' },
  { name: 'VRL Travels', rating: 4.2, reviewsCount: 1540, logoColor: '#e0a800' },
  { name: 'Orange Tours & Travels', rating: 4.6, reviewsCount: 654, logoColor: '#ff8c00' },
  { name: 'SRS Travels', rating: 3.9, reviewsCount: 1120, logoColor: '#1d8649' },
  { name: 'National Travels', rating: 4.1, reviewsCount: 421, logoColor: '#800080' },
  { name: 'Paulo Travels', rating: 4.0, reviewsCount: 310, logoColor: '#e81123' }
];

const amenitiesList = [
  'Wi-Fi', 'USB Charging Port', 'Water Bottle', 'Blanket', 
  'Pillow', 'Reading Light', 'Emergency Contact', 'CCTV'
];

// Helper to generate boarding & dropping points based on city names
const getBoardingPoints = (city, baseTime) => {
  const [hours, minutes] = baseTime.split(':').map(Number);
  const addMinutes = (mins) => {
    let h = hours + Math.floor((minutes + mins) / 60);
    let m = (minutes + mins) % 60;
    h = h % 24;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };

  if (city === 'Chennai') {
    return [
      { id: 'bp1', name: 'Koyambedu Omni Terminus', time: addMinutes(0), details: 'Near Metro Station' },
      { id: 'bp2', name: 'Guindy (Ega Theatre)', time: addMinutes(20), details: 'Opposite Railway Station' },
      { id: 'bp3', name: 'Tambaram (MCC Bus Stop)', time: addMinutes(45), details: 'Near MCC College Flyover' }
    ];
  }
  if (city === 'Bengaluru') {
    return [
      { id: 'bp1', name: 'Majestic (Safar Lounge)', time: addMinutes(0), details: 'Platform 5, KSRTC Bus Stand' },
      { id: 'bp2', name: 'Madiwala (Near Petrol Bunk)', time: addMinutes(30), details: 'Next to St. John Hospital' },
      { id: 'bp3', name: 'Electronic City (Toll Gate)', time: addMinutes(50), details: 'Elevated Expressway Down Ramp' }
    ];
  }
  if (city === 'Pune') {
    return [
      { id: 'bp1', name: 'Swargate (Safar Office)', time: addMinutes(0), details: 'Near Jagtap Nursery' },
      { id: 'bp2', name: 'Wakad (Ginger Hotel)', time: addMinutes(25), details: 'Wakad Bridge Highway Junction' },
      { id: 'bp3', name: 'Hinjewadi Phase 1', time: addMinutes(40), details: 'Near Shivaji Chowk' }
    ];
  }
  if (city === 'Mumbai') {
    return [
      { id: 'bp1', name: 'Borivali West (Devidas Lane)', time: addMinutes(0), details: 'Safar Travels office' },
      { id: 'bp2', name: 'Sion Circle', time: addMinutes(45), details: 'Near Sion Railway Station' },
      { id: 'bp3', name: 'Vashi (Near Plaza Hotel)', time: addMinutes(75), details: 'Below Vashi Flyover' }
    ];
  }
  // Generic fallback points
  return [
    { id: 'bp1', name: `${city} Central Bus Stand`, time: addMinutes(0), details: 'Main Terminus' },
    { id: 'bp2', name: `${city} Bypass Highway`, time: addMinutes(25), details: 'Near Flyover Junction' }
  ];
};

const getDroppingPoints = (city, arrivalTime) => {
  const [hours, minutes] = arrivalTime.split(':').map(Number);
  const addMinutes = (mins) => {
    let h = hours + Math.floor((minutes + mins) / 60);
    let m = (minutes + mins) % 60;
    h = h % 24;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };

  if (city === 'Bengaluru') {
    return [
      { id: 'dp1', name: 'Electronic City Toll Plaza', time: addMinutes(-40), details: 'Expressway Drop' },
      { id: 'dp2', name: 'Silk Board Junction', time: addMinutes(-20), details: 'Near flyover start' },
      { id: 'dp3', name: 'Majestic (KSRTC Terminal)', time: addMinutes(0), details: 'Platform 1' }
    ];
  }
  if (city === 'Chennai') {
    return [
      { id: 'dp1', name: 'Tambaram Bypass', time: addMinutes(-35), details: 'Highway Drop' },
      { id: 'dp2', name: 'Guindy Kathipara Junction', time: addMinutes(-15), details: 'Below Flyover' },
      { id: 'dp3', name: 'Koyambedu Omni Terminus', time: addMinutes(0), details: 'Platform 12' }
    ];
  }
  if (city === 'Mumbai') {
    return [
      { id: 'dp1', name: 'Vashi (Highway)', time: addMinutes(-45), details: 'Near Toll Plaza' },
      { id: 'dp2', name: 'Sion Circle', time: addMinutes(-20), details: 'Near Sion Station' },
      { id: 'dp3', name: 'Borivali East', time: addMinutes(0), details: 'National Park Gate' }
    ];
  }
  if (city === 'Pune') {
    return [
      { id: 'dp1', name: 'Hinjewadi (Wakad Bridge)', time: addMinutes(-30), details: 'Highway Bypass' },
      { id: 'dp2', name: 'Swargate Terminal', time: addMinutes(0), details: 'Safar Lounge Swargate' }
    ];
  }
  return [
    { id: 'dp1', name: `${city} Bypass Plaza`, time: addMinutes(-20), details: 'Bypass exit' },
    { id: 'dp2', name: `${city} Central Plaza`, time: addMinutes(0), details: 'City Center' }
  ];
};

// Generates a mock seat matrix
// Sleeper bus: Lower & Upper deck, 30 seats total
// Seater bus: Single deck, 40 seats total
const generateSeatMatrix = (isSleeper, busId) => {
  const seats = [];

  // Use busId hash to pre-book a random set of seats so it looks realistic
  const hash = String(busId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (isSleeper) {
    // 15 seats Lower (L1 - L15), 15 seats Upper (U1 - U15)
    // Layout: 1 seat on left (berth Window), 2 seats on right (berth Middle/Window)
    for (let i = 1; i <= 15; i++) {
      // Lower Deck
      const lowerRow = Math.ceil(i / 3);
      const lowerCol = i % 3 === 1 ? 'Left' : 'Right';
      const isWindow = i % 3 !== 2;
      const lowerSeatNo = `L${i}`;
      // Use primes coprime to the modulus so bookings scatter across columns
      const isLReserved = (hash + i * 11) % 6 === 0;
      const isLadies = isLReserved ? false : (hash + i * 17) % 13 === 0;

      seats.push({
        seatNo: lowerSeatNo,
        deck: 'Lower',
        type: 'Sleeper',
        row: lowerRow,
        column: lowerCol,
        isWindow,
        isBooked: isLReserved,
        isLadies,
        priceMultiplier: i <= 3 ? 1.1 : 1.0 // Premium front seats
      });

      // Upper Deck
      const upperSeatNo = `U${i}`;
      const isUReserved = (hash + i * 13) % 7 === 0;
      const isULadies = isUReserved ? false : (hash + i * 19) % 11 === 0;

      seats.push({
        seatNo: upperSeatNo,
        deck: 'Upper',
        type: 'Sleeper',
        row: lowerRow,
        column: lowerCol,
        isWindow,
        isBooked: isUReserved,
        isLadies: isULadies,
        priceMultiplier: i <= 3 ? 1.05 : 0.95 // Upper deck slightly cheaper, premium front
      });
    }
  } else {
    // Seater: 2+2 layout, 40 seats
    // Rows 1 to 10
    for (let i = 1; i <= 40; i++) {
      const row = Math.ceil(i / 4);
      const side = i % 4 <= 2 && i % 4 > 0 ? 'Left' : 'Right';
      const isWindow = i % 4 === 1 || i % 4 === 0;
      const seatNo = `${row}${String.fromCharCode(65 + ((i - 1) % 4))}`;
      const isReserved = (hash + i * 7) % 5 === 0;
      const isLadies = isReserved ? false : (hash + i * 13) % 12 === 0;

      seats.push({
        seatNo,
        deck: 'Lower',
        type: 'Seater',
        row,
        column: side,
        isWindow,
        isBooked: isReserved,
        isLadies,
        priceMultiplier: row <= 2 ? 1.1 : (row >= 9 ? 0.9 : 1.0)
      });
    }
  }
  return seats;
};

// Main generator function
export const getBusesForRoute = (fromCity, toCity, dateString) => {
  if (!fromCity || !toCity) return [];

  // Generate a deterministic seed based on route and date to keep it consistent on page refresh
  const seedString = `${fromCity}-${toCity}-${dateString}`;
  const seed = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Decide route parameters
  // Approximate duration and base price based on city names
  let baseDurationMinutes = 360; // 6 hours
  let basePrice = 800;
  
  // Calculate relative distances / price overrides
  const key = `${fromCity}-${toCity}`;
  if (key.includes('Mumbai') && key.includes('Pune')) {
    baseDurationMinutes = 200; // 3.3h
    basePrice = 450;
  } else if (key.includes('Chennai') && key.includes('Bengaluru')) {
    baseDurationMinutes = 390; // 6.5h
    basePrice = 750;
  } else if (key.includes('Hyderabad') && key.includes('Bengaluru')) {
    baseDurationMinutes = 540; // 9h
    basePrice = 1100;
  } else if (key.includes('Goa')) {
    baseDurationMinutes = 660; // 11h
    basePrice = 1300;
  } else if (key.includes('Madurai') || key.includes('Coimbatore')) {
    baseDurationMinutes = 480; // 8h
    basePrice = 850;
  } else if (key.includes('Kochi') || key.includes('Trivandrum')) {
    baseDurationMinutes = 500;
    basePrice = 900;
  }

  const generatedBuses = [];
  const numBuses = 5 + (seed % 4); // 5 to 8 buses per route

  for (let i = 0; i < numBuses; i++) {
    const opIndex = (seed + i) % operators.length;
    const operator = operators[opIndex];
    
    // Deterministic departure times throughout the day
    const departureHours = [6, 8, 14, 20, 21, 22, 23][(seed + i * 3) % 7];
    const departureMinutes = [0, 15, 30, 45][(seed + i * 2) % 4];
    const depTimeStr = `${String(departureHours).padStart(2, '0')}:${String(departureMinutes).padStart(2, '0')}`;
    
    // Add variations to duration and price
    const durationVar = ((seed + i * 4) % 45) - 20; // -20 to +25 mins
    const finalDurationMinutes = baseDurationMinutes + durationVar;
    const hours = Math.floor(finalDurationMinutes / 60);
    const mins = finalDurationMinutes % 60;
    const durationStr = `${hours}h ${mins}m`;

    // Calculate arrival time
    let arrHours = (departureHours + hours + Math.floor((departureMinutes + mins) / 60)) % 24;
    let arrMins = (departureMinutes + mins) % 60;
    const arrTimeStr = `${String(arrHours).padStart(2, '0')}:${String(arrMins).padStart(2, '0')}`;

    // Price variation based on operators and types
    const isAC = (seed + i * 2) % 3 !== 0; // 66% AC buses
    const isSleeper = (seed + i * 5) % 2 === 0; // 50% sleeper
    const priceVar = ((seed + i * 9) % 300) - 100; // -100 to +200 rupees
    
    let typeDescription = '';
    let typeModifier = 1.0;
    if (isAC && isSleeper) {
      typeDescription = 'A/C Sleeper (2+1)';
      typeModifier = 1.4;
    } else if (isAC && !isSleeper) {
      typeDescription = 'A/C Seater (2+2)';
      typeModifier = 1.15;
    } else if (!isAC && isSleeper) {
      typeDescription = 'Non-A/C Sleeper (2+1)';
      typeModifier = 1.05;
    } else {
      typeDescription = 'Non-A/C Seater (2+2)';
      typeModifier = 0.85;
    }

    const finalPrice = Math.round((basePrice * typeModifier) + priceVar);

    // Dynamic amenities list
    const numAmenities = 4 + ((seed + i) % 5); // 4 to 8 amenities
    const amenities = [];
    for (let k = 0; k < numAmenities; k++) {
      const amenIdx = (seed + i * 2 + k) % amenitiesList.length;
      if (!amenities.includes(amenitiesList[amenIdx])) {
        amenities.push(amenitiesList[amenIdx]);
      }
    }

    const busId = `bus-${seed}-${i}`;
    const seats = generateSeatMatrix(isSleeper, busId);
    const availableSeatsCount = seats.filter(s => !s.isBooked).length;

    generatedBuses.push({
      id: busId,
      operatorName: operator.name,
      operatorRating: operator.rating,
      reviewsCount: operator.reviewsCount,
      logoColor: operator.logoColor,
      busType: typeDescription,
      isAC,
      isSleeper,
      departureTime: depTimeStr,
      arrivalTime: arrTimeStr,
      duration: durationStr,
      durationMinutes: finalDurationMinutes,
      price: finalPrice,
      availableSeats: availableSeatsCount,
      totalSeats: seats.length,
      amenities,
      boardingPoints: getBoardingPoints(fromCity, depTimeStr),
      droppingPoints: getDroppingPoints(toCity, arrTimeStr),
      seats,
      fromCity,
      toCity,
      travelDate: dateString
    });
  }

  return generatedBuses;
};
