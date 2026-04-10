import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PURGE } from 'redux-persist';

import * as api from '../services/api';
import { RootState } from '@/store';

import { City } from '@/types/core';
import { Instructor } from '../types/instructor';

export interface InstructorState {
    loading: boolean;
    cities: City[];
    instructors: Instructor[];
}

const initialState: InstructorState = {
    loading: false,
    cities: [],
    instructors: [],
};

export const getCities = createAsyncThunk(
    'instructor/getCities',
    async (_options: {}, { rejectWithValue }) => {
        try {
            return await api.getCities();
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getInstructors = createAsyncThunk(
    'instructor/getInstructors',
    async (options: {
        city: string;
    }, { rejectWithValue }) => {
        try {
            return await api.getInstructorsByCity(options.city);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getInstructorBookedSlots = createAsyncThunk(
    'instructor/getInstructorBookedSlots',
    async (options: {
        instructorId: string;
    }, { rejectWithValue }) => {
        try {
            return await api.getInstructorBookedSlots(options.instructorId);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const instructorSlice = createSlice({
    name: 'instructor',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCities.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.loading = false;
            state.cities = action.payload;
        });
        builder.addCase(getCities.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getInstructors.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInstructors.fulfilled, (state, action) => {
            state.loading = false;
            state.instructors = action.payload;
        });
        builder.addCase(getInstructors.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getInstructorBookedSlots.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInstructorBookedSlots.fulfilled, (state, action) => {
            state.loading = false;
            state.instructors = state.instructors?.map((instructor) => {
                if (instructor.id === (action.meta.arg.instructorId)) {
                    return {
                        ...instructor,
                        bookedSlots: action.payload,
                    };
                }
                return instructor;
            });
        });
        builder.addCase(getInstructorBookedSlots.rejected, (state) => {
            state.loading = false;
        });
        // when purging reset back to the initial state
        builder.addCase(PURGE, () => initialState);
    },
});

export default instructorSlice.reducer;

interface InstructorSelectorsType {
    loading: boolean | undefined;
    cities: City[] | undefined;
    instructors: Instructor[] | undefined;
}

export const InstructorSelectors = (): InstructorSelectorsType => {
    const loading = useSelector((state: RootState) => state.instructor?.loading);

    const cities = useSelector((state: RootState) => state.instructor?.cities);

    const instructors = useSelector((state: RootState) => state.instructor?.instructors);

    return {
        loading,
        cities,
        instructors,
    };
};
