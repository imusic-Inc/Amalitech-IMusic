import keys from "./keys";

const getData = (function() {
    const link = `https://amalitech-imusic.herokuapp.com/api/v1/`




    const __getAuth = async(path) => {
        const result = await fetch(link + path, {
            method: 'get',
            credentials: "include",
            withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }


    const __getSession = async(path) => {

        const result = await fetch(link + path, {
            method: 'get',
            credentials: "include",
            withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc;
    }

    const __getSessionByType = async(path, type) => {

        const result = await fetch(link + path + '?roomType=' + type, {
            method: 'get',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc;
    }
    const __getUserByEmail = async(path, email) => {
        const result = await fetch(link + path, {
            method: 'get',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc.find(value => value.email === email);
    }

    const __getSessionById = async(path, id) => {
        const result = await fetch(link + path + '/' + id, {
            method: 'get',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc;
    }

    const __getUser = async(path) => {
        const result = await fetch(link + path, {
            method: 'get',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc;
    }

    const __getUserById = async(path, id) => {
        const result = await fetch(link + path + '/' + id, {
            method: 'get',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.doc;
    }

    const __joinPublicSession = async(path) => {
        const result = await fetch(link + path, {
            method: 'PATCH',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __joinPrivateSession = async(path, values = {}) => {
        const result = await fetch(link + path, {
            method: 'PATCH',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await result.json();
        return data;
    }
    const __leaveSession = async(path) => {
        const result = await fetch(link + path, {
            method: 'PATCH',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __postMessage = async(path, values = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await result.json();
        return data;
    }

    const __CreateSession = async(path, values = {}) => {
        const result = await fetch(link + path, {
            method: 'post',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const data = await result.json();
        return data;
    }

    const __LogOut = async(path) => {
        const result = await fetch(link + path, {
            method: 'get',
            mode: 'cors',
            // credentials: 'same-origin',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __UpdateSession = async(path, values = {}) => {
        const result = await fetch(link + 'session/' + path, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(values),
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data.data.users;
    }

    const __UpdateSessionPlayList = async(path, values = {}) => {
        const result = await fetch(link + 'session/' + path, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(values),
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __addSessionPlayList = async(path, values = {}) => {
        const result = await fetch(link + 'session/' + path + '/addToQueue', {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(values),
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __PlayList_nowPlaying = async(path, values = {}) => {
        const result = await fetch(link + 'session/' + path, {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(values),
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __DeleteSession = async(path) => {
        const result = await fetch(link + path, {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }


    const __startMessage = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }


    const __getMessage_id = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __getMessage = async(id) => {
        const result = await fetch(link + 'privateMessage/get/' + id, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __addMessage = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __inviteUser = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

//     const __acceptInvite = async(path, value = {}) => {
//         const result = await fetch(link + path, {
//             method: 'PATCH',
//             mode: 'cors',
//             credentials: "include",
// withCredentials:true,
//             body: JSON.stringify(value),
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await result.json();
//         return data;
//     }

    const __rejectInvite = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }
    const __getInvite = async(path) => {
        const result = await fetch(link + path, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __getNotification = async(path) => {
        const result = await fetch(link + path, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __createNotification = async(path, value = {}) => {
        const result = await fetch(link + path, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            body: JSON.stringify(value),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __deleteNotification = async(id) => {
        const result = await fetch('notification/clear/' + id, {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }

    const __RefreshToken = async() => {
        const result = await fetch(link + 'refreshToken', {
            method: 'get',
            mode: 'cors',
            credentials: "include",
withCredentials:true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    }


    return {
        getAuth(path) {
            return __getAuth(path);
        },
         getSession(path) {
            return __getSession(path);
        },
        getSessionByType(path, type) {
            return __getSessionByType(path, type);
        },
        getSessionById(path, id) {
            return __getSessionById(path, id);
        },
        getUserByEmail(path, email) {
            return __getUserByEmail(path, email);
        },
        getUser(path) {
            return __getUser(path);
        },
        getUserById(path, id) {
            return __getUserById(path, id);
        },
        joinPublicSession(path) {
            return __joinPublicSession(path);
        },
        joinPrivateSession(path, password) {
            return __joinPrivateSession(path, password);
        },
        leaveSession(path) {
            return __leaveSession(path);
        },
        postMessage(path, message) {
            return __postMessage(path, message);
        },
        createSession(path, data) {
            return __CreateSession(path, data);
        },
        logOut(path) {
            return __LogOut(path);
        },
        deleteSession(path) {
            return __DeleteSession(path);
        },
        updateSessionPlayList(path, data) {
            return __UpdateSessionPlayList(path, data);
        },
        addSessionPlayList(path, data) {
            return __addSessionPlayList(path, data);
        },
        PlayList_nowPlaying(path, data) {
            return __PlayList_nowPlaying(path, data);
        },
        refreshToken() {
            return __RefreshToken();
        },
        startMessage(path, data) {
            return __startMessage(path, data);
        },
        getMessage_id(path, data) {
            return __getMessage_id(path, data);
        },
        getMessage(id) {
            return __getMessage(id);
        },
        addMessage(path, data) {
            return __addMessage(path, data);
        },
        getInvite(path) {
            return __getInvite(path);
        },
        rejectInvite(path, data) {
            return __rejectInvite(path, data)
        },
        inviteUser(path, data) {
            return __inviteUser(path, data)
        },
        update(path, data) {
            return __UpdateSession(path, data)
        },
        getNotification(path) {
            return __getNotification(path)
        },
        createNotification(path, data) {
            return __createNotification(path, data);
        },
        deleteNotification(path) {
            return __deleteNotification(path)
        }
    }
})();

export default getData;