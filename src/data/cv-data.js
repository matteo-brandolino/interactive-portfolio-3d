
import { cvDataIT } from './cv-data-it.js'
import { cvDataEN } from './cv-data-en.js'
import { i18n } from './i18n.js'

export function getCVData(section) {
    const lang = i18n.getCurrentLanguage()

    if (lang === 'en') {
        return cvDataEN[section]
    }

    return cvDataIT[section]
}


export const cvData = cvDataIT
