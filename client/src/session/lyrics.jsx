import { useEffect, useState,useRef} from "react";
import APIController from "../api/spotifyApi";

function Lyrics(props) {
    const [lyrics, setLyrics] = useState('');
    let scrollerHandler;

    let interval = 900;
    let set = 5;
    const lyref = useRef();
    const lyContainerref = useRef();

    function startScroll() {
        let id = setInterval(function () {
        if (lyref.current && lyContainerref.current) {
             lyref.current.scrollBy(0, set);
        if ((lyref.current.innerHeight + lyref.current.scrollY) >= lyContainerref.current.offsetHeight) {
            stopScroll();
        }
        }
       
        }, interval);
        
    return  id;
    }
    

    function stopScroll() {
    lyref.current.scrollTo({ top: 0, behavior: 'smooth' });
    clearInterval(scrollerHandler);
}
    
    useEffect(() => {
        stopScroll();
        if (props.playing) {
        setTimeout(() => {
                scrollerHandler = startScroll();
        }, 25000);
        } else {
             stopScroll();
        }
    }, [props.auth,props.name]);
    

    useEffect(() => {
        APIController.getLyrics(props.auth, props.name).then(value => {
            if (value) {
                setLyrics(value)
            }
        }, [lyrics]);
    }, [props.auth,props.name]);

    return (<div ref={lyContainerref} className='lyrics-container pl-1 pr-1 pt-1'>
        <div className="flex-row flex-space flex-center btn" onClick={() => { props.show() }}>
            <h5>Lyrics</h5>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor"
            className="mercado-match close" width="16" height="16" focusable="false">
            <path d="M14 3.41L9.41 8 14 12.59 12.59 14 8 9.41 3.41 14 2 12.59 6.59 8 2 3.41 3.41 2 8 6.59 12.59 2z"></path>
        </svg>
          </div>
                <div ref={lyref} className='lyrics p-1t text-center'>
<h3 className="text-md">{lyrics}</h3>
                </div>

            </div>)
}
export default Lyrics;