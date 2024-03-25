import React, { useEffect } from 'react'
import { useState} from 'react'
import genreids from '../Utility/genre'

function Watchlist({watchlist,setWatchList,handleRemoveFromWatchlist}) {
  const [search,setSearch]=useState('')
  const [genreList,setGenreList]= useState(['All Genres'])
  const [currentGenre, setCurrentGenre]= useState('All Genres')
  let handleSearch=(e)=>{
     setSearch(e.target.value);
  }
  let sortIncreasing=()=>{
   let sortedIncreasing= watchlist.sort((movieA,movieB)=>{
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  }
  let sortDecreasing=()=>{
    let sortedDecreasing= watchlist.sort((movieA,movieB)=>{
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  }
  useEffect(()=>{
   let temp = watchlist.map((movieObj)=>{
    return genreids[movieObj.genre_ids[0]]
   })
   temp = new Set(temp)
   setGenreList(['All Genres',...temp]);
  },[watchlist])

  let handleFilter=(genre)=>{
    setCurrentGenre(genre);
  }
  return (
    <>
    <div className='flex justify-center flex-wrap m-4 gap-4'>
      {genreList.map((genre)=>(
         <div onClick={()=>handleFilter(genre)} className={ currentGenre==genre? 'flex justify-center h-[3rem] w-[9rem] bg-blue-300 rounded-xl text-white font-bold items-center':'flex justify-center h-[3rem] w-[9rem] bg-gray-300 rounded-xl text-white font-bold items-center'}>{genre}</div>
))}
    </div>
   <div className='flex justify-center my-4'>
   <input type="text" className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4' placeholder='Search movies' onChange={handleSearch} value={search} />
   </div>
   <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
    <table className='w-full text-gray-500 text-center'>
      <thead className='border-b-2'>
        <tr>
          <th>Name</th>
          <div className='flex justify-center'>
            <div className='p-2' onClick={sortIncreasing}>&uarr;</div>
          <th className='p-2'>Ratings</th>
          <div className='p-2' onClick={sortDecreasing}>&darr;</div>
          </div>
          
          <th>Popularity</th>
          <th>Genre</th>
          
        </tr>
      </thead>
      <tbody>
        {watchlist.filter((movieObj)=>{
          if(currentGenre=='All Genres'){
            return true
          } else{
            return genreids[movieObj.genre_ids[0]]==currentGenre;
          }
        }).filter((movieObj)=>{
          return movieObj.title.toLowerCase().includes(search.toLowerCase())
        }).map((movieObj)=>(
          <tr className='border-b-2'>
        <td className='flex items-center px-6 py-4'>
          <img src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt="" className='h-[6rem] w-[10rem]' />
          <div className='mx-6'>
            {movieObj.title}
          </div>
        </td>
        <td>
         {movieObj.vote_average}
        </td>
        <td>
          {movieObj.popularity}
        </td>
        <td>
          {genreids[movieObj.genre_ids[0]]}

        </td>
        <td className='text-red-800' onClick={()=>handleRemoveFromWatchlist(movieObj)}>Delete</td>
       </tr>
        ))}
       
      
      </tbody>

    </table>
   </div>
  
      
    </>
  )
}

export default Watchlist