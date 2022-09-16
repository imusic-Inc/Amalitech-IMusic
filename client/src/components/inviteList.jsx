import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import getData from '../api/backendcalls';
function InviteList(props) {
    const cookies = new Cookies();
    const [Invite, setInvite] = useState('Invite');
const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
};

function invite() {
    getData.inviteUser('invite', { "receiverEmailAddress": props.by, 'session': props.id }).then(value => {
        notify(value);
        setInvite('Invited');
        getData.createNotification('notification/new', { receiverId: props.toId, alertMessage: 'invite', content: `Hello there, ${cookies.get('name')} invited you to participate in a room session.`});
    });
}


    return (<>
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
        <div className="flex-row flex-center flex-space p-01 pl-01 pr-01">
        <div className="flex-row flex-center">
        <img className="b-r-01" src={props.image?props.image:"https://ui-avatars.com/api/?name="+props.track} alt="" width="50" height="50" srcSet=""/>
        <div className="pl-1">
            <h4>{props.track}</h4>
            <h6 className="opacity-6">{props.by}</h6>
        </div>
    </div>
            <div className={`addPlayList ${ Invite ==="Invite"?'bg-blue':'bg-danger'}  btn pt-01 pl-1 ml-1 mt-01 btn-default`} onClick={invite}>
    {Invite}
        </div>
    </div>
    </>)
}
export default InviteList;