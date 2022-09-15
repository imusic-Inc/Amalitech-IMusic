import { memo, useState,useEffect } from "react"; 
import Session from "./session";
import { useNavigate } from "react-router-dom";
import getData from '../api/backendcalls';
import PassCode from "./passcode";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function IMusicSessions(props) {
    const [sessions, setSessions] = useState([]);
    const [showpass, setShowpass] = useState(false);
    const [passCode, setPassCode] = useState('');
    const navigate = useNavigate();

const notify = (message) => {
toast.info(message, {
autoClose: 2000,
});
    }

    useEffect(() => {
        int();
    },[props]);

    function show(id) {     
        setShowpass(!showpass);
        setPassCode(id);
    }

    function joinsession(link, id) {
        notify("please wait joing...");
        getData.joinPublicSession(`session/${id}/session`).then(value => {
            if (value.status) {
                notify(value.status);
                setTimeout(() => {
                    navigate(link, { replace: false });
                },500)
                
            } else {
                notify(value.error);
            }
        })
      
    }

    function int() {
    getData.getSessionByType('session',props.type).then((value => {
        setSessions(value);
    }))}


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
            {sessions.length < 1 ? null :<div>
            <h3 className="pt-1">{props.name}</h3>
            <div className="flex-row p-session hide-scrollbar">
                {sessions.map(value => {
                    return props.type === 'private' ? <div key={value._id} onClick={() => { 
                        show(value.id);
                    }}> <Session name={value.name}   info={value.description} image={value.now_playing.image} key={value._id} /></div>: <div  onClick={()=>joinsession("/room/"+value.id+'?type='+props.type+'&name='+value.name,value.id)} ><Session name={value.name} info={value.description} image={value.now_playing.image} key={value.id} /></div> 
              })}
            </div>
            </div>}
            
            {showpass?<PassCode pass={passCode} show = {show} link={sessions.filter(value=>value.id===passCode).map(value => {
                  return "/room/"+value.id+'?type='+props.type+'&name='+value.name
              })} />:null}
        </>
    )
}

export default memo(IMusicSessions);