import React, { useEffect,useState } from 'react'
import Banner from './Banner'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({handleAddToWatchlist,handleRemoveFromWatchlist,watchlist}) {
  const [movies,setMovies]=useState([])
  const [currentPage,setCurrentPage]=useState(1);
  function onLeftClick(){
    if(currentPage>1)
    setCurrentPage(currentPage-1);
  }
  function onRightClick(){
    setCurrentPage(currentPage+1);
  }
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1be05feb312b2d88af94e55dc714a66&language=en-US&page=${currentPage}`).then(function(res){setMovies(res.data.results)})
  },[currentPage])
  return (
    <div>
      
      <Banner></Banner>
      <h1 className='text-center text-3xl m-10  font-bold'>
        Trending Movies
      </h1>

      <div className='flex flex-row flex-wrap justify-around m-10 mb-5 gap-8'>
       {
        movies.map(movie=>(
           <MovieCard key={movie.id} poster_path={movie.poster_path} name={movie.original_title} handleAddToWatchlist={handleAddToWatchlist} movieObj={movie} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}></MovieCard>
        ))
       }
        

      </div>
      <Pagination currentPage={currentPage} onLeftClick={onLeftClick} onRightClick={onRightClick}></Pagination>

    </div>
  )
}

export default Movies

//https://api.themoviedb.org/3/movie/popular?api_key=a1be05feb312b2d88af94e55dc714a66&language=en-US&page=1