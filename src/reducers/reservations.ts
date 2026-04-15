import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PURGE } from 'redux-persist';

import * as api from '../services/api';
import { RootState } from '@/store';
import { BookingRequest, BookingResponse } from '../types/booking';

export interface ReservationsState {
  loading: boolean;
  bookings: BookingResponse[];
  error?: string | null;
}

const initialState: ReservationsState = {
  loading: false,
  bookings: [],
  error: null,
};

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
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings.push(action.payload);
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Booking failed';
    });
    builder.addCase(PURGE, () => initialState);
  },
});

export const { clearReservationsError, addBooking } = reservationsSlice.actions;

export default reservationsSlice.reducer;

interface ReservationsSelectorsType {
  loading: boolean | undefined;
  bookings: BookingResponse[] | undefined;
  error: string | null | undefined;
}

export const ReservationsSelectors = (): ReservationsSelectorsType => {
  const loading = useSelector((state: RootState) => state.reservations?.loading);
  const bookings = useSelector((state: RootState) => state.reservations?.bookings);
  const error = useSelector((state: RootState) => state.reservations?.error);

  return {
    loading,
    bookings,
    error,
  };
};
