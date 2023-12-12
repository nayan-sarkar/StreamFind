import {useSearchParams, Link} from 'react-router-dom';

import React from 'react';

export default function SearchResults(){

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q");

    const getLocalData = JSON.parse(localStorage.getItem("search-results"));

    const [searchResults,setSearchResults] = React.useState(null || getLocalData);

    React.useEffect(()=>{
        const prevQuery = JSON.parse(localStorage.getItem("search-query"))
        if(!searchResults || prevQuery!==query){
            fetch(`/.netlify/functions/fetch-search-results?query=${query}`)
            .then(response => response.json())
            .then(data => {
                            localStorage.setItem("search-results", JSON.stringify(data.results.filter((movie)=>movie.poster_path && movie.title)))
                            localStorage.setItem("search-query", JSON.stringify(query))
                            setSearchResults(JSON.parse(localStorage.getItem("search-results")))
                        })
            .catch(err => console.error(err));
        }
        

        console.log("effect mounted");

        return ()=>console.log("effect unmounted")

        
    },[query])

   
    return (
        searchResults ?  <div className="container search-results flex">
            {console.log(searchResults)}
            {searchResults.length===0 && <p style={{width: "100%", textAlign: "center", minHeight: "50vh", marginTop: "10em"}}>No Results Found</p>}
            <div className="search__posters flex">
                {
                     searchResults.map((movie,index)=>(
                        <Link to={`/movie/${movie.id}`} key={index}>
                        {movie.poster_path && movie.title && <div className = "movie__card flex">
                            <img
                                src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            />
                            <p className="movie__title">{`${movie.title} [${movie.release_date.slice(0,4)}]`}</p>
                        </div>}
                        </Link>
                        ))
                }
            </div>
        </div> : <p classname="locding">Loading...</p>)
}