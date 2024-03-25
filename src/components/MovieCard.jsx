import React from 'react';
import {useState} from 'react';

function MovieCard({poster_path,name,handleAddToWatchlist,movieObj,handleRemoveFromWatchlist,watchlist}) {
  const [currentEmoji,setCurrentEmoji]=useState();
  function doesContain(movieObj){
   for(let i=0;i<watchlist.length;i++){
     if(watchlist[i].id==movieObj.id){
      return true
     }
   }
   return false
  }


  return (
    <div className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-300' style={{backgroundImage : `url(https://images.tmdb.org/t/p/original/${poster_path})`,position:'relative',}} > 
    
    {doesContain(movieObj)?
    (<div className='m-4  h-8 w-8 flex justify-center items-center rounded-lg bg-gray-900/60'style={{position: 'relative',right: '-140px',}} onClick={()=>(handleRemoveFromWatchlist(movieObj))}>&#10060;</div>)  :
    <div className='m-4  h-8 w-8 flex justify-center items-center rounded-lg bg-gray-900/60' style={{position: 'relative',right: '-140px',}} onClick={()=>(handleAddToWatchlist(movieObj))}>
      &#128525;
    </div>
  
  }
      <div style={{position:'absolute', bottom:'5px',}} className=" text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;



