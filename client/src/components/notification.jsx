import { useEffect,useState } from "react";
import getData from "../api/backendcalls";
import NewMessage from "../message/newMessage";
import NotFound from "./404";

function Notification(props) {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [NewMessageId, setNewMessageId] = useState('');


    useEffect(() => {
        setNotifications(props.notification);
    }, [props]);

    function hideManasession() {
        setType('');
    }

    function remove(indexed,id) {
        const newNoti = notifications.filter((value, index) => index !== indexed);
        setNotifications(newNoti);
        getData.deleteNotification(id);
    }

    return (
        <>
        <div className="notifaction-contaner b-r-1 p-1 h-100 mt-1 ml-01 mr-01 box-shadow">
                <div className="flex-row flex-center flex-space">
                    <h3>Notification</h3>
                    <svg onClick={props.hideNot} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
            className="mercado-match  close btn" width="16" height="16" focusable="false">
            <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
        </svg>
           </div>
            <div className="notification-list">
                {notifications.length>0? notifications.map((value,index) => {
                    return (<div onClick={() => {
                        if (value.notificationType === 'new message') {
                            setNewMessageId(value.userFrom._id);
                            setType('message');
                            setName(value.userFrom.name);
                        }
                        remove(index,value._id);
                        // props.hideNot();
                }} className="pl-1 card-column b-r-1 p-1 btn">
                    <h4>{value.notificationType}</h4>
                        <h6>{value.content}</h6>
                    </div>);
                }):<NotFound/>}
                
            </div>
        </div>
        {type==='message'?<NewMessage  home={'home'} id={NewMessageId} name={name} show={hideManasession} />:null}
        </>);
}

export default Notification;