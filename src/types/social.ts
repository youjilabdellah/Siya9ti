import { Post, CommentType } from '@/types/post';

export type Member = {
    id?: number;
    status?: number;
    moai_id?: number;
    first_name: string;
    last_name: string;
    username?: string;
    email?: string;
    image?: string;
};

export type Moai = {
    id: number;
    name: string;
    description: string;
    is_moai_admin: boolean;
    image: string;
    members: Member[];
    invite_link: string;
};

export type Invitation = {
    id: number;
    token: string;
    requested_by: string;
};

export type ReportType =
    | {
          id: number;
          type: 'post';
          date: string;
          content: Post;
      }
    | {
          id: number;
          type: 'member';
          date: string;
          content: Member;
      }
    | {
          id: number;
          type: 'comment';
          date: string;
          content: CommentType;
      };

export type UserMoai = {
    moai_id: number;
    created_by: string;
    total_members: number;
    members: Member[];
};

export type MemberTvtScore = {
    first_name: string;
    last_name: string;
    score: number | null;
    image: string | null;
    assessment_date: string | null;
};

export type MemberPoint = {
    first_name: string;
    last_name: string;
    total_points: number | null;
    member_id: number;
    image?: string | null;
};
