import {
    HappyIcon,
    HeartIcon,
    HandIcon,
    NewChatIcon,
    FlagIconSvg,
    LikeIcon
} from '@/assets/svg';
import { Emoji, EmojiSvg } from '@/types/emoji';

export const emojisLogNote: EmojiSvg[] = [
    {
        id: 1,
        name: 'happy',
        displayName: 'Happy',
        emoji: HappyIcon,
        color: '#F1B85B',
        defaultColor: '#BCBCBC'
    },
    {
        id: 2,
        name: 'heart',
        displayName: 'Heart',
        emoji: HeartIcon,
        color: '#F57A59',
        defaultColor: '#BCBCBC'
    },
    {
        id: 3,
        name: 'hand',
        displayName: 'Hand',
        emoji: HandIcon,
        color: '#F1B85B',
        defaultColor: '#BCBCBC'
    },
    {
        id: 4,
        name: 'comment',
        displayName: 'Comment',
        emoji: NewChatIcon,
        color: '#F1B85B',
        defaultColor: '#BCBCBC'
    },
    {
        id: 4,
        name: 'flag',
        displayName: 'Report',
        emoji: FlagIconSvg,
        color: '#F1B85B',
        defaultColor: '#BCBCBC'
    }
];

const emojis: EmojiSvg[] = [
    {
        id: 1,
        name: 'like',
        displayName: 'Like',
        emoji: LikeIcon,
        color: '#F1B85B',
        defaultColor: '#BCBCBC'
    },
    {
        id: 4,
        name: 'comment',
        displayName: 'Comment',
        emoji: NewChatIcon,
        color: '#62B1E3',
        defaultColor: '#BCBCBC'
    },
    {
        id: 5,
        name: 'flag',
        displayName: 'Report',
        emoji: FlagIconSvg,
        color: '#F57A59',
        defaultColor: '#BCBCBC'
    }
];

export const popupEmojis: Emoji[] = [
    {
        id: 1,
        name: 'thumbs-up',
        displayName: 'Like',
        emoji: require('@/assets/png/thumbs-up.png'),
        defaultColor: '#BCBCBC',
        shortCode: '👍'
    },
    {
        id: 2,
        name: 'slightly-smiling-face',
        displayName: 'Happy',
        emoji: require('@/assets/png/slightly-smiling-face.png'),
        defaultColor: '#BCBCBC',
        shortCode: '🙂'
    },
    {
        id: 3,
        name: 'heart-eyes',
        displayName: 'HeartEyes',
        emoji: require('@/assets/png/heart-eyes-emoji.png'),
        defaultColor: '#BCBCBC',
        shortCode: '😍'
    },
    {
        id: 4,
        name: 'fire',
        displayName: 'Fire',
        emoji: require('@/assets/png/fire-emoji.png'),
        defaultColor: '#BCBCBC',
        shortCode: '🔥'
    },
    {
        id: 5,
        name: 'hundred',
        displayName: 'Hundred',
        emoji: require('@/assets/png/hundred-emoji.png'),
        defaultColor: '#BCBCBC',
        shortCode: '💯'
    },
    {
        id: 6,
        name: 'screaming',
        displayName: 'Screaming',
        emoji: require('@/assets/png/screaming-emoji.png'),
        defaultColor: '#BCBCBC',
        shortCode: '😱'
    }
];

export default emojis;
