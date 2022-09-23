import { useEffect, useRef } from "react";
import { useState } from "react";
import getData from "../api/backendcalls";
import Message from "../message/message";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
function Activeuserscart(props) {
        const [message, setmessage] = useState('');
        const [messages, setMessages] = useState([]);
        const cookies = new Cookies();
        const name = cookies.get("name");
        const ref = useRef();
const notify = (message) => {
        toast.error(message, {
            autoClose: 2000,
        });
    };

        useEffect(() => {
                setMessages(props.value);
        }, [props.value]);


        useEffect(() => {
        
        setTimeout(() => {
        if (ref.current) {
                ref.current.scrollTo(0, ref.current.scrollHeight);
                console.log(ref.current);
        }
        }, 5000);

        const interval = setInterval(() => {
                if (props.id.indexOf('@spotify') < 0) {
                     getData.getSessionById('session', props.id).then((value) => {
                        if (messages.length < value.messages.length) {
                                setMessages(value.messages); 
                        }
                });    
                };
               
  }, 3000);
  return () => clearInterval(interval);
}, []);


        function sendMessage() {
                if (message.length > 3) {
                getData.postMessage(`session/${props.id}/messages`, { message }).then((value) => { 
                        if (value.error || value.status === '') {
                                notify(value.message ? value.message : value.status);
                        } else {
                                setMessages([...messages, { message, user: { name: name } }])    
                                setmessage("");
                   }     
                });     
                }
               
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
        <div className='active-users'>
        
 <div className="flex-row flex-center flex-space pt-01 live-chat">
         <h3 className="pl-1">Live chat</h3>
        <div title="Send" onClick={sendMessage} className="pr-1 btn" >
                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
</svg>
            </div>
      </div>
                <div ref={ref} className='active-list p-01'>

        <div className="list">
                                        {messages.map(value => <Message key={value._id} value={value} />)}
                                        <br />
</div>
<div className="chat-send-active">
<hr/>
<textarea  onChange={(event)=>setmessage(event.currentTarget.value)} value={message} className="char-textarea  bg-secondary" name="message" id="message"  placeholder=" Write a comment..." rows="4"></textarea>
</div>
                </div>
        </div>
        </>);
}

export default Activeuserscart;