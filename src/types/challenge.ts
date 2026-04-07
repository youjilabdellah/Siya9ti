export type Challenge = {
    id: number;
    sponsor_challenge_id: number;
    display_name: string;
    tagline: string;
    description: string;
    image: string;
    active_from: string;
    active_to: string;
    participant_cap: number;
    status: string;
};

export interface Participant {
    id: number;
    firstname: string;
    lastname: string;
    image: string | null;
}

export interface MyChallenge {
    id: number;
    sponsor_challenge_id: number;
    display_name: string;
    tagline: string;
    description: string;
    image: string | null;
    join_at: string;
    active_to: string;
    type: LeaderboardType;
    participants: Participant[];
    qualification_points: number;
    total_points: number;
    reward_positions: number;
    total_participants: number | null;
    position: number | null;
    status: string;
}

export interface RewardResponse {
    id: number;
    challenge_id: number;
    challenge_name: string;
    reward_type: string;
    reward_amount: number;
    position: number;
    awarded_at: string;
    is_redeemed: boolean;
    points_earned: number;
    challenge_image: string;
    expiry_date: string;
    total_points: number;
    qualification_points: number;
    participants: Participant[];
    challenge_type: LeaderboardType;
    amount: number;
    promo_code?: string;
    store_url?: string;
    image?: string;
}

export interface Reward {
    id: number;
    challengeId: number;
    challengeName: string;
    rewardType: string;
    rewardAmount: number;
    position: number;
    awardedAt: string;
    isRedeemed: boolean;
    pointsEarned: number;
    challengeImage: string;
    expireDate: string;
    participants: Participant[];
    challengeType: LeaderboardType;
    qualificationPoints: number;
    totalPoints: number;
    amount: number;
    promoCode?: string;
    storeUrl?: string;
    image?: string;
}

export interface RewardsResponse {
    count: number;
    has_next: boolean;
    has_previous: boolean;
    next_page_number: number | null;
    list: RewardResponse[];
}

export interface Rewards {
    count: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPageNumber: number | null;
    list: Reward[];
}

export interface LeaderboardParticipant {
    firstname: string;
    lastname: string;
    image: string;
    total_points: number;
}

export interface LeaderboardScoreResponse {
    type: string;
    qualification_points: number;
    total_points: number;
    reward_positions: number;
    participants: LeaderboardParticipant[];
}
export interface LeaderboardScore {
    type: string;
    qualificationPoints: number;
    totalPoints: number;
    rewardPositions: number;
    participants: LeaderboardParticipant[];
}

export interface AvailableReward {
    id: number;
    challenge_display_title: string;
    tagline: string;
    name: string;
    amount: number;
    image: string | null;
    expiry_date: string;
    total_points: string;
    qualification_points: string;
    challenge_type: 'individual_qualifier' | 'individual_leaderboard';
    participants: Participant[];
}

export interface AvailableRewardsResponse {
    count: number;
    has_next: boolean;
    has_previous: boolean;
    next_page_number: number | null;
    list: AvailableReward[];
}

export interface AvailableRewards {
    count: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPageNumber: number | null;
    list: AvailableReward[];
}
export interface LeaderboardParticipant extends Participant {
    total_points: number;
}

export type LeaderboardType =
    | 'individual_leaderboard'
    | 'individual_qualifier'
    | 'team_qualifier'
    | 'team_leaderboard';

export interface Leaderboard {
    type: LeaderboardType;
    qualificationPoints: number;
    totalPoints: number;
    rewardPositions: number;
    participants: Participant[];
}

export const translateLeaderboard = (apiResponse: any): Leaderboard => {
    // translate object received via api with snake-case properties to an
    // Activity with camelCase properties
    const {
        type,
        qualification_points,
        total_points,
        reward_positions,
        participants
    } = apiResponse;

    return {
        type,
        qualificationPoints: qualification_points,
        totalPoints: total_points,
        rewardPositions: reward_positions,
        participants: participants
    };
};

export const translateChallengeReward = (
    apiResponse: RewardResponse
): Reward => {
    // translate object received via api with snake-case properties to an
    // object with camelCase properties
    const {
        id,
        challenge_id,
        challenge_name,
        reward_type,
        reward_amount,
        position,
        awarded_at,
        is_redeemed,
        points_earned,
        challenge_image,
        amount,
        expiry_date,
        total_points,
        qualification_points,
        participants,
        challenge_type,
        promo_code,
        store_url,
        image
    } = apiResponse;

    return {
        id,
        challengeId: challenge_id,
        challengeName: challenge_name,
        rewardType: reward_type,
        rewardAmount: reward_amount,
        position: position,
        awardedAt: awarded_at,
        isRedeemed: is_redeemed,
        pointsEarned: points_earned,
        challengeImage: challenge_image,
        expireDate: expiry_date,
        challengeType: challenge_type,
        participants,
        qualificationPoints: qualification_points,
        totalPoints: total_points,
        amount,
        promoCode: promo_code,
        storeUrl: store_url,
        image
    };
};

export const translateChallengeRewards = (
    apiResponse: RewardsResponse
): Rewards => {
    // translate object received via api with snake-case properties to an
    // object with camelCase properties
    const { count, has_next, has_previous, next_page_number, list } =
        apiResponse;

    return {
        count,
        hasNext: has_next,
        hasPrevious: has_previous,
        nextPageNumber: next_page_number,
        list: list.map(translateChallengeReward)
    };
};
