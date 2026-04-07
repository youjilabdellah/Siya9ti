export interface AvailabilitySlot {
  start: string; // ISO date-time
  end: string;   // ISO date-time
  isAvailable: boolean;
}

export interface AvailabilityResponse {
  instructorId: string;
  slots: AvailabilitySlot[];
}
