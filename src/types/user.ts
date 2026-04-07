import { COMMON } from '@/utils/common';

export type UserInfo = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type UserSetting = {
    unit: number;
    language: string;
    availableAssessments: Array<string>;
    autoShareActivities: boolean;
    autoSharePhotos: boolean;
    autoShareJournals: boolean;
    autoShareWeights: boolean;
};

export type Moai = {
    id: number;
    tokens: number;
};

export type UserProfile = {
    programStartDate: string;
    zipCode: string;
    organizationName: string;
    categoryLabel: string;
    image: string | null;
    moai: Moai;
    moaiId: number;
    subOrganizationName: string | null;
    blueShieldMemberId: string;
    settings: UserSetting;
    isRegistrationCodeExpired: boolean;
    registrationStartDate: Date;
    registrationCode: string;
};

export type SubOrganizationType = {
    id: number;
    name: string;
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserInfo = (apiUserInfo: any): UserInfo | undefined => {
    // translate object received via api with snake-case properties to an
    // Activity with camelCase properties
    const { username, first_name, last_name, email } = apiUserInfo;

    if ([username, email].includes(undefined)) {
        return undefined;
    }

    return {
        username: username!,
        firstName: first_name,
        lastName: last_name,
        email: email!
    };
};

// argument is of type `any` since we don't know for sure that it conforms to
// to structure yet, which this function will validate
export const translateUserProfile = (
    apiUserProfile: any
): UserProfile | undefined => {
    // translate object received via api with snake-case properties to an
    // Activity with camelCase properties
    const {
        program_start_date,
        zip_code,
        organization_name,
        category_label,
        image,
        moai,
        moai_id,
        settings,
        is_registration_code_expired,
        sub_organization_name,
        blue_shield_member_id,
        registration_start_date,
        registration_code
    } = apiUserProfile;

    if ([program_start_date, zip_code].includes(undefined)) {
        return undefined;
    }

    let loadedProgramStartDate;

    try {
        loadedProgramStartDate = COMMON.dateStr(program_start_date);
    } catch {
        return undefined;
    }

    return {
        programStartDate: loadedProgramStartDate,
        zipCode: zip_code,
        organizationName: organization_name,
        categoryLabel: category_label,
        image: image,
        moai: moai,
        moaiId: moai_id,
        blueShieldMemberId: blue_shield_member_id,
        settings: {
            unit: settings.unit,
            language: settings.language,
            availableAssessments: settings.available_assessments,
            autoShareActivities: settings.auto_share_activities,
            autoSharePhotos: settings.auto_share_photos,
            autoShareJournals: settings.auto_share_journals,
            autoShareWeights: settings.auto_share_weight
        },
        isRegistrationCodeExpired: is_registration_code_expired,
        subOrganizationName: sub_organization_name,
        registrationStartDate: registration_start_date,
        registrationCode: registration_code
    };
};
