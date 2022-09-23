import Message from "./message";
import Cookies from 'universal-cookie';
import { useEffect,useState } from "react";
import getData from "../api/backendcalls";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "../components/404";
import { useRef } from "react";
let sent = true;
function NewMessage(props) {
    const cookies = new Cookies();
    const uid = cookies.get('uid');
    const userName = cookies.get('name');
    const [message_id,setMessage_id] = useState()
    const [message,setMessage] = useState()
    const [messages, setMessages] = useState([])
    const ref = useRef();
 const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };
    useEffect(() => {
         setTimeout(() => {
        if (ref.current) {
             ref.current.scrollTo(0, ref.current.scrollHeight);
        }
         }, 1000);
        
        getData.startMessage('conversation/add', {
            "senderId": uid,
            "receiverId": props.id
        }).then(value => {
            getData.getMessage_id('conversation', {
                "senderId": uid,
                "receiverId": props.id
            }).then(value => {
                setMessage_id(value._id)
                getMessage(value._id);
            });
        });
    },[props.id]);


    useEffect(() => {
        if (message_id) {
             const interval = setInterval(() => {
            getMessage(message_id);
        }, 1000);
  return () => clearInterval(interval);
        }
       
  
}, []);


    function getMessage(id) {
        getData.getMessage(id).then(value => {
            const mes = value.map(value => {
                let name;
                if (value.senderId === props.id) {
                    name = props.name;
                } else {
                    name = userName;
                }
                return { name: name, message: value.text,createdAt:value.createdAt };
            });
            
            if (mes.length !== messages.length) {
                setMessages(mes);
            };
                    
        });
    };

    function sendMessage() {
        getData.addMessage('privateMessage', {
            "conversationId": message_id,
            "senderId": uid,
            "receiverId": props.id,
            "text": message
        }).then((value) => {
            if (value.status === 'fail') {
                notify(value.status);
            } else {
            getMessage(message_id);
            setMessage('');
            if (sent) {
                sent = false;
                getData.createNotification('notification/new', { receiverId: props.id, alertMessage: 'new message', content: `Hello there, ${userName} sent you a new message` });
            }
            }
        });
    }

const bot = window.screen.availWidth > 600 ? '80px' : null;
const bot1 = window.screen.availWidth > 600 ? '5px' : null;
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
         <div className="message" style={{bottom: props.home?bot:null,}}>
<div className="flex-row flex-center flex-space">
    <div className="flex-row flex-center">
        <h4 className="pl-01">{props.name}</h4>
    </div>


    <div className="flex-row flex-center">
<div className="p-1 btn">
   <svg style={{ width: '24px', height: '24px' }} onClick={sendMessage} viewBox="0 0 24 24">
    <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
</svg>
</div>
        <div className="p-1 btn" >
        <svg onClick={props.show} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
            className="mercado-match  close" width="16" height="16" focusable="false">
            <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
        </svg>
        </div>
    </div>
</div>
<hr className="bg-primary"/>

            <div ref={ref} className="income-messages-list">
                    {messages.length > 0 ? messages.map(value => {
                      return  <Message  key={Math.random()} value={{user:{ name: value.name },message: value.message,createdAt:value.createdAt}}><hr className="opacity-6" /></Message>
                    }):<NotFound/>}
                
                <br /><br /><br />
            </div>


<div className="chat-send" style={{bottom: props.home?bot1:null,}} >
<hr/>
<textarea  className="char-textarea  bg-default" value={message} onChange={(event)=>setMessage(event.currentTarget.value)} name="message" id="message" cols="30" placeholder=" Write a message..." rows="4"></textarea>
</div>
</div>
        </>
  );
}

export default NewMessage;