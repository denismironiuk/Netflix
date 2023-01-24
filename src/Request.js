const API_KEY=process.env.REACT_APP_KEY

const requests={
    popularMovies:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    topRatedMovies:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    upcomingMovies:`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    trendingMovies:`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
}

export default requests