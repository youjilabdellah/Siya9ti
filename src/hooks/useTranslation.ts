import { useContext, useMemo } from 'react';

import frData from '../assets/lang/fr-fr.json';
import arData from '../assets/lang/ar-sa.json';
import { TranslationContext } from '../context/translation';
import { LanguageTranslationData } from '../types/translation';

const useTranslation = () => {
    const { selectedLanguage } = useContext(TranslationContext);

    const langData: LanguageTranslationData = useMemo(() => {
        if (selectedLanguage.shortCode === 'ar') {
            return { ...arData, ...frData };
        } else {
            return { ...frData };
        }
    }, [selectedLanguage]);

    return {
        t: langData,
        language: selectedLanguage,
    };
};

export default useTranslation;
