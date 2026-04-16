import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PURGE } from 'redux-persist';

import * as api from '../services/api';
import { RootState } from '@/store';
import { BookingRequest, BookingResponse, MyReservation } from '../types/booking';
import { setAuthToken } from '../utils/auth';

export interface ReservationsState {
  loading: boolean;
  bookings: BookingResponse[];
  myReservations: MyReservation[];
  error?: string | null;
}

const initialState: ReservationsState = {
  loading: false,
  bookings: [],
  myReservations: [],
  error: null,
};

export const fetchMyReservations = createAsyncThunk(
  'reservations/fetchMyReservations',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getMyReservations();
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Failed to fetch reservations');
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (reservationId: string, { rejectWithValue }) => {
    try {
      return await api.cancelReservation(reservationId);
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Failed to cancel reservation');
    }
  }
);

export const createBooking = createAsyncThunk(
  'reservations/createBooking',
  async (bookingRequest: BookingRequest, { rejectWithValue }) => {
    try {
      return await api.bookLesson(bookingRequest);
    } catch (err: any) {
      return rejectWithValue(err?.message ?? 'Booking failed');
    }
  }
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    clearReservationsError(state) {
      state.error = null;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    cancelBooking(state, action) {
      const bookingId = action.payload as string;
      state.bookings = state.bookings.map((booking) => {
        if (booking.id !== bookingId) {
          return booking;
        }

        return {
          ...booking,
          status: 'cancelled',
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.loading = false;
      setAuthToken(action.payload.token ?? ''); // set the token for future authenticated requests
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Booking failed';
    });
    builder.addCase(fetchMyReservations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyReservations.fulfilled, (state, action) => {
      state.loading = false;
      state.myReservations = action.payload;
    });
    builder.addCase(fetchMyReservations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Failed to fetch reservations';
    });
    builder.addCase(cancelReservation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelReservation.fulfilled, (state, action) => {
      state.loading = false;
      state.myReservations = state.myReservations.map((reservation) => {
        if (reservation.id !== action.payload.id) {
          return reservation;
        }

        return action.payload;
      });
    });
    builder.addCase(cancelReservation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Failed to cancel reservation';
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export const { clearReservationsError, addBooking, cancelBooking } = reservationsSlice.actions;

export default reservationsSlice.reducer;

interface ReservationsSelectorsType {
  loading: boolean | undefined;
  bookings: BookingResponse[] | undefined;
  myReservations: MyReservation[] | undefined;
  error: string | null | undefined;
}

export const ReservationsSelectors = (): ReservationsSelectorsType => {
  const loading = useSelector((state: RootState) => state.reservations?.loading);
  const bookings = useSelector((state: RootState) => state.reservations?.bookings);
  const myReservations = useSelector((state: RootState) => state.reservations?.myReservations);
  const error = useSelector((state: RootState) => state.reservations?.error);

  return {
    loading,
    bookings,
    myReservations,
    error,
  };
};
