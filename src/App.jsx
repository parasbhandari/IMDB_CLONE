import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'



function App() {
  let [watchlist,setWatchList]= useState([])

  let handleAddToWatchlist=(movieObj)=>{
    let newWatchlist=[...watchlist,movieObj];
    localStorage.setItem('moviesApp',JSON.stringify(newWatchlist));
    setWatchList(newWatchlist);
   
  }
  let handleRemoveFromWatchlist=(movieObj)=>{
    let filteredWatchlist=watchlist.filter((movie)=>(
       movie.id!=movieObj.id
    ))
    
    localStorage.setItem('moviesApp',JSON.stringify(filteredWatchlist));
    setWatchList(filteredWatchlist);
  }
  useEffect(()=>{
    let moviesFromLocalStorage=localStorage.getItem('moviesApp');
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))

  },[])
  return (
   <>
   
   <BrowserRouter>
   
   <Navbar></Navbar>

   <Routes>
    <Route path='/' element={<Movies handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist} ></Movies>}></Route>
   
   
   <Route path='/watchlist' element={<Watchlist watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist}></Watchlist>}></Route>
   </Routes>

   </BrowserRouter>
   </>
  )
}

export default App
