import React from 'react';
import {Link} from 'react-router-dom';

export default function HeroBanner(){

    const getLocalData = JSON.parse(localStorage.getItem("banner-image"));

    const [movieData,setMovieData] = React.useState(null || getLocalData);

    React.useEffect(()=>{

        const MOVIE_NAME = "Avengers";

        if(!movieData){
            fetch(`/.netlify/functions/fetch-search-results?query=${MOVIE_NAME}`) 
            .then(response => response.json())
            .then(data=>
                {
                    localStorage.setItem("banner-image",JSON.stringify(data.results[0]))
                    setMovieData(JSON.parse(localStorage.getItem("banner-image")));
                })        
            .catch(err => console.error(err));
        }
    },[]);

    return (

        movieData ? 
        <>
            <div className="banner" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`}}>
                <Link to={`movie/${movieData.id}`}>
                <div className="hero-container">
                    <h1 className="hero-title">{movieData.original_title}</h1>
                    <p className="movie-plot">{movieData.overview.slice(0,116)}</p>
                </div>
                </Link>
                <div className="hero-fade"></div>
            </div>
        </> 
        : <p>Loading</p>
    )
}