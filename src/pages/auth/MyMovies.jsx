import React, { useEffect, useState, useRef } from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import Movie from "../../components/row/movie/Movie";
import { UserAuth } from "../../context/AuhtContext";
import { db } from "../../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";

function MyMovies({ title }) {
  const [movies, setMovies] = useState([]);
  const [like, setLike] = useState(false);
  const {user}=UserAuth()

  const slider = useRef();
  useEffect(() => {
    onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
        setMovies(doc.data()?.savedMovies)
    })
  }, [user?.email]);
  console.log(movies)
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
            {movies ? (movies.map((el) => {
              return (
                <Movie
                  key={el.id}
                  id={el.id}
                  path={el?.imageSrc}
                  title={el?.title}
                />
              );
            })):
            <div style={{color:'white',textAlign:'center',fontSize:'5rem'}}>
                <p>Movies list is empty</p>
            </div>
            }
          </div>
          <BsArrowRightCircle onClick={slideRight} />
        </div>
      </div>
    </div>
  );
}

export default MyMovies;
