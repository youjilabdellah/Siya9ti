export const isActiveChallenge = (activeToDate: string | undefined): boolean => {
    if (!activeToDate) {
        return true;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const expiryDate = new Date(activeToDate);
    expiryDate.setHours(23, 59, 59, 999);

    return expiryDate >= currentDate;
};

export const filterActiveChallenges = <T extends { active_to?: string }>(
    challenges: T[]
): T[] => {
    return challenges.filter(challenge => isActiveChallenge(challenge.active_to));
};
