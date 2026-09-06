export const coupons = [
  {
    code: 'FIRSTTRIP',
    description: 'Get 15% off on your first booking (Max ₹150 discount)',
    discountType: 'percentage',
    discountValue: 15,
    minFare: 400,
    maxDiscount: 150,
    validate: (userBookings) => {
      // Valid if the user has 0 previous successful bookings
      return userBookings.filter(b => b.status !== 'Cancelled').length === 0;
    },
    invalidMessage: 'This coupon is only valid for your first booking.'
  },
  {
    code: 'ROUTE10',
    description: 'Flat ₹100 off on ticket bookings above ₹600',
    discountType: 'flat',
    discountValue: 100,
    minFare: 600,
    maxDiscount: 100,
    validate: () => true,
    invalidMessage: ''
  },
  {
    code: 'WEEKEND',
    description: 'Special Weekend offer: 10% off (Max ₹250 discount)',
    discountType: 'percentage',
    discountValue: 10,
    minFare: 800,
    maxDiscount: 250,
    validate: (userBookings, travelDate) => {
      if (!travelDate) return true;
      const day = new Date(travelDate).getDay();
      // 0 = Sunday, 6 = Saturday
      return day === 0 || day === 6;
    },
    invalidMessage: 'This coupon is only valid for weekend travel dates (Saturday/Sunday).'
  }
];

export const calculateDiscount = (couponCode, baseFare, userBookings = [], travelDate = '') => {
  const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code.' };
  }

  if (baseFare < coupon.minFare) {
    return { 
      valid: false, 
      discount: 0, 
      message: `Minimum fare of ₹${coupon.minFare} required for this coupon.` 
    };
  }

  const isEligible = coupon.validate(userBookings, travelDate);
  if (!isEligible) {
    return { 
      valid: false, 
      discount: 0, 
      message: coupon.invalidMessage || 'You are not eligible for this coupon.' 
    };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'flat') {
    discountAmount = coupon.discountValue;
  } else if (coupon.discountType === 'percentage') {
    discountAmount = Math.round((baseFare * coupon.discountValue) / 100);
    if (coupon.maxDiscount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  }

  return { valid: true, discount: discountAmount, message: 'Coupon applied successfully!' };
};
