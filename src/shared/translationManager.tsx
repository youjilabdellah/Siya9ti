import React, { FunctionComponent, useState } from 'react';

import { TranslationProvider } from '../context/translation';
import { TranslationLanguage } from '../types/translation';
import { LANGUAGE_FRENSH } from '../utils/constants';

type Props = {
    children?: React.ReactNode;
};

const TranslationManager: FunctionComponent<Props> = ({ children }: Props) => {
    const [selectedLanguage, setSelectedLanguage] =
        useState<TranslationLanguage>(LANGUAGE_FRENSH);

    return (
        <TranslationProvider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </TranslationProvider>
    );
};

export default TranslationManager;
