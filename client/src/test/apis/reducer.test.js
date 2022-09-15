import store from "../../redux/store"


it('Dispatches action and payload with type clear', async () => {
    store.dispatch({ type: 'clear', payload: [] });
    expect(store.getState()).toEqual({});
});


it('Dispatches action and payload with type current-play with single call', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'current-play',
        payload: [1, 2, 3, 4, 5],
    }
    store.dispatch(payload);
    expect(store.getState().single).toEqual(payload.payload);
});

it('Dispatches action and payload with type current-play with multiple calls', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'current-play',
        payload: [1, 2, 3, 4, 5],
    }

    const payload1 = {
        type: 'current-play',
        payload: [6, 7, 8, 9, 10],
    }

    store.dispatch(payload);
    store.dispatch(payload1);
    expect(store.getState().single).toEqual([...payload1.payload,...payload.payload]);
});



it('Dispatches action and payload with type current-play with multiple calls with random values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'current-play',
        payload: [1, 2, 7, 4, 5],
    }

    const payload1 = {
        type: 'current-play',
        payload: [6, 7, 4, 2, 10],
    }

    store.dispatch(payload);
    store.dispatch(payload1);
    const set = new Set([...payload1.payload, ...payload.payload]);
    expect(store.getState().single).toEqual([...set]);
});



it('Dispatches action and payload with type current-play with multiple calls with same values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'current-play',
        payload: [1, 2, 3, 4, 5],
    }

    const payload1 = {
        type: 'current-play',
        payload: [1, 2, 3, 4, 5],
    }

    store.dispatch(payload);
    store.dispatch(payload1);
    expect(store.getState().single).toEqual(payload.payload);
});

it('Dispatches action and payload with type current-play-single with single call', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'current-play-single',
        payload: [1, 2, 3, 4, 5],
    }
    store.dispatch(payload);
    expect(store.getState().single).toEqual(payload.payload);
});


it('Dispatches action and payload with type current-play-single with multiple calls with different values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload1 = {
        type: 'current-play-single',
        payload: [1],
    }
    const payload2 = {
        type: 'current-play-single',
        payload: [2],
    }
    const payload3 = {
        type: 'current-play-single',
        payload: [3],
    }
    const payload4 = {
        type: 'current-play-single',
        payload: [4],
    }
    const payload5 = {
        type: 'current-play-single',
        payload: [5],
    }
    const payload6 = {
        type: 'current-play-single',
        payload: [6],
    }
    const payload7 = {
        type: 'current-play-single',
        payload: [7],
    }
    store.dispatch(payload1);
    store.dispatch(payload2);
    store.dispatch(payload3);
    store.dispatch(payload4);
    store.dispatch(payload5);
    store.dispatch(payload6);
    store.dispatch(payload7);
    expect(store.getState().single).toEqual(payload7.payload);
});



it('Dispatches action and payload with type current-play-single with multiple calls with random values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload1 = {
        type: 'current-play-single',
        payload: [1],
    }
    const payload2 = {
        type: 'current-play-single',
        payload: [2],
    }
    const payload3 = {
        type: 'current-play-single',
        payload: [1],
    }
    const payload4 = {
        type: 'current-play-single',
        payload: [4],
    }
    const payload5 = {
        type: 'current-play-single',
        payload: [5],
    }
    const payload6 = {
        type: 'current-play-single',
        payload: [5],
    }
    const payload7 = {
        type: 'current-play-single',
        payload: [7],
    }
    store.dispatch(payload1);
    store.dispatch(payload2);
    store.dispatch(payload3);
    store.dispatch(payload4);
    store.dispatch(payload5);
    store.dispatch(payload6);
    store.dispatch(payload7);
    expect(store.getState().single).toEqual(payload7.payload);
});


it('Dispatches action and payload with type add-to-playlist with single call', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload = {
        type: 'add-to-playlist',
        payload: [1, 2, 3, 4, 5],
    }
    store.dispatch(payload);
    expect(store.getState().addToPlayList).toEqual(payload.payload);
});

it('Dispatches action and payload with type add-to-playlist with multiple call with same values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload1 = {
        type: 'add-to-playlist',
        payload: [1, 2, 3, 4, 5],
    }
    const payload2 = {
        type: 'add-to-playlist',
        payload: [1, 2, 3, 4, 5],
    }
    const payload3 = {
        type: 'add-to-playlist',
        payload: [1, 2, 3, 4, 5],
    }
    const payload4 = {
        type: 'add-to-playlist',
        payload: [1, 2, 3, 4, 5],
    }
    store.dispatch(payload1);
    store.dispatch(payload2);
    store.dispatch(payload3);
    store.dispatch(payload4);
    expect(store.getState().addToPlayList).toEqual([...payload1.payload]);
});

it('Dispatches action and payload with type add-to-playlist with multiple call with defferent values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload1 = {
        type: 'add-to-playlist',
        payload: [1],
    }
    const payload2 = {
        type: 'add-to-playlist',
        payload: [2],
    }
    const payload3 = {
        type: 'add-to-playlist',
        payload: [3],
    }
    const payload4 = {
        type: 'add-to-playlist',
        payload: [4],
    }
    store.dispatch(payload1);
    store.dispatch(payload2);
    store.dispatch(payload3);
    store.dispatch(payload4);
    expect(store.getState().addToPlayList).toEqual([...payload4.payload,...payload3.payload,...payload2.payload,...payload1.payload]);
});

it('Dispatches action and payload with type add-to-playlist with multiple call with random values', async () => {
    store.dispatch({ type: 'clear', payload: [] }); //cleaning store before actions
    const payload1 = {
        type: 'add-to-playlist',
        payload: [1],
    }
    const payload2 = {
        type: 'add-to-playlist',
        payload: [2],
    }
    const payload3 = {
        type: 'add-to-playlist',
        payload: [1],
    }
    const payload4 = {
        type: 'add-to-playlist',
        payload: [3],
    }
    store.dispatch(payload1);
    store.dispatch(payload2);
    store.dispatch(payload3);
    store.dispatch(payload4);
    const set  = new Set([...payload4.payload,...payload3.payload,...payload2.payload,...payload1.payload])
    expect(store.getState().addToPlayList).toEqual([...set]);
});