/* Export Constants */
export const idParamName = 'id';
export const questionMarkSprite = 'https://www.pokepedia.fr/images/f/f7/Sprite_%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F_RS.png';

export function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * The function capitalizes the first letter of a given string.
 *
 * @param {string} string - The parameter "string" is a string value that represents the input
 * string that needs to be capitalized. The function "capitalize" takes this string as input
 * and returns a new string with the first letter capitalized.
 *
 * @returns {string} The function `capitalize` is returning a string with the first
 * letter capitalized and the rest of the string unchanged.
 */
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This function retrieves a specific parameter value from the URL query string in JavaScript.
 *
 * @param {string} param - The parameter `param` is a string representing the name of the
 * query parameter that you want to retrieve from the current URL.
 *
 * @returns {string} The function `getParamWithURL` returns the value of the specified
 * parameter in the URL query string. If the parameter is not found, it returns `null`.
 */
export function getParamWithURL(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function hasParamWithURL(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.has(param);
}

export function setParamWithURL(param, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(param, value);

    const refresh = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: refresh }, '', refresh);
}

export function deleteParamWithURL(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.delete(param);

    const refresh = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: refresh }, '', refresh);
}

export function sortParamWithURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.sort();

    const refresh = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: refresh }, '', refresh);
}

/**
 *
 * @param pokeballLoader
 */
export function hideLoader(pokeballLoader) {
    if (pokeballLoader.classList.contains('hidden-loader')) {
        pokeballLoader.classList.remove('hidden-loader');
    }
    pokeballLoader.classList.add('hidden-loader');
}

export function levenstein(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
}
