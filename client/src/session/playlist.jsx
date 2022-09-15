import { useState } from "react";
import PlayList from "../components/playList";
import store from "../redux/store"
function MyMessage({ value,isAdmin,type,id }) {
    const [expand, setexpand] = useState("50px");
    const [iconShow, seticonShow] = useState(true);
   
    
   async function addAll() {
        if (value.length > 0) {
            const payload = {
        type: "current-play",
        payload: [...value]
            }
        store.dispatch(payload);
        }
   }
    
  return (
      <>
      <div className="messaging" style={{ height: expand }}>
    <div className="flex-row flex-center flex-space ">
        <div className="flex-row flex-center pb-1 pt-01">
            <img className="b-r-01 bg-secondary ml-01"
                src="https://ui-avatars.com/api/?background=random" width="40px"
                height="40px" alt=""/>
            <h4 className="p-01">Room playlist</h4>
        </div>


        <div className="flex-row flex-center">
                  <div onClick={() => {
                      setexpand("75%");
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
          <hr className="bg-primary" />
          
              <div className="messages-list"> 
                  
                  <div onClick={addAll} style={{display:type==='private'?isAdmin?'block':'none':'block'}} className="bg-danger p-01 text-center btn">
                      Add All To Query
                  </div>


                  {value.map(values => {
                      return <PlayList key={values.audio+values.len} isAdmin={isAdmin} type={type} id={id}  values={values}/>
                     })}
<br />
    
          </div>
          </div>
         
      </>
  );
}

export default MyMessage;