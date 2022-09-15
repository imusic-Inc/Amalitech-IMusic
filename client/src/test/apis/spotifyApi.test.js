import APIController from "../../api/spotifyApi";

it('Get token from spotify', async () => {
    const token = await APIController.getToken();
    expect(token.length).toEqual(115);
});

it('Get spotify Genres', async () => {
    const token = await APIController.getToken();
    const getGenres = await APIController.getGenres(token);
    expect(getGenres);
});

it('Get spotify Genres playlist', async () => {
    const token = await APIController.getToken();
    const getPlaylistByGenre = await APIController.getPlaylistByGenre(token, '0JQ5DAqbMKFAQy4HL4XU2D', 10);
    expect(getPlaylistByGenre);
});

it('Get spotify playlist', async () => {
    const token = await APIController.getToken();
    const getPlayList = await APIController.getPlayList(token, '37i9dQZF1DX8tCg29z8GX8');
    expect(getPlayList);
});

it('Get spotify search', async () => {
    const token = await APIController.getToken();
    const genres = await APIController.getSearch(token, 'hello');
    expect(genres);
});