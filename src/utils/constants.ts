import {
    MyTrackingViewStackRoutes,
    SocialViewStackRoutes,
} from '@/navigation/mainTabNavigation';
import { TranslationLanguage } from '@/types/translation';

type AssessmentConstants = {
    title: string;
    name: string;
    displayName: string;
    description: string;
    readout: string;
};

export type DropDownItemType = {
    id: string;
    title: string;
    tabName?: string;
    screenName: string;
};

type ConstantsType = {
    message: { [key: string]: string };
    errorCodes: { [key: string]: string };
    mixPanelEvents: { [key: string]: string };
    assessments: { [key: string]: AssessmentConstants };
    maxActivityPointsPerPeriod: { [key: string]: number };
    urls: { [key: string]: string };
    menuDropdownOptions: { [key: string]: Array<DropDownItemType> };
    periods: { [key: string]: string };
    challengesType: { [key: string]: string };
    assessmentsCode: string[];
    activityActions: { [key: string]: number };
    regex: { [key: string]: RegExp };
};

type VerificationType = {
    code: string;
    emailDomain: string;
    bsocMemberId: string;
};

export const Constants: ConstantsType = {
    message: {
        passwordDoesNotConform:
            'Password must be at least 8 characters long, contain numbers, letters and symbols, not be a common password and not be similar to your email.',
        networkError: 'An unknown error has occurred',
        apiError: 'Oops, something went wrong. Please try again later.',
        resetPasswordNotCornfirm:
            'The password must be at least 8 characters, include both numbers and letters, and cannot be something trivial.',
        unknownError: 'Oops, something went wrong. Please try again later.',
        emailAlreadyExists: 'Email already exists',
        zipCodeNotSupported:
            'The Blue Zones Challenge app is not available in your location yet',
    },
    errorCodes: {
        passwordDoesNotConform: 'password_does_not_conform',
        badCredentials: 'bad_credentials',
        requestInvalid: 'request_invalid',
        notFound: 'not_found',
        emailAlreadyExists: 'email_already_exists',
        verificationFailed: 'verification_failed',
        memberIdVerificationFailed: 'member_id_verification_failed',
        zipCodeVerificationFailed: 'zip_code_verification_failed',
        emailNotVerified: 'email_not_verified',
        expiredCode: 'expired_code',
        capacityExceeded: 'capacity_exceeded',
        badToken: 'bad_token',
        invalidInvitedEmail: 'invalid_invited_email',
        challengeModeDisabled: 'challenge_mode_disabled',
    },
    mixPanelEvents: {
        tabNavigation: 'Tab Navigation',
        plusMenuStatusChange: 'Plus Menu Status Change',
        plusMenuLog: 'Plus Menu Log',
        assessmentUsage: 'Assessment Usage',
        changePasswordUsage: 'Change Password Usage',
        deleteUserUsage: 'Delete User Usage',
        signUpFailure: 'Sign up failure',
        dailyPageUsage: 'Daily Page Usage',
        tutorialUsage: 'Tutorial Usage',
        infoPageUsage: 'Info Page Usage',
        logNoteUsage: 'Log Note Usage',
        logPhotoUsage: 'Log Photo Usage',
        logWeightUsage: 'Log Weight Usage',
        monthlyPageUsage: 'Monthly Page Usage',
        resetPasswordUsage: 'Reset Password Usage',
        settingsUsage: 'Settings Usage',
        signInUsage: 'Sign In Usage',
        signUpUsage: 'Sign Up Usage',
        weeklyPageUsage: 'Weekly Page Usage',
        activitySwipe: 'Activity Swipe',
        activityTap: 'Activity Tap',
        joinMoaiUsage: 'Join Moai Usage',
        shareActivity: 'Share Activity',
        createMoaiUsage: 'Create Moai Usage',
        moaiSettingsUsage: 'Moai Settings Usage',
        moaiPostUsage: 'Moai Post Usage',
        finishedAssessment: 'Finished Assessment',
        completedActivity: 'Completed Activity',
        myTrackingPageUsage: 'MyTracking Page Usage',
        inviteMoaiUsage: 'Invite Moai Usage',
        manageMyMoaiPageUsage: 'Manage My Moai Usage',
        myFeedsPageUsage: 'MyFeeds Usage',
        myMoaisPageUsage: 'Leave Moai Usage',
        userProfilePageUsage: 'User Profile Usage',
        assessmentHistoryPageUsage: 'Assessment History Usage',
        myPointsHistoryPageUsage: 'Point History Usage',
        sharingSettingsUsage: 'Sharing Settings Usage',
        moaiProgressUsage: 'Moai Progress Usage',
        changeNameUsage: 'Change Name Usage',
        userInvitationUsage: 'User Invitation Usage',
        reportedMemberUsage: 'ReportedMember Usage',
        inviteMoaiPageUsage: 'Invite Moai Usage',
    },
    assessments: {
        vitality: {
            title: 'True Vitality Test',
            name: 'Vitality',
            displayName: 'true vitality',
            description:
                'Take the True Vitality Test to estimate your life expectancy and how you can potentially live a longer healthier life!',
            readout:
                'Learn more about vitality and longevity https://example.com/vitality. and also look into this link https://www.google.com for more info.',
        },
        dietid: {
            title: 'True Nutrition Test',
            name: 'Diet',
            displayName: 'true nutrition',
            description:
                'Take the True Nutrition Test to learn how good your diet is from 1 to 10 and what you can do to improve your nutrition!',
            readout:
                'Explore dietary guidelines and nutrition tips https://example.com/nutrition.',
        },
        happiness: {
            title: 'True Happiness Test',
            name: 'Happiness',
            displayName: 'true happiness',
            description:
                'The Happiness Test assesses your happiness level from 1 to 100 and how your environment is affecting it.',
            readout:
                'Discover ways to improve happiness https://example.com/happiness. and also look into this link https://www.google.com for more info.',
        },
        purpose: {
            title: 'The Purpose Checkup',
            name: 'Purpose',
            displayName: 'purpose check up',
            description:
                'The Purpose Checkup gives a measure of the power of purpose you are experiencing in your life at present between 0 to 84.',
            readout:
                'Understand the impact of purpose in life https://example.com/purpose.',
        },
        ladder: {
            title: 'Cantril Ladder Test',
            name: 'Cantril Ladder',
            displayName: 'Cantril ladder',
            description:
                'The Cantril Ladder Test measures your life satisfaction on a scale of 0 to 10, revealing how your surroundings shape your overall well-being.',
            readout:
                'Read about life satisfaction and well-being https://example.com/ladder.',
        },
        r2c_confidence: {
            title: 'Readiness To Change Confidence',
            name: 'Readiness To Change Confidence',
            displayName: 'Readiness To Change Confidence',
            description:
                'The Cantril Ladder Test measures your life satisfaction, revealing how your surroundings shape your overall well-being.',
            readout:
                'Find strategies for building confidence https://example.com/confidence.',
        },
        r2c_importance: {
            title: 'Readiness To Change Importance',
            name: 'Readiness To Change Importance',
            displayName: 'Readiness To Change Importance',
            description:
                'The Cantril Ladder Test measures your life satisfaction, revealing how your surroundings shape your overall well-being.',
            readout:
                'Learn why change is important https://example.com/importance.',
        },
        gallup: {
            title: 'Gallup Well-being Assessment',
            name: 'Gallup',
            displayName: 'Gallup well-being',
            description:
                'The Gallup well-being is an assessment tool widely used by employers and organizations to identify individual aptitudes and areas of strength.',
            readout:
                'Learn why change is important https://example.com/importance.',
        },
    },
    maxActivityPointsPerPeriod: {
        daily: 12,
        weekly: 100,
        monthly: 400,
    },
    urls: {
        termsOfUse: 'https://www.bluezones.com/mobileterms/',
        blogLearnMore: 'https://www.bluezones.com/challengereads/',
        privacyPolicy: 'https://www.bluezones.com/privacy/',
    },
    periods: {
        all: 'All',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
    },
    assessmentsCode: [
        'vitality',
        'dietid',
        'happiness',
        'purpose',
        'ladder',
        'r2c_importance',
        'r2c_confidence',
        'real_age',
        'gallup',
    ],
    menuDropdownOptions: {
        myTrackingViewStack: [
            {
                id: 'myTracking',
                title: 'My Tracking',
                tabName: 'MyTrackingView',
                screenName: MyTrackingViewStackRoutes.MY_TRACKING,
            },
            {
                id: 'assessmentHistory',
                title: 'Assessments History',
                tabName: 'MyTrackingView',
                screenName: MyTrackingViewStackRoutes.MY_ASSESSMENT_HISTORY,
            },
            {
                id: 'pointHistory',
                title: 'Points History',
                tabName: 'MyTrackingView',
                screenName: MyTrackingViewStackRoutes.MY_POINTS_HISTORY,
            },
            {
                id: 'sharingSetting',
                title: 'Sharing Settings',
                tabName: 'MyTrackingView',
                screenName: MyTrackingViewStackRoutes.MY_SHARING_SETTINGS,
            },
        ],
        socialViewStack: [
            {
                id: 'moaiFeed',
                title: 'Moai Feed',
                tabName: 'SocialView',
                screenName: SocialViewStackRoutes.MY_FEEDS,
            },
            {
                id: 'manageMyMoai',
                title: 'Manage my Moai',
                tabName: 'SocialView',
                screenName: SocialViewStackRoutes.MANAGE_MY_MOAI,
            },
            {
                id: 'leaveAMoai',
                title: 'Leave a Moai',
                tabName: 'SocialView',
                screenName: SocialViewStackRoutes.My_MOAIS,
            },
            {
                id: 'moaiProgress',
                title: 'Moai Progress',
                tabName: 'SocialView',
                screenName: SocialViewStackRoutes.MOAI_PROGRESS,
            },
        ],
    },
    challengesType: {
        individualQualifier: 'individual_qualifier',
        individualLeaderboard: 'individual_leaderboard',
        teamQualifier: 'team_qualifier',
        teamLeaderboard: 'team_leaderboard',
    },
    activityActions: {
        openTrueVitalityAssessment: 1,
        openDietIdAssessment: 2,
        openTrueHappinessAssessment: 3,
        openPurposeCheckupAssessment: 4,
        openCantrilLadderAssessment: 5,
        openReadinessToChangeImportanceAssessment: 6,
        openReadinessToChangeImportanceConfidence: 7,
        openRealAgeAssessment: 8,
        openGallupAssessment: 9,
        openPostPhoto: 20,
        openQrScanner: 21,
    },
    regex: {
        password:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])/,
    },
};

export const LANGUAGE_ENGLISH: TranslationLanguage = {
    shortCode: 'en',
    fullCode: 'en-us',
    title: 'English',
};

export const LANGUAGE_SPANISH: TranslationLanguage = {
    shortCode: 'es',
    fullCode: 'es-419',
    title: 'Español',
};

export const TranslationLanguages: TranslationLanguage[] = [
    LANGUAGE_ENGLISH,
    LANGUAGE_SPANISH,
];

export const VERIFICATION_TYPE: VerificationType = {
    code: 'code',
    emailDomain: 'email_domain',
    bsocMemberId: 'bsoc_member_id',
};

export const INIT_PAGE_LOAD_STORAGE_KEY = 'hasVisitedChallengeWelcome';

// Constants for maxBottomSheetHeight calculation

export const CHALLENGES_DROPDOWN_HEIGHT = 49;
export const CHALLENGES_DROPDOWN_MARGIN_TOP = 13; // From PageLayout's dropDownContainer marginTop
export const CHALLENGES_DROPDOWN_MARGIN_VERTICAL = 8; // From local styles.filterView
export const HEADER_HEIGHT = 70; // Estimated header height in PageLayout
