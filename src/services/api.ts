import axios, { AxiosError } from 'axios';

import { AvailabilityResponse } from '../types/availability';
import { BookingRequest, BookingResponse, MyReservation } from '../types/booking';
import { LoginRequest, LoginResponse } from '../types/user';
import { City } from '@/types/core';
import { Instructor } from '../types/instructor';

import {
    AUTHORIZATION_HEADER_NAME,
    getAuthorizationHeaderValue,
} from '../utils/auth';
import { COMMON } from '../utils/common';

const API_END_POINT = {
    GET_CITIES: 'cities',
    GET_INSTRUCTORS_BY_CITY: 'instructors?city={0}',
    GET_INSTRUCTOR_AVAILABILITY: 'instructors/{0}/availability',
    GET_INSTRUCTOR_PRICING: 'instructors/{0}/pricing',
    GET_INSTRUCTOR_BOOKED_SLOTS: 'instructors/{0}/booked',
    BOOK: 'bookings',
    MY_RESERVATIONS: 'my-reservations',
    CANCEL_RESERVATION: 'my-reservation/cancel/{0}',
    LOGIN: 'user/login',
};

type API_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const getCities = (): Promise<City[]> => {
    return baseRequest(API_END_POINT.GET_CITIES);
};

export const getInstructorsByCity = (city: string): Promise<Instructor[]> => {
    return baseRequest(
        COMMON.stringFormat(API_END_POINT.GET_INSTRUCTORS_BY_CITY, city)
    );
};

export const getInstructorAvailability = (
    instructorId: string
): Promise<AvailabilityResponse> => {
    return baseRequest(
        COMMON.stringFormat(API_END_POINT.GET_INSTRUCTOR_AVAILABILITY, instructorId)
    );
};

export const getInstructorBookedSlots = (instructorId: string): Promise<{[key: string]: string[]}> => {
    return baseRequest(
        COMMON.stringFormat(API_END_POINT.GET_INSTRUCTOR_BOOKED_SLOTS, instructorId)
    );
};

export const bookLesson = (
    bookingRequest: BookingRequest
): Promise<BookingResponse> => {
    return baseRequest(API_END_POINT.BOOK, 'POST', bookingRequest);
};

export const getMyReservations = (): Promise<MyReservation[]> => {
    return authorizedRequest(API_END_POINT.MY_RESERVATIONS);
};

export const cancelReservation = (
    reservationId: string
): Promise<MyReservation> => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.CANCEL_RESERVATION, reservationId),
        'POST'
    );
};

export const login = (
    loginRequest: LoginRequest
): Promise<LoginResponse> => {
    return baseRequest(API_END_POINT.LOGIN, 'POST', loginRequest);
};

const baseRequest = (
    url: string,
    method: API_METHOD = 'GET',
    data?: object,
    headers?: { [key: string]: string },
    params?: { [key: string]: string }
): Promise<any> => {
    return apiClient
        .request({
            method,
            url,
            headers,
            data,
            params,
        })
        .then((response) => response.data)
        .catch((err: AxiosError | Error) => {
            const error = new Error(err.message);
            error.name = err.name;
            (error as any).status = (err as AxiosError).response?.status || -1;
            (error as any).data = (err as AxiosError).response?.data;
            return Promise.reject(error);
        });
};

const authorizedRequest = (
    url: string,
    method: API_METHOD = 'GET',
    data?: object,
    headers?: { [key: string]: string },
    params?: { [key: string]: string }
): Promise<any> => {
    return getAuthorizationHeaderValue().then((authHeaderValue) => {
        if (!headers) {
            headers = {};
        }

        headers[AUTHORIZATION_HEADER_NAME] = authHeaderValue || '';

        return baseRequest(url, method, data, headers, params);
    });
};

const apiClient = axios.create({
    baseURL: COMMON.apiBaseUrl,
    headers: {
        'Content-type': 'application/json',
    },
});
