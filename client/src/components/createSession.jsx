import generateRandomString from "../api/keygen";
import { useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import getData from "../api/backendcalls";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateSession(props) {
    const [name, setName] = useState('');
    const [dis, setDis] = useState('');
    const [tags, setTags] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [password, setPassword] = useState(true);
 const type = visibility ? 'private' : 'public';
    const cookies = new Cookies();
    const id = generateRandomString(50);
    const navigate = useNavigate();


    const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };



    const handler = (event) => {
        event.preventDefault();
        if (type === 'private' && password.length < 4) {
            notify('You have not provided pass code for you private room');
            return null;
        }

        const payload_action = {
            id:id,
            uid:cookies.get("uid"),
            email:cookies.get("email"),
            ownerName:cookies.get("name"),
            name,
            description: dis,
            tags,
            roomType:type,
            lock:password
        }

        if (name.length < 5 || dis.length < 5 || type.length < 2) {
            notify('All fields are required');
            return null;
        }


        getData.createSession('session', payload_action).then(value => {
            if (value.error) {
                notify(value.message);
                return;
            } else {
                const link = '../room/' + value.data.session.id + '?name=' + value.data.session.name + '&admin=true&type=' + value.data.session.roomType;
                console.log(link);
                joinsession(link, value.data.session.id);
            }
        })

    }
     function joinsession(link, id) {
        notify("please wait joing...");
        getData.joinPrivateSession(`session/${id}/session`,{lock:password}).then(value => {
            if (value.status) {
                notify(value.status);
                setTimeout(() => {
                    navigate(link, { replace: false });
                },500)
                
            } else {
                notify(value.error);
            }
        })
      
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
        <div className="createSession b-r-1 bg-secondary p-01 box-shadow">
        <div className="flex-row flex-center flex-space p-1">
    <div className="flex-row flex-center">
        <h4 className="">Let setup your iMusic Room</h4>
    </div>


    <div className="flex-row flex-center">
        <div className="btn" onClick={props.show}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
            className="mercado-match close" width="16" height="16" focusable="false">
            <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
        </svg>
        </div>
    </div>
</div>
              <form className="form-control pr-1 pl-1 pb-1" onSubmit={handler}>
            <div className=" ">
                <label htmlFor="name" data-testid="name" className="opacity-6">iMusic Room name</label>
                <input type="text" minLength={5} required={true} onChange={event => setName(event.target.value)}  className="playSearch w-100 " placeholder="Room name" name="name" />
            </div>
            <div className="mt-1 pt-01">
                <label htmlFor="description" className="opacity-6">iMusic Room description</label>
                <textarea required={true} minLength={5} data-testid="discription"  className="playSearch-textArea w-100" onChange={event => setDis(event.target.value)} rows={3} placeholder="Room description" name="description"></textarea>
            </div>
            <div className="mt-1 pt-01">
                <label htmlFor="tags" className="opacity-6">iMusic Room tags</label>
                <input type="text" minLength={4}  required={true} className="playSearch p-1 w-100 mt-1" onChange={event => setTags(event.target.value)} placeholder="Room tags" name="tags" />
            </div>

            <div className="pt-01 mt-1 flex-row flex-center">
                <label htmlFor="" className="pr-1 opacity-6"  >Is your iMusic Room private?</label>
                <div className="flex-row flex-center">
                   <div className="pr-1" >NO</div>  <input data-testid="roomtype" type="checkbox" value={visibility} onChange={event => {setVisibility(event.target.checked)}} id="switch" /><label id="switched" htmlFor="switch">Toggle</label> <div className="pl-1" >YES</div>
                </div>
            </div>

            {visibility?<div className="mt-1 pt-01">
                <label htmlFor="password" className="opacity-6">iMusic Room Pass Code</label>
                <input type="text" data-testid="passcode"  required={visibility}  minLength={5} className="playSearch p-p w-100 mt-1"  onChange={event => setPassword(event.target.value)} placeholder="Room pass code" name="password" />
            </div>:null}
            

            <div >
            <input type={'submit'} data-testid="create" className="btn flex-row bg-danger flex-center mt-2 pt-01 pb-01 flex-center-justify text-center w-100" value={'Create Session'}/>
            </div>
        </form>
        
          </div>
    </>)
}

export default CreateSession;