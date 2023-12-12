import React from 'react';
import {Link} from 'react-router-dom';

export default function CustomList({listName,query}){

    const getLocalData = JSON.parse(localStorage.getItem(`movie-list-${query}`));

    const [MovieListData,setMovieListData] = React.useState(null || getLocalData);

    React.useEffect(()=>{
        if(!MovieListData){
            fetch(`/.netlify/functions/fetch-custom-list?query=${query}`)
            .then(response => response.json())
            .then(data=>{
                localStorage.setItem(`movie-list-${query}`, JSON.stringify(data.results.filter(x=>x.original_language==="en")))
                setMovieListData(JSON.parse(localStorage.getItem(`movie-list-${query}`)))
                })     
            .catch(err => console.error(err));
        }  
    },[]);


    return (
        MovieListData && <div className="container movielist-container">
        <div className="row">
            <h2>{listName}</h2>
            <div className="row__posters">
                {
                     MovieListData.map((movie,index)=>(
                        <Link to={`/movie/${movie.id}`} key={index}>
                        <div className = "movie__card">
                            <img
                                src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                className="row__poster" 
                            />
                            <p className="movie__title">{movie.title}</p>
                        </div>
                        </Link>
                        ))
                }
            </div>
        </div>
        </div>
    )
}