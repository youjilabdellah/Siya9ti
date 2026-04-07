import axios, { AxiosError } from 'axios';
import moment from 'moment';

import { VisibilityScope } from '@/types/log.ts';
import { LanguageFullCode } from '@/types/translation';
import { Instructor } from '@/types/instructor';
import {
    AUTHORIZATION_HEADER_NAME,
    constructAuthorizationHeaderValue,
    getAuthorizationHeaderValue,
    setAuthToken
} from '@/utils/auth';
import { COMMON } from '@/utils/common';

const API_END_POINT = {
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
    SIGN_UP: 'user/sign-up',
    GET_PROFILE: 'profile/',
    IMAGE_UPLOAD: 'image/upload',
    LOG_WEIGHT: 'log/weight',
    UPDATE_LOG_WEIGHT: 'log/weight/{0}',
    LOG_NOTE: 'log/note',
    UPDATE_LOG_NOTE: 'log/note/{0}',
    LOG_IMAGE: 'log/image',
    UPDATE_LOG_IMAGE: 'log/image/{0}',
    GET_ASSIGNMENTS: 'assignment/',
    GET_ASSIGNMENT_STATS: 'assignment/stats/{0}/{1}',
    GET_ASSIGNMENT_INTRO: 'assignment/intro/{0}/{1}',
    GET_ASSIGNMENT_DAILY: 'assignment/daily/{0}/{1}',
    GET_ASSIGNMENT_WEEKLY: 'assignment/weekly/{0}/{1}',
    GET_ASSIGNMENT_MEMBERS: 'assignment/members/{0}/{1}',
    GET_CHALLENGES: 'challenges/catalog',
    GET_CHALLENGES_ACTIVITIES: '/challenges/{0}/activities/{1}/',
    UPDATE_CHALLENGE_STEP: '/challenges/{0}/activity/{1}/step',
    LOG_GALLERY: 'log/gallery/{0}/{1}',
    GET_ASSIGNMENT_DETAILS: 'assignment/details/{0}',
    CHANGE_PASSWORD: 'user/change-password',
    DELETE_USER: 'user/delete',
    RESET_PASSWORD: 'user/reset/request',
    RESET_PASSWORD_VERIFY: 'user/reset/verify',
    RESET_PASSWORD_CONFIRM: 'user/reset/confirm',
    SET_ASSIGNMENT_STEP: 'assignment/{0}/step',
    START_ASSESSMENT: 'assessment/{0}/start',
    START_GALLUP_ASSESSMENT: 'assessment/gallup/start-or-get-question',
    SUBMIT_GALLUP_ANSWER: 'assessment/gallup/submit',
    ASSESSMENT_SCORES: 'assessment/{0}/scores',
    ASSESSMENT_LATEST: 'assessment/latest',
    ASSESSMENT_FINISH: 'assessment/finish',
    GET_CLIENT_CONFIG: 'config/{0}/{1}',
    UPDATE_SETTINGS: 'profile/settings',
    VERIFY_ACCOUNT_EMAIL_REQUEST: '/user/verify-account/request',
    VERIFY_ACCOUNT_CONFIRM: '/user/verify-account/confirm',
    CREATE_MOAI_POST: 'social/moais/{0}/posts/',
    GET_MOAI_POSTS: '/social/moais/{0}/posts/?page={1}&limit={2}',
    CREATE_MOAI: '/social/moai',
    MOAIS: 'social/moais/{0}/',
    POST_REACTION: '/social/posts/{0}/reactions/',
    COMMENT_REACTION: '/social/posts/{0}/comments/{1}/reactions/',
    MOAI_MEMBER_REQUEST: 'social/moais/{0}/requests/{1}/',
    JOIN_MOAI: 'social/moais/join/',
    SUBMIT_REPORT_REQUEST: 'social/reports',
    POST_COMMENT: 'social/posts/{0}/comments/',
    REMOVE_MEMBER: 'social/members/{0}/',
    REMOVE_MEMBER_INVITATION: 'social/invitations/{0}/',
    VERIFY_MOAI_TOKEN: 'social/moais/verify/',
    CANCEL_PENDING_REQUEST: 'social/moais/request/cancel/',
    VERIFY_REGISTRATION_CODE: '/user/verify-registration-code',
    INVITATION: '/social/invitations/',
    ASSIGNMENT_STATS_REPORT: '/assignment/stats-report/?duration={0}',
    MOAI_MEMBERS: '/social/members/?is_own_moai={0}',
    UPDATE_INVITATION: '/social/invitations/{0}/',
    GET_POSTS: '/social/posts?is_own_moai={0}&page={1}&limit={2}',
    USER_MOAIS: '/social/moais/',
    LEAVE_MOAI: '/social/moais/{0}/leave/',
    SHARE_ACTIVITY: 'assignment/{0}/share',
    SHARE_ASSESSMENT: 'assessment/{0}/share',
    CHALLENGES_LEADERBOARD_SCORE: 'challenges/{0}/leaderboard-score',
    MOAI_LATEST_TVT: 'social/moais/latest-tvt?assessment_code={0}',
    MOAI_MEMBER_POINTS: 'social/moais/stats/{0}/{1}',
    DELETE_POST: 'social/posts/{0}/delete',
    DELETE_COMMENT: 'social/posts/{0}/comments/{1}/delete',
    UPDATE_PROFILE: 'profile/',
    UPDATE_USER_NAME: 'profile/update-name',
    REPORTED_MEMBER: '/social/reported-members/',
    REPORTED_MEMBER_POSTS: '/social/posts/{0}/reported',
    REPORTED_MEMBER_COMMENTS: '/social/comments/{0}/reported',
    JOIN_CHALLENGE: 'challenges/{0}/join',
    MY_CHALLENGE: 'challenges/',
    MY_REWARDS: '/challenges/rewards/?page={0}&limit={1}',
    GET_USER_AVAILABLE_REWARDS:
        '/challenges/available-rewards/?page={0}&limit={1}',
    LEADERBOARD_QUALIFYING: 'challenges/{0}/leaderboard-score',
    VERIFY_QR_CODE: 'assignment/challenges/{0}/activity/{1}/checkin',
    LEAVE_CHALLENGE: 'challenges/{0}/exit',
    SHARE_CHALLENGE_ACTIVITY: 'challenges/{0}/activity/{1}/share',
    REDEEM_REWARD: 'challenges/claim-reward/{0}/',
    GET_CITIES: 'cities',
    GET_INSTRUCTORS_BY_CITY: 'instructors?city={0}',
    GET_INSTRUCTOR_AVAILABILITY: 'instructors/{0}/availability',
    GET_INSTRUCTOR_PRICING: 'instructors/{0}/pricing',
    BOOK: 'bookings',
};

