function Message(props) {
    return ( <div className="b-r-1 p-01">
        <h5>{props.value.user.name}</h5>
                    <small>{props.value.message}</small>
   {props.children?props.children:<></>}
    </div>
    
    );
}

export default Message;