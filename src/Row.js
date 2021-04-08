import React, {useState, useEffect} from 'react';
import axios from "./axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/w500/";

const Row = ({title, fetchUrl, isLargeRow}) =>{
 const [movies, setMovies] = useState([]);
 const [trailerUrl, setTrailerUrl] = useState("");

 const opts = {
   height: "390",
   width: "100%",
   playerVars: {
     autoplay: 1,
   },
 };

 const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title ||  "")
      .then(url =>{
        const  urlParams = new URLSearchParams (new URL(url).search);
        console.log(urlParams);
        setTrailerUrl(urlParams.get("v"));
      }).catch((error) => console.log(error))
    }
  };

    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        console.log(request);
        return request;
          }
      fetchData();
    }, [fetchUrl]);

console.table(movies);

  return(
  <div className="row">
 {/* title*/}

   <h2>{title}</h2>

   <div className="row_posters">
     {/* posters*/}
   {movies.map(movie=>(

    <img
      key={movie.id}
      onClick={() => handleClick(movie)}
      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
      src={`${base_url}${isLargeRow ? movie.poster_path :movie.backdrop_path}`}
      alt={movie.name}/>

))}

</div>
{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row;
