import { useEffect } from "react";
import { useState } from "react";
import MemberList from "../message/memberList";
import NewMessage from "../message/newMessage";
function Members(props) {
    const [expand, setexpand] = useState("50px");
    const [iconShow, seticonShow] = useState(true);
    const [showNewMessage, setshowNewMessage] = useState(false);
    const [NewMessageId, setNewMessageId] = useState('');
    const [searced, SetSearced] = useState([]);
    const [search, SetSearch] = useState('');
    const [NewMessageReciever, setNewMessageReciever] = useState('');
    function hideManasession() {
        setshowNewMessage(false);
    }
    
    function showManasession(messageId,name) {
        setshowNewMessage(true);
         setNewMessageId(messageId);
        setNewMessageReciever(name);
    };


    useEffect(() => {
        const set = new Set([...props.value]);
        SetSearced(set);
    },[props.value]);
    
    useEffect(() => {
        if (search.length > 3) {
            const se = props.value.filter(value => value.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || value.email.toLowerCase().indexOf(search.toLowerCase()) >= 0);
            SetSearced(se);
            
        } else {
            SetSearced(props.value);
        }
    }, [search,props.value]);
  return (<>
      <div className="messaging-members " style={{ height: expand }}>
        <div className="flex-row flex-center flex-space  pt-01">
        <h4 className="flex-5 p-01">
            iMusic Room Members
        </h4>


        <div className="flex-1 text-right">
                  <div onClick={() => {
                      setexpand("70%");
                      seticonShow(!iconShow);
                  }} className="pr-2 btn" style={{ display: !iconShow ? "none" : "block" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16"
                    fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
                    <path d="M15 11L8 6.39 1 11V8.61L8 4l7 4.61z"></path>
                </svg>
            </div>

                  <div onClick={() => {
                      setexpand("50px");
                      seticonShow(!iconShow);
                  }} className="pr-2 btn" style={{ display: iconShow ? "none" : "block" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16"
                    fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
                    <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"></path>
                </svg>
            </div>

        </div>
      </div>
      <input type="text" className="playSearch w-100 p-1" onChange={(event)=>SetSearch(event.currentTarget.value)} placeholder="Username or Email" name="name"/>
          <hr className="opacity-6" />
          <div className="messages-list"> 
              {searced.length>0 ? searced.map(value => <MemberList key={value._id} owerId={props.ownerId} value={ value } showMessage={showManasession} />):null}
          </div>
      </div>
      {showNewMessage ? <NewMessage show={hideManasession} id={NewMessageId} name={NewMessageReciever} />:<></>}
      </>
  );
}

export default Members;