interface PricingPackage {
  hours: number;
  price: number;
}

export interface Instructor {
  id: string;
  name: string;
  city: string;
  rating: number;
  currency: string; // e.g. "MAD"
  pricePerHour: number;
  packages: PricingPackage[];
  bookedSlots?: {[key: string]: string[]};
}
