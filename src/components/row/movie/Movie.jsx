import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Movie.css";
import { UserAuth } from "../../../context/AuhtContext";
import { db } from "../../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function Movie(props) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: props.id,
          title: props.title,
          imageSrc: props.path,
        }),
      });
    }else{
      alert('Only authorization users can save movie!!!')
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
          <p className="like" onClick={saveMovie}>{like ? <AiFillHeart /> : <AiOutlineHeart />}</p>
        </div>
      </div>
    </>
  );
}

export default Movie;
