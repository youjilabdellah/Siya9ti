import { createContext } from 'react';

import { TranslationLanguage } from '../types/translation';
import { LANGUAGE_FRENSH } from '../utils/constants';

const TranslationContext = createContext<{
    selectedLanguage: TranslationLanguage;
    setSelectedLanguage?: React.Dispatch<React.SetStateAction<TranslationLanguage>>;
}>({ selectedLanguage: LANGUAGE_FRENSH });

const TranslationProvider = TranslationContext.Provider;

export { TranslationContext, TranslationProvider };
