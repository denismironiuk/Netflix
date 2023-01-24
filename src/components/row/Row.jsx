import axios from "axios";
import React, { useState, useEffect, useRef,lazy,Suspense,useId } from "react";
import "./Row.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";


const Movie=lazy(()=>import('./movie/Movie'))

function Row({ request, title }) {
  const id=useId()
  const [movies, setMovies] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(() => {
    axios.get(request).then((response) => {
      setMovies(response.data.results);
    });
  }, [request]);
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
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
