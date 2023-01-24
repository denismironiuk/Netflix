import axios from "axios";
import React, { useState, useEffect, useRef,lazy,Suspense,useId } from "react";
import "./Row.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";


const Movie=lazy(()=>import('./movie/Movie'))

// Row component for displaying a row of movies
function Row({ request, title }) {
  // generates unique id 
  const id=useId()
  // State for the list of movies
  const [movies, setMovies] = useState([]);

  // Fetching the movies from the passed in request URL
  useEffect(() => {
    axios.get(request).then((response) => {
      setMovies(response.data.results);
    });
  }, [request]);
  // useRef for the slider container
  const slider = useRef();
  // Method to slide the movies left
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  // Method to slide the movies right
const slideRight = () => {
  slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <div className="row-container">
      <h2>{title}</h2>
      <div>
        <div className="container">
          <BsArrowLeftCircle onClick={slideLeft} />
          <div ref={slider} className="slider">
            {movies.map((el) => {
              return (
                <Suspense key={el.id} fallback={<div>Loading...</div>}>
                <Movie key={el.id} id={el.id} path={el?.backdrop_path} title={el?.title}/>
                </Suspense>
              );
            })}
          </div>
          <BsArrowRightCircle onClick={slideRight} />
        </div>
      </div>
    </div>
  );
}

export default Row;
