export type AssessmentUrl = {
    assessmentUrl: string;
};

export type AssessmentScores = {
    date: Date;
    score: number;
};

export type AssessmentLatest = {
    date: string;
    score: number;
    assessment_name: string;
    assessment_max: number;
};

export type QuestionChoice = {
    answer_code: number;
    text?: string;
};

export type AssessmentQuestion = {
    id: number;
    questionId: number | string;
    title?: string;
    order?: number;
    choices?: {
        id: number;
        label: string;
    }[];
    min: number;
    max: number;
    type:
        | 'radio'
        | 'input'
        | 'weight'
        | 'select'
        | 'checkbox'
        | 'radio_chart'
        | 'interstitial'
        | 'NumberInput';
    answerCode?: number[] | string[] | null;
};

export type GallupAssessment = {
    sessionId: number;
    requestId: string;
    version: string;
    progress: {
        current: number;
        total: number;
    };
    resumedAssessment: boolean;
};

export type GallupAssessmentScore = {
    score: number | null;
    details: {
        financial: number | null;
        community: number | null;
        physical: number | null;
        social: number | null;
        career: number | null;
    };
};

export enum AssessmentCode {
    TrueVitality = 'vitality',
    DietId = 'dietid',
    TrueHappiness = 'happiness',
    PurposeCheckup = 'purpose',
    CantrilLadder = 'ladder',
    R2cImp = 'r2c_importance',
    R2cConf = 'r2c_confidence',
    Gallup = 'gallup'
}

export const translateGallupAssessment = (
    apiGallupAssessmentInfo: any
): GallupAssessment => {
    // translate object received via api with snake-case properties to an
    // Gallup with camelCase properties
    const { session_id, request_id, version, progress, resumed_assessment } =
        apiGallupAssessmentInfo;

    return {
        sessionId: session_id,
        requestId: request_id,
        version: version,
        progress: {
            current: progress?.current,
            total: progress?.total
        },
        resumedAssessment: resumed_assessment
    };
};

export const translateAssessmentQuestion = (
    questionInfo: any
): AssessmentQuestion => {
    // translate object received via api with snake-case properties to an
    // Gallup with camelCase properties
    const {
        id,
        question_id,
        text,
        answers,
        order,
        type,
        min_value,
        max_value
    } = questionInfo;

    return {
        id,
        questionId: question_id,
        title: text,
        order,
        choices: answers.map(
            ({ answer_code, text: choiceText }: QuestionChoice) => ({
                id: answer_code,
                label: choiceText
            })
        ),
        type,
        answerCode: null,
        min: Number(min_value),
        max: Number(max_value) < 1 ? 99999 : Number(max_value)
    };
};
