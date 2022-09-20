import APIController from '../api/spotifyApi'
import { useState, useEffect } from "react"; 
import PublicSession from '../components/publicSession';
import { LoadingSession } from '../components/loadingSession';
import PublicSessionImusic from '../components/publicSessionImusic';
import Users from './users';
import Cookies from 'universal-cookie';
function Discover() {
const cookies = new Cookies();
  const [genre, setGenre] = useState([]);
  const token = cookies.get('access_token');
  async function init() {
     APIController.getToken().then(value => {
        let token = value;
       APIController.getGenres(token).then((values) => {
         setGenre(values);
       });
      });
  };
  
  
  useEffect(() => {
    document.title = "IMusic Room";
    init();
  }, []);
  
  return (
    <div className=" pt-1 left-20">
      <div className='pt-2 pl-01'>
<h1 className="fixed bg-primary title">iMusic Rooms</h1>
      </div>
      
      {token && token.length > 10 ?  <Users />: null}
      <PublicSessionImusic name={"IMusic Public Rooms"} type={'public' } />
    <PublicSessionImusic name={"IMusic Private Rooms"} type={'private' } />

      {genre.length < 1 ? <><LoadingSession /></> : genre.map(value => {
      // console.log(value)
                  return <PublicSession name={value.name} type={'public'} id={value.id} key={value.id} />
              })}
</div>
  );
}

export default Discover;