type API_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const signUp = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    programStartDate: Date,
    zipCode: number,
    termsChecked: boolean,
    organizationId: number,
    subOrganizationId?: number,
    verificationCode?: string,
    verificationMemberId?: string
) => {
    const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        program_start_date: COMMON.dateStr(programStartDate),
        zip_code: zipCode,
        is_agreement_accepted: termsChecked,
        organization_id: organizationId,
        sub_organization_id: subOrganizationId,
        verification_code: verificationCode,
        verification_member_id: verificationMemberId,
        platform: 'app'
    };

    return baseRequest(API_END_POINT.SIGN_UP, 'POST', payload);
};

export const verifyAccount = (token: string) => {
    return baseRequest(API_END_POINT.VERIFY_ACCOUNT_CONFIRM, 'POST', {
        token
    }).then((loginResponse) => {
        const authToken = loginResponse.auth_token;
        delete loginResponse.auth_token;

        return setAuthToken(authToken).then(() => loginResponse);
    });
};

export const login = (email: string, password: string) => {
    return baseRequest(API_END_POINT.LOGIN, 'POST', { email, password, platform: 'app' }).then(
        (loginResponse) => {
            const authToken = loginResponse.auth_token;
            delete loginResponse.auth_token;

            return setAuthToken(authToken).then(() => loginResponse);
        }
    );
};

export const logout = () => {
    return authorizedRequest(API_END_POINT.LOGOUT, 'POST');
};

export const getProfile = () => {
    return authorizedRequest(API_END_POINT.GET_PROFILE);
};

export const getLogGallery = (startDate: Date, endDate: Date) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.LOG_GALLERY,
            COMMON.dateStr(startDate),
            COMMON.dateStr(endDate)
        ),
        'GET'
    );
};

