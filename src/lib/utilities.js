/* Export Constants */
export const idParamName = "id";
export const questionMarkSprite = "https://www.pokepedia.fr/images/f/f7/Sprite_%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F_RS.png";

/**
 * The function capitalizes the first letter of a given string.
 * 
 * @param {string} string - The parameter "string" is a string value that represents the input string that needs
 * to be capitalized. The function "capitalize" takes this string as input and returns a new string
 * with the first letter capitalized.
 * 
 * @returns {string} The function `capitalize` is returning a string with the first letter capitalized and the
 * rest of the string unchanged.
 */
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This function retrieves a specific parameter value from the URL query string in JavaScript.
 * 
 * @param {string} param - The parameter `param` is a string representing the name of the query parameter that
 * you want to retrieve from the current URL.
 * 
 * @returns {string} The function `getParamWithURL` returns the value of the specified parameter in the URL
 * query string. If the parameter is not found, it returns `null`.
 */
export function getParamWithURL(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}
