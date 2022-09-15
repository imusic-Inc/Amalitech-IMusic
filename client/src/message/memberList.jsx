import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
function MemberList(props) {

 const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
 };
const cookies = new Cookies();
const uid = cookies.get('uid');
    
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
        <div className="flex-row flex-center b-r-1 btn card p-01 member-list" onClick={() => {
            if (props.value._id === uid) {
                notify("We understand you want to chat with yourself, but that system is currently unavailable.")
            } else {
                props.showMessage(props.value._id, props.value.name)
            }
            
        }}>
            <div className="flex-1">
 <img className="cirle-2 bg-secondary"
            src={"https://ui-avatars.com/api/?name="+props.value.name} width="60%"
            height="60%" alt=""/>
            </div>
            <div className="pl-1 text-left flex-6">
            <h5 className='pb-01'>{props.value.name} { props.owerId === props.value._id?<span className='admin'>Admin</span>:null}</h5>
            <small >{ props.value.email}</small>
            </div>
        </div>
    </>)
}
export default MemberList;