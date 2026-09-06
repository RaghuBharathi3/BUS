export const calculateFare = (basePrice, seatsCount, activeCoupon = null) => {
  const baseFare = basePrice * seatsCount;
  const convenienceFee = seatsCount > 0 ? 40 : 0;
  const taxes = Math.round(baseFare * 0.05);
  const discount = activeCoupon ? activeCoupon.discountAmount : 0;
  const totalFare = baseFare + convenienceFee + taxes - discount;
  return { baseFare, convenienceFee, taxes, discount, totalFare };
};