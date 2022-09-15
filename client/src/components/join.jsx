import { useState,useEffect } from "react";
import getData from "../api/backendcalls";
import JoinList from "../session/joinList";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import {SearchLoading} from './loadingSession'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Passcode from "./passcode";
import InviteList from "../session/inviteList";
let linked = '';
let inviteId = '';
let seletedId = '';
const invites = new Set();
function Join(props) {
    const [getSession, setSession] = useState([]);
    const [getInvite, setInvite] = useState([]);
    const [showpass, setShowpass] = useState(false);
    const cookies = new Cookies();
     const navigate = useNavigate();
 const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
 };
    
    useEffect(() => {
        const uid = cookies.get('uid');
        getData.getSession('session').then(value => {
            const getMySession = value.filter(value => value.ownerId === uid);
            setSession(getMySession);
    });
    
        
        
        getData.getInvite('invite').then(value1 => {
            setInvite(value1);
        });
        
        
    },[]);






    function deleteFun(id) {
        getData.deleteSession('session/' + id);
        const getMySession = getSession.filter(value => value.id !== id);
        setSession(getMySession);
        notify("Session deleted successfully");
       
    }

    function joinsession(name,roomType, id,invite) {
        notify("please wait joing...");
        getData.joinPublicSession(`session/${id}/session`).then(value => {
            const link = '../room/' + id + '?name=' + name + '&admin=true&type=' + roomType;
            if (value.status === 'fail') {
                notify(value.message);
                if (value.message === 'Please provide a lock code!') {
                    linked = link
                    seletedId = id;
                    if (invite) {
                        inviteId = invite;
                    }
                    
                    setShowpass(true);
                }
            } else {
                notify(value.status);
                setTimeout(() => {
                    navigate(link, { replace: false });
                    if (invite) {
                        declineFun(invite);
                    };
                }, 500)
            }


        });
        
        
      
    }

    function declineFun(id) {
        getData.rejectInvite('invite/reject', { "invitationId": id }).then(value => {
            const getInv = getInvite.filter(value => value.inviteId !== id);
            setInvite(getInv);
         notify("invitation declined successfully");
        })
    }





    function show() {
        setShowpass(false);
    }


    console.log(getInvite);

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
      
       <div className="join-session b-r-1 box-shadow">
<div className="flex-row flex-center flex-space">
    <div className="flex-row flex-center">
        <h4 className="pl-1">Join session</h4>
    </div>


    <div className="flex-row flex-center" >
       
        <div className="p-1 btn" onClick={()=>props.onClick()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
                className="mercado-match close" width="16" height="16" focusable="false">
                <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z">
                </path>
            </svg>
        </div>
    </div>
</div>
<hr className="bg-primary"/>


              <div className="join-list">
                  {getInvite.length > 0 ? getInvite.map(value => <InviteList value={value} key={value._id} declineFun={declineFun} joinsession={ joinsession }  /> ) :SearchLoading} 
                  {getSession.length > 0 ? getSession.map(value => <JoinList invite={false} key={value.id} name={value.name} description={value.description} id={value.id} photo={value.now_playing.image}  roomType={value.roomType} deleteFun={deleteFun} joinsession={ joinsession } /> ) :SearchLoading} 
                  
</div>

          </div>
          
           {showpass?<Passcode pass={seletedId} show={show} invite={inviteId} declineFun={declineFun} link={linked} />:null}
      </>

  );
}

export default Join;