export const getActivities = (selectedLanguage: string) => {
    return authorizedRequest(
        API_END_POINT.GET_ASSIGNMENTS,
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getActivityWeekly = (
    startDate: Date,
    endDate: Date,
    selectedLanguage: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_ASSIGNMENT_WEEKLY,
            COMMON.dateStr(startDate),
            COMMON.dateStr(endDate)
        ),
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getActivityDaily = (date: Date, selectedLanguage: string) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_ASSIGNMENT_DAILY,
            COMMON.dateStr(date),
            COMMON.dateStr(date)
        ),
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getActivityStat = (startDate: Date, endDate: Date) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_ASSIGNMENT_STATS,
            COMMON.dateStr(startDate),
            COMMON.dateStr(endDate)
        ),
        'GET'
    );
};

export const getActivityIntro = (
    startDate: Date,
    endDate: Date,
    selectedLanguage: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_ASSIGNMENT_INTRO,
            COMMON.dateStr(startDate),
            COMMON.dateStr(endDate)
        ),
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getChallenges = () => {
    return authorizedRequest(API_END_POINT.GET_CHALLENGES);
};

export const getChallengeActivities = (challengeId: number, selectedLanguage?: string) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_CHALLENGES_ACTIVITIES,
            challengeId,
            moment().format('YYYY-MM-DD')
        ),
        'GET',
        undefined,
        undefined,
        selectedLanguage ? { lang: selectedLanguage } : undefined
    );
};

export const getLeaderboardScores = async (challengeId: number) => {
    return await authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.CHALLENGES_LEADERBOARD_SCORE,
            challengeId
        ),
        'GET'
    );
};

export const updateChallengesActivityStep = (
    challengeId: number,
    activityId: number,
    stepComplete: number,
    date: Date
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.UPDATE_CHALLENGE_STEP,
            challengeId,
            activityId
        ),
        'POST',
        {
            date: COMMON.dateStr(date),
            step_complete: stepComplete
        }
    );
};

export const logWeight = (
    date: Date,
    weight: number,
    unit: number,
    text: string,
    is_share: boolean,
    visibility_scope: VisibilityScope,
    challenge_id: number
) => {
    return authorizedRequest(API_END_POINT.LOG_WEIGHT, 'POST', {
        date: COMMON.dateStr(date),
        weight,
        unit,
        text,
        is_share,
        visibility_scope,
        challenge_id
    });
};

export const updateLogWeight = (
    date: Date,
    weight: number,
    unit: number,
    logId: number,
    text: string,
    isShare: boolean
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_LOG_WEIGHT, logId),
        'PUT',
        {
            date: COMMON.dateStr(date),
            weight,
            unit,
            text,
            is_share: isShare
        }
    );
};

export const deleteLogWeight = (logId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_LOG_WEIGHT, logId),
        'DELETE'
    );
};

export const getActivityDetails = (
    activityId: number,
    selectedLanguage: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.GET_ASSIGNMENT_DETAILS, activityId),
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getImageUploadCredentials = (publicImage: boolean) => {
    let apiPath = API_END_POINT.IMAGE_UPLOAD;
    if (publicImage) {
        apiPath = apiPath.concat('?public=1');
    }
    return authorizedRequest(apiPath);
};

export const logNote = (
    date: Date,
    text: string,
    is_share: boolean,
    visibility_scope: VisibilityScope,
    challenge_id: number
) => {
    return authorizedRequest(API_END_POINT.LOG_NOTE, 'POST', {
        date: COMMON.dateStr(date),
        text,
        is_share,
        visibility_scope,
        challenge_id
    });
};

export const updateLogNote = (
    date: Date,
    text: string,
    logId: number,
    isShare: boolean
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_LOG_NOTE, logId),
        'PUT',
        {
            date: COMMON.dateStr(date),
            text,
            is_share: isShare
        }
    );
};

export const deleteLogNote = (logId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_LOG_NOTE, logId),
        'DELETE'
    );
};

export const logImage = (
    date: Date,
    imagePath: string,
    text: string,
    isShare: boolean,
    visibilityScope: VisibilityScope,
    challengeId: number,
    activityId: number
) => {
    return authorizedRequest(API_END_POINT.LOG_IMAGE, 'POST', {
        date: COMMON.dateStr(date),
        image: imagePath,
        text,
        is_share: isShare,
        visibility_scope: visibilityScope,
        challenge_id: challengeId,
        activity_id: activityId
    });
};

