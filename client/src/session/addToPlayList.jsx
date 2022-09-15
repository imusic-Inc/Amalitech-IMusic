import TableRow from '../components/playListTableRow';
import TrackList from '../components/trackList';
import { useState,useEffect } from "react";
import APIController from '../api/spotifyApi';
import store from "../redux/store";
import { SearchLoading } from '../components/loadingSession';
import getData from '../api/backendcalls';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let token;
var addPlayList;
function AddToPlayList(props) {
    const [tracks, setTracks] = useState([]);
    const [searched, setSearched] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [message, setMessage] = useState('');
const notify = (message) => {
        toast.info(message, {
            autoClose: 2000,
        });
    };
    async function getSearch() {
        setSearched(true);
        setTracks([]);
        if (!token) {
      APIController.getToken().then(value => {
          token = value;
          if (message.length > 3) {
               APIController.getSearch(token,message).then((values) => {
                   setTracks(values);
                    setSearched(false);
          })
          }
        });
        } else {
             if (message.length > 3) {
               APIController.getSearch(token,message).then((values) => {
                   setTracks(values);
                   setSearched(false);
          })
          }
        }
        
    }

    function addToPlayList() {
        notify("Please wait!...");
        if (playlist.length > 0) {
              getData.updateSessionPlayList(props.id, { playlist: [...playlist] }).then(value => {
                  if (value.status === 'success') {
                    props.show();
                     const payload = {
                 type: "toPlayList",
                payload: [...value.data.data.playlist]
            }
                store.dispatch(payload);
                    notify("Saved successfully");
            }; 
        });
    }
}

    function removePlayList(index) {
        const newPlayList = playlist.filter((value, indexed) => {
            return indexed !== index;
        });
        setPlaylist(newPlayList);
    }
     
useEffect(() => {
       store.subscribe(() => {
         addPlayList = store.getState();
            if (addPlayList.addToPlayList) {
                setPlaylist([...addPlayList.addToPlayList]);
            }
       });
    },[]);


    useEffect(() => {
        const state = store.getState()
        if (state && state.addToPlayList) {
            addPlayList = state.addToPlayList;
            setPlaylist([...addPlayList]);
       }
    },[setPlaylist]);


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

            <div className='addToPlayList  bg-default' >
                <div className='flex-row '>
                    <div className='flex-4'>
<div className="p-1">
        <div className="flex-row flex-center pl-1">
            <svg xmlns="http://www.w3.org/2000/svg"  onClick={props.show} viewBox="0 0 16 16" data-supported-dps="16x16"
                    fill="currentColor" className="mercado-match btn close" width="16" height="16" focusable="false">
                   <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
                </svg>
            <h4 className="p-1">Playlist Manager</h4>
                            </div>

     <div className="flex-row flex-center flex-space">
                                <h5 className="p-1">Playlist Manager</h5>
                                <div onClick={addToPlayList} className='btn btn-default p-01 bg-success'>
                                Save
                                </div>
        </div>
                        </div>
                        
                        <div className='playList-list-save pl-1'>
                           <table className="p-1">
                                <thead>
 <tr>
        <th className="opacity-6 text-left">Title</th>
        <th className="opacity-6 text-left">album</th>
                  <th className="opacity-6 text-left">
            X
                                    </th>
                                    
                                </tr>
                                </thead>
                                <tbody>
 {playlist.length > 0 ? playlist.map((value,index) => {
                                   return <TableRow  number={index} image = {value.image} key={value.image+value.name}  name={value.name} by={value.auth} album={value.album} remove={removePlayList}  />
                               }):<></>}
                                </tbody>
                               
</table>
                        </div>
                        
                    </div>
                    <div className='flex-6 p-1'>
                        <div className="p-1">

    <h4>Let's find something for your room</h4>
    <div className="flex-row flex-center" >
        <input type="text" onChange={event => setMessage(event.target.value)} className="playSearch" placeholder="&#9835; Search..." name="search" id="playSearch"/>
        <div onClick={getSearch}  className="addPlayList bg-white text-primary btn-default  btn pt-01 pl-1 ml-1 mt-01">
            Search
        </div>
    </div>
</div>
                        <div className='playList-list-save'>
                            {tracks.length > 0 ? tracks.map(value => {
                                return <TrackList key={value.id} values={value} />
                               
                             }) :searched?<SearchLoading/>:<></>}
                           
</div>
                    </div>
                </div>
            </div>
    </>)
}

export default AddToPlayList;