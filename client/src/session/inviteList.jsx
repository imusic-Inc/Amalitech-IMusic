import { useState } from "react";
import { useEffect } from "react";
import getData from "../api/backendcalls";

function InviteList(props) {
    const [invite, setInvite] = useState({});
    function getUser(id) {
       const user =  getData.getUserById('users', id);
       return user;
   }
    
    async function getSessionById(id) {
       const session = await getData.getSessionById('session', id);
       return session;
    }

    useEffect(() => {
        if (props.value) {
            const sender = getUser(props.value.senderId);
            const session = getSessionById(props.value.sessionId);
            Promise.all([sender, session]).then(value => {
                const senderResult = value[0];
                const sessionResult = value[1];
                const payload = {
                    name: sessionResult.name,
                    description: `Hello there, ${senderResult.name} invites you to a ${sessionResult.roomType} room session.`,
                    id: props.value.sessionId,
                    inviteId: props.value._id,
                    photo: sessionResult.now_playing.image,
                    roomType: sessionResult.roomType,
                }
                setInvite(payload);
            }).catch(() => {
                
            });
        }
    }, []);
    
    return (<div className="card b-r-1">
        <div className="ml-1 flex-1">
            <img className="b-r-01" src={invite.photo?invite.photo:"https://cdn.dribbble.com/users/702789/screenshots/16900790/media/628a8bb9f58f4feaea51367fc58b32a3.png?compress=1&resize=768x576&vertical=top"} alt="" width="80" height="80" srcSet="" />
        </div>
        <div className="flex-6 p-1">
            <h4>{invite.name }</h4>
            <small className="opacity-6 pt-01">{invite.description }</small>
        </div>
        {<div className="flex-1 p-1">
            <div onClick={() => {
                props.joinsession(invite.name, invite.roomType, invite.id,props.value._id);
            }} className="btn bg-success button btn-default">Accept</div>
            <div onClick={()=>props.declineFun(props.value._id)} className="btn bg-danger button btn-default">Decline</div>
        </div>}
    </div>);
}
export default InviteList;