import { timeSince } from "../api/keygen";

function Message(props) {
    return ( <div className="b-r-1 p-01">
        <div className="flex-row flex-center flex-space"><h5>{props.value.user.name}</h5><h6>{timeSince(props.value.createdAt)}</h6></div>
                    <small>{props.value.message}</small>
   {props.children?props.children:<></>}
    </div>
    
    );
}

export default Message;