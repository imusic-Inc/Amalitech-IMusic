import { memo } from "react";
import store from "../redux/store";
function TrackList(props) {
    const payload = {
        type: "add-to-playlist",
        payload: [{
                "image": props.values.album.images[0].url,
                "name": props.values.name,
                "len": props.values.duration_ms,
                "auth": props.values.album.artists[0].name,
                "audio": props.values.uri,
                "album": props.values.album.name,
                "pre_view": props.values.preview_url
        }]
    }
    
    function clicked() {
        store.dispatch(payload);
}

    return (<div className="flex-row flex-center b-r-1 flex-space p-1 pr-2">
        <div className="flex-row flex-center flex-space">
        <img className="b-r-01" src={props.values.album.images[0].url} alt={props.values.name} width="50" height="50" srcSet=""/>
        <div className="pl-1">
            <h5 className="opacity-8">{props.values.name.substring(0,60)}</h5>
            <small className="opacity-6 font-size-08">{props.values.album.artists[0].name}</small>
        </div>
    </div>
        <div onClick={clicked} className="cirlce flex-row flex-center btn  bg-blue">
     <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
</svg>
        </div>
    </div>)
}
export default memo(TrackList);