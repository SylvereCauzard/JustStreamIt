export async function getData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            "Une erreur est survenue lors de la requète. Code erreur: " +
            response.status
        );
    }
    const jsonData = await response.json();
    console.log("Fin getData");
    return jsonData
}

export async function getMovies(url, moviesNumber = 7) {
    const jsonData = await getData(url + `&page_size=${moviesNumber}`);
    console.log("Fin getMovies");
    return jsonData.results;
}