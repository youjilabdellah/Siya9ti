interface PricingPackage {
  hours: number;
  price: number;
}

interface InstructorLocation {
  latitude: number;
  longitude: number;
  address: string;
}

type CarServiceType = 'instructor_car' | 'student_car' | 'both';

export interface Instructor {
  id: string;
  name: string;
  city: string;
  rating: number;
  currency: string; // e.g. "MAD"
  pricePerHour: number;
  packages: PricingPackage[];
  location?: InstructorLocation;
  carServiceType?: CarServiceType;
  bookedSlots?: {[key: string]: string[]};
}
