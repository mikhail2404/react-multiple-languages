import {useTranslation} from "react-i18next";
import {Stack, Box, CssBaseline, Typography, MenuItem, TextField, FormControl, InputLabel, Select} from "@mui/material";
import {useEffect, useState} from "react";
import 'flag-icon-css/css/flag-icons.css'
import i18next from "i18next";
import jsCookie from "js-cookie";


const languages = [
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    },
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },   {
        code: 'ar',
        name: 'العربية',
        country_code: 'sa',
        dir: "rtl"
    },

]
function App() {
    const currentLanguageCode = jsCookie.get("i18next") || "en"
    const currentLanguage = languages.find(language => language.code === currentLanguageCode)

    const [language, setLanguage] = useState(currentLanguage)
    const {t} = useTranslation();
    const releaseDate = new Date('2021-03-07')
    const timeDifference = new Date() - releaseDate
    const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    useEffect(() => {
        document.title = t('app_title')
        document.body.dir = currentLanguage.dir || "lrt"
    }, [language, t])
    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value)
        i18next.changeLanguage(event.target.value.code)
    }
    return (
        <>
            <CssBaseline/>
            <Stack sx={{alignItems: "center"}} p={"3rem"} direction="row">
                <Stack sx={{flex: 1}}>
                    <Typography  variant="h5">{t('welcome_message')}
                    </Typography>
                    <Typography variant="body1">{t('days_since_release', {number_of_days, name: "Mikhail"})}</Typography>
                </Stack>
                <FormControl sx={{width: "10rem"}}>
                    <InputLabel id="select-language">Language</InputLabel>
                    <Select
                        labelId="select-language"
                        id="language"
                        value={language}
                        label="Age"
                        onChange={handleChangeLanguage}
                    >
                        {languages.map(language => (
                            <MenuItem  key={language.country_code} value={language}>
                                <span className={`flag-icon flag-icon-${language.country_code}`}/>
                                {language.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </>
    );
}

export default App;
