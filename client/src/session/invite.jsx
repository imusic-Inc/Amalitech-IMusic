import InviteList from "../components/inviteList";
import getData from "../api/backendcalls";
import {useState,useEffect} from 'react'
import { SearchLoading } from "../components/loadingSession";
import Cookies from 'universal-cookie';
function Invite(props) {
    const cookies = new Cookies();
   const uid =  cookies.get('uid');
    const [users,setUser] = useState([])
    const [source,setSource] = useState([])
    const [search,setSearch] = useState('')

    function reset() {
        setUser(source);
        setSearch('');
    }

    useEffect(() => {
        if (uid && uid.length > 10) {
            getData.getUser('users').then(value => {
                setUser(value);
                setSource(value);
            })
        }
    }, []);
    
    useEffect(() => {
        if (search.length > 3) {
            const newSource = source.filter(value => value.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || value.email.toLowerCase().indexOf(search.toLowerCase()) >= 0);
            setUser(newSource);
       }
    },[search,source]);


    return (<div className='invite bg-default b-r-1 p-1'>
        <h1 className='text-right pr-1 pt-01 btn' >
            <svg  onClick={props.show} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
                className="mercado-match close" width="16" height="16" focusable="false">
                <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
            </svg>
        </h1>
        <div className='flex-6 pl-1 pr-1'>
            <div className="">
                <h4>Invite friend to join this music room</h4>
                <div className="flex-row flex-center" >
                    <input type="text" className="playSearch" value={search} onChange={(event)=>setSearch(event.currentTarget.value)} placeholder="&#9835; Search by username or email" name="search" id="playSearch" />
                    <div onClick={reset} className="addPlayList bg-white text-primary btn pt-01 pl-1 ml-1 btn-default mt-01">
                        Reset
                    </div>
                </div>
            </div>
            <div className='playList-list-save'>
                {users.length > 0 ? users.map(value => <InviteList key={value._id} track={value.name} by={value.email} toId={value.id} image={value.photo} id={props.id} />):<SearchLoading/>}
            </div>
        </div>
    </div>);
}
export default Invite;