function JoinList({ name, description, id, photo, roomType, deleteFun,declineFun,joinsession,invite,inviteId }) {
    return (<div className="card b-r-1">
        <div className="ml-1 flex-1">
            <img className="b-r-01" src={photo?photo:"https://cdn.dribbble.com/users/702789/screenshots/16900790/media/628a8bb9f58f4feaea51367fc58b32a3.png?compress=1&resize=768x576&vertical=top"} alt="" width="80" height="80" srcSet="" />
        </div>
        <div className="flex-6 p-1">
            <h4>{name }</h4>
            <small className="opacity-6 pt-01">{description }</small>
        </div>
        {invite?<div className="flex-1 p-1">
            <div onClick={() => {
                joinsession(name, roomType, id,inviteId);
            }} className="btn bg-success button btn-default">Accept</div>
            <div onClick={()=>declineFun(inviteId)} className="btn bg-danger button btn-default">Decline</div>
        </div>:<div className="flex-1 p-1">
            <div onClick={() => {
                joinsession(name, roomType, id);
            }} className="btn bg-success button btn-default">Join</div>
            <div onClick={()=>deleteFun(id)} className="btn bg-danger button btn-default">End</div>
        </div>}
    </div>);
}
export default JoinList;