import { Member } from '@/types/social.ts';
import { COMMON } from '@/utils/common';

export type ActivityDetails = {
    text?: string;
    image?: string;
    video?: string;
};

export type Activity = {
    id: number;
    extra: boolean;
    introWeekDay: number | null;
    points: number;
    steps: number;
    title: string;
    type: ActivityType;
    action: ActivityAction | null;
    stretch: boolean;
    order: number | null;
    image?: string | null;
    user_assignment?: {
        date_performed: string;
        points_earned: number;
        steps_completed: number;
    };
};

export type UserActivity = {
    activity: number;
    date: string;
    cancelled: boolean;
    points: number;
    stepsComplete: number;
    members: Member[];
    cancelledAssignment?: string;
};

export type DisplayedDailyActivity = Activity & { userActivity?: UserActivity };

export type DisplayedWeeklyActivity = Activity & {
    userActivities?: UserActivity[];
};

export enum ActivityType {
    Daily = 1,
    Weekly = 2,
    Intro = 3
}

export enum ActivityAction {
    OpenTrueVitalityAssessment = 1,
    OpenDietIdAssessment = 2,
    OpenTrueHappinessAssessment = 3,
    OpenPurposeCheckupAssessment = 4,
    OpenCantrilLadderAssessment = 5,
    OpenR2cImportanceAssessment = 6,
    OpenR2cConfidenceAssessment = 7
}

export type Filter = 'All' | 'Daily' | 'Weekly' | 'Monthly';

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateActivity = (apiActivity: any): Activity | undefined => {
    // translate object received via api with snake-case properties to an
    // Activity with camelCase properties
    const {
        id,
        extra,
        intro_week_day,
        points,
        steps,
        title,
        type,
        action,
        stretch,
        order,
        image = null
    } = apiActivity;

    if (
        [
            id,
            extra,
            intro_week_day,
            points,
            steps,
            title,
            type,
            action,
            stretch,
            order
        ].includes(undefined)
    ) {
        return undefined;
    }

    return {
        id,
        extra,
        introWeekDay: intro_week_day,
        points,
        steps,
        title,
        type,
        action,
        stretch,
        order,
        image
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserActivity = (
    apiUserActivity: any
): UserActivity | undefined => {
    // translate object received via api with snake-case properties to a
    // UserActivity with camelCase properties
    const {
        assignment,
        date,
        cancelled,
        points,
        steps_complete,
        members,
        cancelled_assignment
    } = apiUserActivity;

    if (
        [assignment, date, cancelled, points, steps_complete].includes(
            undefined
        )
    ) {
        return undefined;
    }

    let loadedDate;

    try {
        loadedDate = COMMON.dateStr(date);
    } catch {
        return undefined;
    }

    return {
        activity: assignment,
        date: loadedDate,
        cancelled,
        points,
        stepsComplete: steps_complete,
        members,
        cancelledAssignment: cancelled_assignment
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateActivityDetails = (
    apiActivityDetails: any
): ActivityDetails => {
    // translate object received via api with snake-case properties to an
    // ActivityDetails with camelCase properties
    const { text, image, video } = apiActivityDetails;

    return {
        text,
        image,
        video
    };
};
