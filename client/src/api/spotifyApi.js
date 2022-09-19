import keys from "./keys";

const APIController = (function() {
    
    const clientId = keys.Client_ID;
    const clientSecret = keys.Client_Secret;

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }
    
    const _getGenre = async (token, genreId) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId, limit) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {
        const path = `https://api.spotify.com/v1/playlists/${tracksEndPoint}`
        const result = await fetch(path, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }
          
    const _getPlayList = async (token, tracksEndPoint) => {
        const path = `https://api.spotify.com/v1/playlists/${tracksEndPoint}/tracks?offset=0&limit=50&locale=en-US,en;q=0.5`
        const result = await fetch(path, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

     const _getSearch = async (token, tracksEndPoint) => {
        const path = `https://api.spotify.com/v1/search?q=${tracksEndPoint}&type=track&limit=30&offset=0`
        const result = await fetch(path, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

         const data = await result.json();
        return data.tracks.items;
     }
    
    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        const data = await result.json();
        return data;
    }

    const _getUser = async (token) => {
        const result = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer '+token+''}
        });
        const data = await result.json();
        return data;
    }

    const _getPause = async (token) => {
        const result = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
            method: 'put',
            headers: { 'Authorization' : 'Bearer '+token+''}
        });
        const data = await result.json();
        return data;
    }

    const _getSeek = async (token, position) => {
        // console.log(token);
        const result = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
            method: 'put',
            headers: { 'Authorization' : 'Bearer '+token+''}
        });
        const data = await result.json();
        return data;
    }

    const _getPlay = async (token,values) => {
        const result = await fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'put',
            body: JSON.stringify(values),
            headers: { 'Authorization' : 'Bearer '+token+''}
        });
        const data = await result.json();
        return data;
    }
    const _getPlayState = async (token) => {
        const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer '+token+''}
        });
        const data = await result.json();
        return data;
    }



    const _getLyrics = async (artist, song) => {
        const result = await fetch(`/lyrics?artist=${artist}&title=${song}`, {
            method: 'GET',
        });
        const data = await result.json();
        return data;
    }

    

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
         getGenre(token,genreId) {
            return _getGenre(token,genreId);
        },
        getPlaylistByGenre(token, genreId,limit) {
            return _getPlaylistByGenre(token, genreId,limit);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
         getPlayList(token, tracksEndPoint) {
            return _getPlayList(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
        getSearch(token, trackEndPoint) {
             return  _getSearch(token, trackEndPoint);
        },
        getUser(token) {
             return  _getUser(token);
        },
         getPlay(token,data) {
             return  _getPlay(token,data);
        },
         getPlayState(token) {
             return  _getPlayState(token);
        },
          getSeek(token,position) {
             return  _getSeek(token,position);
        },
        getPause(token) {
             return  _getPause(token);
        },
         getLyrics(artist,song) {
             return  _getLyrics(artist,song);
         }
    }
})();
export default APIController;