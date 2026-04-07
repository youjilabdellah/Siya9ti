import React from 'react';
import { ImageSourcePropType } from 'react-native';

export type Emoji = {
    id: number;
    name: string;
    displayName: string;
    emoji: ImageSourcePropType;
    defaultColor: string;
    shortCode?: string;
};

export type EmojiSvg = {
    id: number;
    name: string;
    displayName: string;
    emoji: ({ color }: { color: string }) => React.JSX.Element;
    color: string;
    defaultColor: string;
};
