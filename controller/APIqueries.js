

module.exports = {
    getRecShowsWeekly: "https://api.trakt.tv/shows/recommended/period?period=weekly",
    getRecShowsYearly: "https://api.trakt.tv/shows/recommended/period?period=yearly",
}

// (async () => {
//     const response = await axios.get('', {
//         headers: {
//             'Authorization': `Bearer ${credentials.accessToken}`,
//             'Content-type': 'application/json',
//             'trakt-api-version': '2',
//             'trakt-api-key': credentials.clientId
//         }
//     });
//     module.exports = {response}
// })();
