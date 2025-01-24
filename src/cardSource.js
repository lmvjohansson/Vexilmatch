/*File containing functions for retrieving information from API
*
* Expected inputs are the game categories the player can choose from.
*
* Expected return is a promise containing each country of the category as an object with fields
* flag contains link to country flag as svg format picture and name that contains the country name as a string*/

export function retrieveCountries(category){
    function gotResponseACB(response){
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    }
    function returnResultsACB(param){
        return param.map(extractCountryDataCB);
    }
    function extractCountryDataCB(country){
        return ({
            flag: country.flags.svg,
            name: country.name.common
        });
    }

    const regionUrl = "https://restcountries.com/v3.1/region/";
    const worldUrl = "https://restcountries.com/v3.1/all";
    const fields = "?fields=name,flags";

    switch(category) {
        case 'Africa':
        case 'Americas':
        case 'Europe':
        case 'Asia':
        case 'Oceania':
            return fetch(regionUrl + category + fields).then(gotResponseACB).then(returnResultsACB).catch(error => {
                throw new Error(`Failed to fetch countries: ${error.message}`)});
        case 'World':
            return fetch(worldUrl + fields).then(gotResponseACB).then(returnResultsACB).catch(error => {
                throw new Error(`Failed to fetch countries: ${error.message}`)});
        default:
            throw new Error(category + ' is not a valid category');
    }
}