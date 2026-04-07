export enum ReactionType {
    Fire = 'fire',
    Hundred = 'hundred',
    HeartEyes = 'heart-eyes',
    Screaming = 'screaming',
    TearsOfJoy = 'tear-of-joy'
}

export type CommentType = {
    id: number;
    userImage: string;
    name: string;
    username: string;
    content: string;
    created_date: string;
    is_reported: boolean;
    emoji: string | null;
    report_count?: number;
    is_member: boolean;
    reactions: { [key: string]: number };
    post_id?: number;
};

export type Post = {
    id: number;
    created_date: string;
    content: string;
    image: string;
    is_reported: boolean;
    emoji: string | null;
    post_type: 'image' | 'note' | 'weight' | 'assessment' | 'assignment';
    created_by: {
        username: string;
        first_name: string;
        last_name: string;
        image: string;
    };
    reactions: { [key: string]: number };
    report_count?: number;
    comments: CommentType[];
    is_member?: boolean;
    is_system_generated?: boolean;
    user_note: {
        id: number;
        text: string;
    } | null;
    user_weight: {
        id: number;
        weight: number;
        unit: string;
        text: string;
    } | null;
    user_image: {
        id: number;
        image: string;
        text: string;
    } | null;
    user_assignment: {
        id: number;
        title: string;
        points: number;
        steps_complete: number;
        type: '1' | '2' | '3';
    };
    user_assessment: {
        id: number;
        assessment: string;
        score: number;
    };
};

export type PostType = {
    count: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPageNumber: number | null;
    list: Post[];
};