export const deleteLogImage = (logId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_LOG_IMAGE, logId),
        'DELETE'
    );
};

export const setActivityStep = (
    step: number,
    date: Date,
    activityId: number
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.SET_ASSIGNMENT_STEP, activityId),
        'POST',
        {
            date: COMMON.dateStr(date),
            steps_complete: step
        }
    );
};

export const changePassword = (
    currentPassword: string,
    newPassword: string
) => {
    return authorizedRequest(API_END_POINT.CHANGE_PASSWORD, 'POST', {
        old_password: currentPassword,
        new_password: newPassword
    }).then((changePasswordResponse) => {
        const newToken = changePasswordResponse.new_token;
        delete changePasswordResponse.new_token;

        return setAuthToken(newToken).then(() => changePasswordResponse);
    });
};

export const deleteUser = (password: string) => {
    return authorizedRequest(API_END_POINT.DELETE_USER, 'POST', { password });
};

export const resetPassword = (email: string) => {
    return baseRequest(
        API_END_POINT.RESET_PASSWORD,
        'POST',
        {
            email
        },
        undefined,
        { platform: 'app' }
    );
};
export const resetPasswordVerify = (token: string) => {
    return baseRequest(API_END_POINT.RESET_PASSWORD_VERIFY, 'POST', {
        token
    });
};
export const resetPasswordConfirm = (password: string, token: string) => {
    return baseRequest(API_END_POINT.RESET_PASSWORD_CONFIRM, 'POST', {
        password,
        token
    });
};

export const startAssessment = (
    assessmentId: string,
    selectedLanguage: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.START_ASSESSMENT, assessmentId),
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const startGallupAssessment = (selectedLanguage: string) => {
    return authorizedRequest(
        API_END_POINT.START_GALLUP_ASSESSMENT,
        'GET',
        undefined,
        undefined,
        { lang: selectedLanguage }
    );
};

export const submitGallupAnswer = (
    sessionId: number,
    questionId: number | string,
    answerCode: number[] | string[] | null | number | string,
    selectedLanguage: string
) => {
    return authorizedRequest(
        API_END_POINT.SUBMIT_GALLUP_ANSWER,
        'POST',
        {
            session_id: sessionId,
            question_id: questionId,
            answer_code: answerCode
        },
        undefined,
        { lang: selectedLanguage }
    );
};

export const assessmentScores = (assessmentId: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.ASSESSMENT_SCORES, assessmentId),
        'GET'
    );
};

export const assessmentLatest = () => {
    return authorizedRequest(API_END_POINT.ASSESSMENT_LATEST, 'GET');
};

export const finishAssessment = (
    assessmentCode: string,
    responseIds: string,
    selectedLanguage: string,
    challengeId?: number,
    activityId?: number
) => {
    const payload: any = {
        assessment_name: assessmentCode,
        response_ids: responseIds,
        date: moment().format('YYYY-MM-DD'),
    };

    if (challengeId) {
        payload.challenge_id = challengeId;
    }

    if (activityId) {
        payload.activity_id = activityId;
    }

    return authorizedRequest(
        API_END_POINT.ASSESSMENT_FINISH,
        'POST',
        payload,
        undefined,
        { lang: selectedLanguage }
    );
};

export const finishDietIDAssessment = (
    assessmentCode: string,
    workflowID: number,
    selectedLanguage: string,
    challengeId?: number,
    activityId?: number
) => {
    const payload: any = {
        assessment_name: assessmentCode,
        workflowID,
        date: moment().format('YYYY-MM-DD')
    };

    if (challengeId) {
        payload.challenge_id = challengeId;
    }

    if (activityId) {
        payload.activity_id = activityId;
    }

    return authorizedRequest(
        API_END_POINT.ASSESSMENT_FINISH,
        'POST',
        payload,
        undefined,
        { lang: selectedLanguage }
    );
};

export const getClientConfig = async (platform: string, version: string) => {
    return await baseRequest(
        COMMON.stringFormat(API_END_POINT.GET_CLIENT_CONFIG, platform, version)
    );
};

