import React from 'react'
import Main from '../components/main/Main'
import Row from '../components/row/Row'
import requests from '../Request'

function Home() {
  return (
    <>
      <Main />
      
      <Row  title={'Popular'} request={requests.popularMovies} />
      <Row  title={'Trending'} request={requests.trendingMovies} />
      <Row  title={'Top Coming'} request={requests.topRatedMovies} />
      <Row  title={'Up Coming'} request={requests.upcomingMovies} />
    </>
  )
}

export default Home