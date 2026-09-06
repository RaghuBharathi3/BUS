// Safar local mock database implementation

const DEFAULT_USERS = [
  {
    email: 'arun@safar.com',
    password: 'password',
    name: 'Arun Kumar',
    phone: '9876543210',
    gender: 'Male',
    age: 28
  },
  {
    email: 'priya@safar.com',
    password: 'password',
    name: 'Priya Sharma',
    phone: '9123456789',
    gender: 'Female',
    age: 26
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: 'BK-100234',
    userEmail: 'arun@safar.com',
    busId: 'bus-hist-1',
    operatorName: 'SRS Travels',
    busType: 'A/C Seater (2+2)',
    fromCity: 'Chennai',
    toCity: 'Bengaluru',
    travelDate: '2026-08-15',
    departureTime: '06:00',
    arrivalTime: '12:30',
    seatsSelected: ['12A', '12B'],
    passengers: [
      { name: 'Arun Kumar', age: 28, gender: 'Male', seatNo: '12A' },
      { name: 'Ramesh Kumar', age: 54, gender: 'Male', seatNo: '12B' }
    ],
    fareDetails: {
      baseFare: 1300,
      convenienceFee: 60,
      taxes: 91,
      discount: 100,
      totalFare: 1351
    },
    paymentMethod: 'UPI',
    status: 'Completed',
    createdAt: '2026-08-10T14:22:00.000Z'
  },
  {
    id: 'BK-100109',
    userEmail: 'arun@safar.com',
    busId: 'bus-hist-2',
    operatorName: 'Safar Luxe Class',
    busType: 'A/C Sleeper (2+1)',
    fromCity: 'Mumbai',
    toCity: 'Pune',
    travelDate: '2026-08-10',
    departureTime: '21:00',
    arrivalTime: '00:30',
    seatsSelected: ['L5'],
    passengers: [
      { name: 'Arun Kumar', age: 28, gender: 'Male', seatNo: 'L5' }
    ],
    fareDetails: {
      baseFare: 650,
      convenienceFee: 30,
      taxes: 45,
      discount: 0,
      totalFare: 725
    },
    paymentMethod: 'Card',
    status: 'Cancelled',
    createdAt: '2026-08-08T09:15:00.000Z',
    cancelledAt: '2026-08-09T18:00:00.000Z'
  }
];

const initializeDb = () => {
  if (!localStorage.getItem('safar_users')) {
    localStorage.setItem('safar_users', JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem('safar_bookings')) {
    localStorage.setItem('safar_bookings', JSON.stringify(DEFAULT_BOOKINGS));
  }
};

initializeDb();

export const mockDb = {
  // Authentication
  registerUser: (name, email, password, phone) => {
    const users = JSON.parse(localStorage.getItem('safar_users') || '[]');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser = { name, email, password, phone, gender: '', age: '' };
    users.push(newUser);
    localStorage.setItem('safar_users', JSON.stringify(users));
    return { success: true, user: newUser };
  },

  loginUser: (email, password) => {
    const users = JSON.parse(localStorage.getItem('safar_users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }
    localStorage.setItem('safar_current_user', JSON.stringify(user));
    return { success: true, user };
  },

  logoutUser: () => {
    localStorage.removeItem('safar_current_user');
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('safar_current_user');
    return userJson ? JSON.parse(userJson) : null;
  },

  updateProfile: (updatedData) => {
    const currentUser = mockDb.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Not logged in.' };

    const users = JSON.parse(localStorage.getItem('safar_users') || '[]');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());

    if (userIndex === -1) return { success: false, message: 'User not found.' };

    const newUserData = { ...users[userIndex], ...updatedData };
    users[userIndex] = newUserData;
    localStorage.setItem('safar_users', JSON.stringify(users));
    localStorage.setItem('safar_current_user', JSON.stringify(newUserData));
    return { success: true, user: newUserData };
  },

  // Bookings
  getBookings: (email) => {
    const bookings = JSON.parse(localStorage.getItem('safar_bookings') || '[]');
    return bookings
      .filter(b => b.userEmail.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.travelDate) - new Date(a.travelDate));
  },

  addBooking: (bookingData) => {
    const bookings = JSON.parse(localStorage.getItem('safar_bookings') || '[]');
    const newBooking = {
      ...bookingData,
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('safar_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  cancelBooking: (bookingId) => {
    const bookings = JSON.parse(localStorage.getItem('safar_bookings') || '[]');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) return { success: false, message: 'Booking not found.' };

    bookings[bookingIndex].status = 'Cancelled';
    bookings[bookingIndex].cancelledAt = new Date().toISOString();
    localStorage.setItem('safar_bookings', JSON.stringify(bookings));
    return { success: true, booking: bookings[bookingIndex] };
  }
};