export const verifyAccountRequest = async (unverifiedAuthToken: string) => {
    // for unverified accounts we have a special token to ue when communicating
    // with available endpoints
    const headers = {
        [AUTHORIZATION_HEADER_NAME]:
            constructAuthorizationHeaderValue(unverifiedAuthToken)
    };

    return baseRequest(
        API_END_POINT.VERIFY_ACCOUNT_EMAIL_REQUEST,
        'POST',
        {},
        headers,
        { platform: 'app' }
    );
};

export const updateSettings = (
    unit?: number,
    language?: LanguageFullCode,
    autoShareActivities?: boolean,
    autoSharePhotos?: boolean,
    autoShareJournals?: boolean,
    autoShareWeights?: boolean
) => {
    return authorizedRequest(API_END_POINT.UPDATE_SETTINGS, 'PUT', {
        unit,
        language,
        auto_share_activities: autoShareActivities,
        auto_share_photos: autoSharePhotos,
        auto_share_journals: autoShareJournals,
        auto_share_weight: autoShareWeights
    });
};

export const createSocialMoaiPost = async (
    moaiId: number | undefined,
    content: string | undefined,
    photo: string | null
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.CREATE_MOAI_POST, moaiId || ''),
        'POST',
        {
            content,
            photo
        }
    );
};

export const getSocialMoaiPosts = (
    moaiId: number,
    page: number,
    limit: number
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.GET_MOAI_POSTS, moaiId, page, limit),
        'GET'
    );
};

export const getSocialMoaiDetail = (moaiId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.MOAIS, moaiId),
        'GET'
    );
};

export const addPostReaction = (postId: number, type: string, name: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.POST_REACTION, postId),
        'POST',
        {
            type,
            name
        }
    );
};

export const addCommentReaction = (
    postId: number,
    commentId: number,
    name: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.COMMENT_REACTION, postId, commentId),
        'POST',
        {
            name
        }
    );
};

export const addComment = (postId: number, content: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.POST_COMMENT, postId),
        'POST',
        {
            content: content
        }
    );
};

export const socialMoaiMemberRequest = (
    moaiId: number | undefined,
    requestId: number,
    status: number
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.MOAI_MEMBER_REQUEST,
            moaiId || '',
            requestId
        ),
        'PATCH',
        {
            status: status
        }
    );
};

export const joinSocialMoai = (token: string) => {
    return authorizedRequest(API_END_POINT.JOIN_MOAI, 'POST', {
        token: token
    });
};

export const submitReport = (
    id: number,
    type: 'post' | 'comment' | 'member'
) => {
    return authorizedRequest(API_END_POINT.SUBMIT_REPORT_REQUEST, 'POST', {
        id,
        type
    });
};

export const verifyRegistrationCode = (code: string) => {
    return baseRequest(API_END_POINT.VERIFY_REGISTRATION_CODE, 'POST', {
        code
    });
};

export const sendInvitation = (email: string) => {
    return authorizedRequest(API_END_POINT.INVITATION, 'POST', {
        email
    });
};

export const getInvitations = () => {
    return authorizedRequest(API_END_POINT.INVITATION, 'GET');
};

export const updateInvitation = (invitation_id: number, status: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.UPDATE_INVITATION, invitation_id),
        'PATCH',
        {
            status
        }
    );
};

export const getPointsHistory = (duration: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.ASSIGNMENT_STATS_REPORT, duration),
        'GET'
    );
};

export const getMoaiMembers = (is_own_moai: string, challenge_id: number) => {
    let URL = COMMON.stringFormat(API_END_POINT.MOAI_MEMBERS, is_own_moai);
    if (challenge_id > -1) {
        URL = URL.concat(`&challenge_id=${challenge_id}`);
    }
    return authorizedRequest(URL, 'GET');
};

export const getSocialPosts = (
    is_own_moai: boolean,
    page: number,
    limit: number,
    challenge_id: number,
    user_id?: number
) => {
    let URL = COMMON.stringFormat(
        API_END_POINT.GET_POSTS,
        String(is_own_moai),
        page,
        limit
    );
    if (Number(user_id) > -1) {
        URL = URL.concat(`&user_id=${user_id}`);
    }
    if (challenge_id > -1) {
        URL = URL.concat(`&challenge_id=${challenge_id}`);
    }
    return authorizedRequest(URL, 'GET');
};

