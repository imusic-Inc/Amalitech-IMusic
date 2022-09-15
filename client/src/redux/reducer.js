
function Reducer(state = {}, action) {
    switch (action.type) {
        case 'current-play':
            if (state.single) {
                const set  = new Set([...action.payload,...state.single])
                state = {...state, 'single':[...set]}
            } else {
                const set = new Set([...action.payload]);
                state = {...state, 'single':[...set]}
            }
            break;
        case 'current-play-single':
            const set1  = new Set([...action.payload])
            state = {...state, 'single':[...set1]}
            break;
        case 'add-to-playlist':
            if (state.addToPlayList) {
             const set =  new Set([...action.payload, ...state.addToPlayList]);
                state = { ...state, 'addToPlayList': [...set] }
            } else {
                const set =  new Set([...action.payload]);
                state = {...state, 'addToPlayList':[...set]}
            }
            break;
        case 'create-session':
            state = {...state, 'session':{...action.payload}}
            break;
        case 'toPlayList':
            const set =  new Set([...action.payload]);
            state = {...state, 'playList':[...set]}
            break;
        case 'delete-Draft-Playlist':
            state = {...state, 'addToPlayList': []}
            break;
        case 'exit':
            if (state.auth) {
                state = {...state.auth}
            } else {
                state = {}
            }
            break;
        case 'clear':
            state = {};
            break;
        default:
            
            break;
    }

    return state;
}

export default Reducer;