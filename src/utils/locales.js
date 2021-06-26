import { derived, writable } from "svelte/store";
import EN from '../../static/locales/en.json';

// This will be our merge dictionary
let merge_dico = { 'en' : EN };
// All the locales we support in our app
export const AVAILABLE_LOCALES = ['en', 'fr'];
// Make a promise array of all the import of locales
const prom_locales = AVAILABLE_LOCALES.map(locale => import(`../../static/locales/${locale}.json`));
// For each locale file import => store it in the dico object
Promise.all(prom_locales).then(locales => locales.forEach((locale, pos) => merge_dico[AVAILABLE_LOCALES[pos]] = locale.default));

// Default locales set to the first one from all the support locales
const DEFAULT_LANGUAGE = AVAILABLE_LOCALES[0];
// Create a store which store the current locales
export const locale = writable(DEFAULT_LANGUAGE);
// Derived store which update every time we change the locales
export const lg_dico = derived(locale, $locale => merge_dico[$locale])

// Utils Function

/**
 * Change the locale in the store ONLY if the curr_locale params is an avaible locale
 * 
 * @param {String} curr_locale the locale give to update the store
 * @throws {Error} Throws an Error if the locale provide is not available
 */
export const changeLocale = (curr_locale) => {
    if (!AVAILABLE_LOCALES.includes(curr_locale.toLocaleLowerCase())) throw new Error("Invalid locale provide!");
    // Use the set method to change the current locale in store
    locale.set(curr_locale.toLocaleLowerCase());
}