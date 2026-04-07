import { BookingStatus } from './core';

export interface BookingRequest {
  instructorId: string;
  startTime: string; // ISO date-time
  endTime: string;   // ISO date-time
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface BookingResponse {
  id: string;
  instructorId: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  totalPrice: number;
}
