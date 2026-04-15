import { BookingStatus } from './core';

export interface BookingRequest {
  instructorId: string;
  selectedSlots: string[];
  date: string; // ISO date string (e.g., '2026-04-15')
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreed: boolean; // User agreement to terms and conditions
    password?: string; // Optional password field for registration
  };
}

export interface BookingResponse {
  id: string;
  instructorId: string;
  status: BookingStatus;
  date: string; // ISO date string
  selectedSlots: string[];
  totalPrice: number;
}
