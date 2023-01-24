import React, { useEffect, useLayoutEffect, useState } from 'react'
import requests from '../../Request'
import axios from 'axios'
import './Main.css'
import Navbar from '../navbar/Navbar';

function Main() {
  const[movies,setMovies] =useState([])
  const movie=movies[Math.floor(Math.random() * movies.length-1)]
 useLayoutEffect(()=>{
    axios.get(requests.popularMovies).then(response=>{
      setMovies(response.data.results)
    })

   

  },[])

  console.log(movie)
  return <>
  
    <div className='main-container' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`, backgroundRepeat: 'no-repeat',}}>
    <Navbar/>
      <div className='main-movie'>
     
      <div className='button-container'>
        <h1>{movie?.title}</h1>
        <div>
        <button className='play'>Play</button>
        <button className='watch' >Watch Later</button>
        </div>
        <p>Released: {movie?.release_date}</p>
        <p>{movie?.overview}</p>
      </div>
      </div>
    </div>
    </>
}

export default Main