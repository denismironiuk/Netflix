import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Movie.css";
import { UserAuth } from "../../../context/AuhtContext";
import { db } from "../../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

// Movie component for displaying a movie
function Movie(props) {
  // State for the like button
  const [like, setLike] = useState(false);
  // State for the save button
  const [saved, setSaved] = useState(false);
  // Getting the current user from the UserAuth context
  const { user } = UserAuth();

  // Creating a reference to the user's document in Firestore
  const movieID = doc(db, "users", `${user?.email}`);

  // Method for saving a movie
  const saveMovie = async () => {
    // Checking if the user is logged in
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      // Updating the user's savedMovies array in Firestore with the current movie
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: props.id,
          title: props.title,
          imageSrc: props.path,
        }),
      });
    } else {
      // alert for not authorization users
      alert("Only authorization users can save movie!!!");
    }
  };
  return (
    <>
      <div className="movie">
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.path}`}
          alt={props.title}
        />

        <div className="movie-title">
          <p>{props.title}</p>
          <p className="like" onClick={saveMovie}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
        </div>
      </div>
    </>
  );
}

export default Movie;
