import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);

    };

    const languages = [
        { code: 'fr', label: 'Français | French' },
        { code: 'en', label: 'English | Anglais' }
    ];

    return (
        <div>
            {languages.filter(lang => lang.code !== currentLanguage).map(lang => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)}>
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
export default LanguageSwitcher;