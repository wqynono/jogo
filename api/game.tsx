export function getSearchGames(queryValue: string) {
    return fetch(`https://api.pokiter.com/prod-api/gameSource/page?size=200&type=1&current=1&name=${queryValue}`)
        .then((res) => res.json())
        .then((data) => {
            return data.data.records;
        });
}