export const getUserMoais = () => {
    return authorizedRequest(API_END_POINT.USER_MOAIS, 'GET');
};

export const leaveMoai = (id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.LEAVE_MOAI, id),
        'DELETE'
    );
};

export const shareActivity = (id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.SHARE_ACTIVITY, id),
        'POST'
    );
};

export const shareAssessment = (assessment_code: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.SHARE_ASSESSMENT, assessment_code),
        'POST'
    );
};

export const removeMember = (memberId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.REMOVE_MEMBER, memberId),
        'DELETE'
    );
};

export const removeMemberInvitation = (invitationId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.REMOVE_MEMBER_INVITATION,
            invitationId
        ),
        'DELETE'
    );
};

export const moaiLatestTvt = (assessmentCode: string) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.MOAI_LATEST_TVT, assessmentCode),
        'GET'
    );
};

export const moaiMemberPoints = (start_date: string, end_date: string, challenge_id?: number) => {
    const params = challenge_id && challenge_id > -1 ? { challenge_id: challenge_id.toString() } : undefined;
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.MOAI_MEMBER_POINTS,
            start_date,
            end_date
        ),
        'GET',
        undefined,
        undefined,
        params
    );
};
export const deletePost = (post_id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.DELETE_POST, post_id),
        'DELETE'
    );
};

export const deleteComment = (post_id: number, comment_id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.DELETE_COMMENT, post_id, comment_id),
        'DELETE'
    );
};

export const updateProfile = async (image: string | null) => {
    return await authorizedRequest(API_END_POINT.UPDATE_PROFILE, 'PUT', {
        image
    });
};

export const getActivityMembers = (startDate: Date, endDate: Date) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_ASSIGNMENT_MEMBERS,
            COMMON.dateStr(startDate),
            COMMON.dateStr(endDate)
        ),
        'GET'
    );
};

export const updateUserName = (first_name: string, last_name: string) => {
    return authorizedRequest(API_END_POINT.UPDATE_USER_NAME, 'PATCH', {
        first_name,
        last_name
    });
};

export const getReportedMember = () => {
    return authorizedRequest(API_END_POINT.REPORTED_MEMBER, 'GET');
};

export const getReportedMemberPosts = (user_id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.REPORTED_MEMBER_POSTS, user_id),
        'GET'
    );
};

export const getReportedMemberComments = (user_id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.REPORTED_MEMBER_COMMENTS, user_id),
        'GET'
    );
};

export const joinChallenge = (sponsorChallengeId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.JOIN_CHALLENGE, sponsorChallengeId),
        'POST'
    );
};

export const getMyChallenges = () => {
    return authorizedRequest(API_END_POINT.MY_CHALLENGE);
};

export const getMyRewards = (page: number = 1, limit: number = 10) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.MY_REWARDS, page, limit)
    );
};

export const getAvailableRewards = (page: number, limit: number) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.GET_USER_AVAILABLE_REWARDS,
            page,
            limit
        )
    );
};

export const getLeaderboardQualifying = (challengeId: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.LEADERBOARD_QUALIFYING, challengeId),
        'GET'
    );
};

export const verifyActivityQrCode = (
    challengeId: number,
    activityId: number,
    qrCode: string
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.VERIFY_QR_CODE,
            challengeId,
            activityId
        ),
        'POST',
        {
            qr_code: qrCode,
            date: moment().format('YYYY-MM-DD'),
        }
    );
};

export const leaveChallenge = (id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.LEAVE_CHALLENGE, id),
        'POST'
    );
};

export const shareChallengeActivity = (
    challenge_id: number,
    activity_id: number
) => {
    return authorizedRequest(
        COMMON.stringFormat(
            API_END_POINT.SHARE_CHALLENGE_ACTIVITY,
            challenge_id,
            activity_id
        ),
        'POST'
    );
};

export const redeemReward = (id: number) => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.REDEEM_REWARD, id)
    );
};

export const getCities = () => {
    return baseRequest(API_END_POINT.GET_CITIES);
};

export const getInstructorsByCity = (city: string) : Promise<Instructor> => {
    return authorizedRequest(
        COMMON.stringFormat(API_END_POINT.GET_INSTRUCTORS_BY_CITY, city)
    );
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
        .then((response) => response.data.data)
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
        'Content-type': 'application/json'
    }
});
