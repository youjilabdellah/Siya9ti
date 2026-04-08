import axios, { AxiosError } from 'axios';

import { AvailabilityResponse } from '../types/availability';
import { BookingRequest, BookingResponse } from '../types/booking';
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
    BOOK: 'bookings',
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

export const bookLesson = (
    bookingRequest: BookingRequest
): Promise<BookingResponse> => {
    return authorizedRequest(API_END_POINT.BOOK, 'POST', bookingRequest);
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
            params
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
