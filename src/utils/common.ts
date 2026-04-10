import { once } from 'lodash';
import moment from 'moment';
import { Dimensions, PixelRatio, Platform } from 'react-native';

import { API_BASE_URL } from './config';

const warnLocalBackend = once(() =>
    console.warn('Working with a local backend')
);

export const COMMON = {
    get isIos() {
        return Platform.OS === 'ios';
    },
    get apiBaseUrl() {
        if (API_BASE_URL) {
            return API_BASE_URL;
        } else {
            warnLocalBackend();

            return this.isIos
                ? 'http://127.0.0.1:8000/'
                : 'http://10.0.2.2:8000/';
        }
    },
    stringFormat(s: string, ...args: (number | string)[]) {
        return s.replace(/{([0-9]+)}/g, (match, index) =>
            (typeof args[index] === 'undefined'
                ? match
                : args[index]
            ).toString()
        );
    },
    delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    dateStr(date: moment.MomentInput) {
        return moment(date).format('YYYY-MM-DD');
    },
    get12HrTimeFromDateStr(date: string) {
        try {
            const dateObj = new Date(date);

            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid date string');
            }

            return dateObj.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        } catch (error) {
            return 'Invalid Time';
        }
    },
    capitalizeFirstLetter(string: String) {
        if (!string) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    getWeekDateRange(activeDateOfMonth: Date) {
        return {
            start: moment(activeDateOfMonth).startOf('isoWeek').toDate(),
            end: moment(activeDateOfMonth).endOf('isoWeek').toDate(),
        };
    },
    getMonthDateRange(activeDateOfMonth: Date) {
        const start = moment(activeDateOfMonth).startOf('month').toDate();
        const end = moment(activeDateOfMonth).endOf('month').toDate();
        return { start: start, end: end };
    },
    truncateName(name: string) {
        return name.length > 10 ? name.slice(0, 10) + '…' : name;
    },
    isPersonalMoai(id: number) {
        return id < 0;
    },
    isSmallDevice() {
        const { width, height } = Dimensions.get('screen');
        const pixelRatio = PixelRatio.get();

        const widthPx = width * pixelRatio;
        const heightPx = height * pixelRatio;

        const diagonalPx = Math.sqrt(widthPx ** 2 + heightPx ** 2);
        const dpi = PixelRatio.get() * 160;

        const diagonalInches = diagonalPx / dpi;

        return diagonalInches < 5;
    },
};
