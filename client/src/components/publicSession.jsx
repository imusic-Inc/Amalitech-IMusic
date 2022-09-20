import APIController from "../api/spotifyApi";
import { memo, useState,useEffect } from "react"; 
import Session from "./session";
import {NavLink} from "react-router-dom";
import { SessionTrack } from "./loadingSession";
function PublicSession(props) {
    const [playList, setPlayList] = useState([]);

    async function init() {
        let token = await APIController.getToken();
    const playlist = await APIController.getPlaylistByGenre(token,props.id,10);
        setPlayList(playlist);
    }
    
    useEffect(() => {
      init();    
    },[props.id,props.name]);

    
    return (
        <>
            <h3 id="trending" className="pt-1 pl-01">{props.name}</h3>
            
          <div className="flex-row p-session hide-scrollbar">
                {playList.length < 1 ? <SessionTrack key={ Math.random()} /> :playList.map(value => {
                  return  <NavLink key={value.id} to={"/room/"+value.id+'@spotify?type=public&name='+props.name}><Session name={value.name} info={value.description} image={value.images[0].url}  /></NavLink> 
              })}
            </div>
        </>
    )
}

export default memo(PublicSession);