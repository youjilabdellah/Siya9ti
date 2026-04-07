import enData from '@/assets/lang/en-us.json';

export type LanguageTranslationData = typeof enData;

export type LanguageShortCode = 'en' | 'es';

export type LanguageFullCode = 'en-us' | 'es-419';

export type TranslationLanguage = {
    shortCode: LanguageShortCode;
    fullCode: LanguageFullCode;
    title: string;
};
