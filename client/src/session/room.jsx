import LeaveCart from '../components/leaveCart';
import Members from '../home/members'
import MyMessage from './playlist'
import Player from '../players/player';
import Activeuserscart from './activeuserscart';
import AddToPlayList from './addToPlayList';
import { useState, useEffect,memo } from "react"; 
import {useParams} from "react-router-dom";
import Invite from './invite';
import Share from './share';
import APIController from '../api/spotifyApi';
import store from "../redux/store";
import PlayerConrols from '../players/playerControls';
import getData from '../api/backendcalls';
import Cookies from 'universal-cookie';
import Passcode from '../components/passcode';
import { useNavigate} from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificationShow } from '../api/notification';
let link;
let uid;
function Room() {
const [expand, setexpand] = useState(false);
const [expandInvite, setExpandInvite] = useState(false);
    const [expandShare, setexpandShare] = useState(false);
    const [auth, setAuth] = useState(true);
    const [allowInvite, setAllowInvite] = useState(true);
    const [actions, setActions] = useState(true);
    const [mobile, setMobile] = useState(false);
    const [notPart, setNotPart] = useState(false);
    const [notifcation, setNotifcation] = useState([]);
    const [type, setType] = useState('public');
    const [playList, setplayList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [current, setCurrent] = useState([]);
    const [participant, setParticipant] = useState([]);
    // const [guest, setGuest] = useState([]);
    const [owerId, setOwerId] = useState("");
    const paths = useParams();
    
    const cookies = new Cookies();
    const navigate = useNavigate();
    const search = new URLSearchParams(window.location.search);
    const notify = () => {
        toast.info("Only room admin can perform this action", {
            autoClose: 2000,
        });
    };

    // get spotify play session by id
    async function init(id) {
        APIController.getToken().then(value => {
          APIController.getPlayList(value, id).then((value1) => {
            const getModifiedPlayList =  value1.filter((value)=>value.track).map((values => {
                return {
                    "image": values.track.album.images[0].url,
                    "name": values.track.name,
                    "len": values.track.duration_ms,
                    "auth": values.track.album.artists[0].name,
                    "audio": values.track.uri,
                    "album": values.track.album.name,
                    "pre_view": values.track.preview_url
                };
            }));
            setplayList(getModifiedPlayList);
          })
        });
    }

    // props function to hide participant component
    function show() {
            setNotPart(false);
    }



    // get user notifications, check for every 5 seconds
    useEffect(() => {
        if (uid) {
             const interval = setInterval(() => {
                 getData.getNotification('notification').then(value => {
                     
                     
            if (value.status === 'success') {
          if (value.data.notifications.length > 0 && notifcation.length !== value.data.notifications) {
            setNotifcation(value.data.notifications);
          if (!search.get('n')) {
            notificationShow('hello there you have about '+value.data.notifications.length+' new notifications','New Message');
          } else {
            notificationShow(true);
          }
          }
            }
            
    });     
  }, 1000);
  return () => clearInterval(interval);
        };
    }, []);



    // update can invite action
    function update() {
         setAllowInvite(!allowInvite);
        if (uid === owerId) {
            getData.update(paths.id, { can_invite: !allowInvite });
        } else {
            notify();
        }
    }

    // get imusic room session by id
    async function getSession(id) {
        getData.getSessionById("session", id).then(value => {
            if (value.status === "error") {
                navigate('../home', { replace: true });
            } else {
                setValues(value);
                middleWare(value);
            };
        }).catch((error) => {
            console.error(error);
        });
}


    // seting values of the room
    function setValues(value) {
        setParticipant(value.participants);
        setMessages(value.messages);
        // checking to remove duplicate members from the list
        const set  = new Set(value.playlist?value.playlist:[]);
        setplayList([...set]);
        // setGuest(value.guest);
        setOwerId(value.ownerId);
        setCurrent([value.now_playing]);
        setAllowInvite(value.can_invite);
        link = '../room/' + value.id + '?name=' + value.name + '&admin=true&type=' + value.roomType;
    }


    // prevent unregistered users from joining private room
    function middleWare(value) {
        const email = cookies.get('email');
        const uid = cookies.get('uid');
        if (value.roomType === 'private') {
            //checking if a user is registed with user id
                    if (!uid || (uid && uid.length < 7)) {
                       navigate('../home', { replace: true });
                        return;
                    }
                    
            // gues user should come with v-token
                if (!search.get('v')) {
                const find = value.participants.filter(value => value.email === email);
                if (find.length < 1) {
                setNotPart(true);
                    };
            };
            
                };
    }

    
    // identify spotify ids and imusic room and get the room by id; spotify id are the ones with @spotify
    useEffect(() => {
        uid = cookies.get('uid');
        document.title = search.get('name');
        if (paths.id) {
            if (paths.id.indexOf('@spotify') >= 0) {
                const inde = paths.id.indexOf('@spotify');
                init(paths.id.substring(0,inde));
                setType('public');
            } else {
                getSession(paths.id);
                setType(search.get("type"));
            }
        }
    },[paths.id]);


    // get playList room redux store on store change
    useEffect(() => {
        store.subscribe(() => {
            const newPlay = store.getState();
            const list = newPlay.playList;
            if (list) {
                const set = new Set([...list]);
                setplayList([...set]);
                if (paths.id.indexOf('@spotify') < 0 && playList.length>0) {
                    getData.PlayList_nowPlaying(paths.id, { now_playing: playList[0] });
                }
            }
        });
    }, [playList]);


// edit the play list values from redux store
function editPlaylist() {
    setexpand(!expand);
    if (playList.length > 0) {
         const payload = {
        type: "add-to-playlist",
        payload: [...playList]
         }
        
        store.dispatch(payload);
    }
   
}
    
    
//    remove one track from redux playlist
    function deletedPlayListDraft() {
        const payload = {
            type: "delete-Draft-Playlist",
            payload:'addToPlayList'
        }
         store.dispatch(payload);
    }
    
 // clear are values and search from add to playlist component
function exit() {
        const payload = {
            type: "exit",
            payload:'clear cache'
        }
         store.dispatch(payload);
}
    
    // props function to hide add component
    function showAndHide() {
        setexpand(!expand);
        deletedPlayListDraft();
        
    }


// props function to hide invite component
function showAndHideInvite() {
        setExpandInvite(!expandInvite)
}

// props function to hide share component
function showAndHideShare() {
        setexpandShare(!expandShare)
}
    
    return (
        <>
            
            <ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

            <div className='controls flex-row flex-space' >
                <div style={{display:mobile?actions?'flex':'none':'auto'}}>
<LeaveCart  exit={exit} id={paths.id} udi={uid} owerId={owerId} type={type}  />
                </div>
                

                <div className='flex-row flex-center actions' style={{display:mobile?actions?'none':'flex':null}}>
                     <div className='btn b-r-1 btn-back flex-row flex-center p-01' onClick={ uid !==owerId?notify:showAndHide}>
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
</svg>
                </div>
 <div className='btn b-r-1 btn-back flex-row flex-center p-01' onClick={uid !==owerId?allowInvite?showAndHideInvite:notify:showAndHideInvite}>
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z" />
</svg>
</div>
<div className='btn b-r-1 btn-back flex-row flex-center p-01' onClick={uid !==owerId?allowInvite?showAndHideShare:notify:showAndHideShare}>
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
</svg>
                </div>
                
    <div className='btn b-r-1 btn-back flex-row flex-center p-01' onClick={ uid !==owerId?notify:editPlaylist}>
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.1 15.03C15.04 14.86 15 14.69 15 14.5C15 13.67 15.67 13 16.5 13C16.69 13 16.86 13.04 17.03 13.1L19.39 10.74C19.69 10.44 20.05 10.24 20.44 10.12C20.21 10 20 10 20 10H18V9C18 8 17 8 17 8H15V7C15 6 14 6 14 6H13V4C13 3 12 3 12 3C7.03 3 3 7.03 3 12C3 16.63 6.5 20.44 11 20.94V19.13L11.14 19C11.1 19 11.05 19 11 19C10.17 19 9.5 18.33 9.5 17.5S10.17 16 11 16 12.5 16.67 12.5 17.5C12.5 17.55 12.5 17.6 12.5 17.64L15.1 15.03M6.5 13C5.67 13 5 12.33 5 11.5S5.67 10 6.5 10 8 10.67 8 11.5 7.33 13 6.5 13M9.5 9C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6 11 6.67 11 7.5 10.33 9 9.5 9M11.5 14C10.67 14 10 13.33 10 12.5S10.67 11 11.5 11 13 11.67 13 12.5 12.33 14 11.5 14M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83Z" />
</svg>
</div>
               </div>
                
                 <div  className='flex-row flex-center actions toggle' style={{display:mobile?actions?'none':'flex':null}}>
                    <h4 className='p-01 text-center'>Allow Invite:</h4>
                    <div className="flex-row flex-center">
                        <small className="pr-03" >NO</small>  <input type="checkbox" checked = {allowInvite} onClick={ update}  disabled={ uid !== owerId} id="switch" /><label id="switched" htmlFor="switch">Toggle</label> <small className="pl-01" >YES</small>
                </div>
                 </div>

                
                <div className='btn flex-row flex-center mobile-menu'>
                    <i onClick={() => {
                        setActions(!actions)
                        setMobile(true);
                    }}>
                        {actions ? <svg style={{ width: '34px', height: '34px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
</svg>:<svg style={{ width: '34px', height: '34px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
</svg>}
                        </i>
                </div>

            </div>
            
            {expandShare?<Share show = {showAndHideShare} />:<></>}
            {expandInvite?<Invite show = {showAndHideInvite}  id={paths.id}  />:<></>}
           {expand?<AddToPlayList show = {showAndHide} id={paths.id}  />:<></>} 
            <Activeuserscart value={messages } id={paths.id} />
            <Members value={participant} ownerId = {owerId} />
            <MyMessage value={ playList } isAdmin={uid ===owerId} id={paths.id} type={type} />
            {auth ? <PlayerConrols auth={setAuth} current={current}  isAdmin={owerId} uid={uid} id={paths.id} type={type} /> : <Player current={current} />}
            {notPart?<Passcode pass={paths.id} show = {show} link={link} />:null}
        </>
    )
}

export default memo(Room);