import frData from '@/assets/lang/fr-fr.json';

export type LanguageTranslationData = typeof frData;

export type LanguageShortCode = 'fr' | 'ar';

export type LanguageFullCode = 'fr-fr' | 'ar-SA';

export type TranslationLanguage = {
    shortCode: LanguageShortCode;
    fullCode: LanguageFullCode;
    title: string;
};
