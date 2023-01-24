import React, { useEffect, useState, useRef } from "react";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Movie from "../../components/row/movie/Movie";
import { UserAuth } from "../../context/AuhtContext";
import { db } from "../../firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";

// MyMovies component that takes in a title prop and displays a list of movies saved by the user.
function MyMovies({ title }) {
  // State to hold the list of movies
  const [movies, setMovies] = useState([]);
  
  // Using the UserAuth context to access the currently logged in user
  const { user } = UserAuth();

  // useRef for the slider container
  const slider = useRef();
  
  // Fetching the user's saved movies from Firebase Firestore on component mount
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  // Storing the document reference for the user's saved movies
  const movieID = doc(db, "users", `${user?.email}`);

  // Method to delete a movie from the user's saved movies list
  const deleteMovie = async (id) => {
    try{
      //filtering the movie from the list
      const result=movies.filter(movie=>movie.id!==id)
      //update the savedMovies field of the user's document with the filtered list
      await updateDoc(movieID,{
        savedMovies:result
      })
      //alerting the user that the movie has been deleted
      alert('Movie deleted successfuly!!')

    }catch (err){
      console.log(err)

    }
  }
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
            {movies ? (
              movies.map((el) => {
                return (
                 
                  <div key={el.id} className="movie">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${el?.imageSrc}`}
                      alt={el?.title}
                    />

                    <div className="movie-title">
                      <p>{el?.title}</p>
                      <p onClick={()=>deleteMovie(el.id)} className="delete-movie"><MdDelete/></p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "5rem",
                }}
              >
                <p>Movies list is empty</p>
              </div>
            )}
          </div>
          <BsArrowRightCircle onClick={slideRight} />
        </div>
      </div>
    </div>
  );
}

export default MyMovies;
