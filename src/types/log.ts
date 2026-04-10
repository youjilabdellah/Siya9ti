import moment from 'moment';

import { COMMON } from '@/utils/common';

export enum WeightUnit {
    LB = 1,
    KG = 2
}

type UserLog = {
    id: number;
    date: string;
    // an epoch representation of the creation time for sorting
    created: number;
};

export type VisibilityScope = 'current_challenge' | 'feeds' | 'my_challenges';

export type UserWeight = UserLog & {
    weight: number;
    unit: WeightUnit;
    text: string;
};

export type UserImage = UserLog & {
    image: string;
};

export type UserNote = UserLog & {
    text: string;
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
const translateUserLog = (apiUserLog: any): UserLog | undefined => {
    // load date and time strings of object received via api
    const { id, date, created_date } = apiUserLog;

    if ([id, date, created_date].includes(undefined)) {
        return undefined;
    }

    let loadedDate;
    let loadedCreated;

    try {
        loadedDate = COMMON.dateStr(date);
        loadedCreated = moment(created_date).valueOf();
    } catch {
        return undefined;
    }

    return {
        id,
        date: loadedDate,
        created: loadedCreated,
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserWeight = (
    apiUserWeight: any
): UserWeight | undefined => {
    const { weight, unit, text } = apiUserWeight;

    if ([weight, unit].includes(undefined)) {
        return undefined;
    }

    if (WeightUnit[unit] === undefined) {
        return undefined;
    }

    const userLog = translateUserLog(apiUserWeight);

    if (userLog === undefined) {
        return undefined;
    }

    return {
        ...userLog,
        weight: weight,
        unit: unit,
        text: text!,
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserImage = (
    apiUserImage: any
): UserImage | undefined => {
    const { image } = apiUserImage;

    if ([image].includes(undefined)) {
        return undefined;
    }

    const userLog = translateUserLog(apiUserImage);

    if (userLog === undefined) {
        return undefined;
    }

    return {
        ...userLog,
        image: image!,
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserNote = (apiUserNote: any): UserNote | undefined => {
    const { text } = apiUserNote;

    if ([text].includes(undefined)) {
        return undefined;
    }

    const userLog = translateUserLog(apiUserNote);

    if (userLog === undefined) {
        return undefined;
    }

    return {
        ...userLog,
        text: text!,
    };
};
