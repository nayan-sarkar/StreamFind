import React from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import {useCreateUpdateDelete} from './../hooks/useCreateUpdateDelete';
import useAuthContext from './../hooks/useAuthContext';

const collectioName = "WatchList";

export default function SearchResults(){
    const {getUserData} = useCreateUpdateDelete("Users");
    
    const {state} = useAuthContext();

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q");

    const getLocalData = JSON.parse(localStorage.getItem("watchList"));

    const [watchList,setWatchList] = React.useState(null);

    React.useEffect(()=>{
        async function test(){
            const result = await getUserData("Users",state.user.uid);
            setWatchList(result['WatchList'])
        }
            test()
                
                // return ()=> console.log("effect stopped")
    },[])
    
    return (
        <>
        {watchList ?  <div className="container search-results flex">
            {watchList.length===0 && <p style={{width: "100%", textAlign: "center", minHeight: "50vh", marginTop: "10em"}}>No Movies in Watch List</p>}
            <div className="search__posters flex">
                {
                     watchList.map((movie,index)=>(
                        <Link to={`/movie/${movie.movieId}`} key={index}>
                        {movie.poster_path && movie.title && <div className = "movie__card flex">
                            <img
                                src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            />
                            <p className="movie__title">{movie.title}</p>
                        </div>}
                        </Link>
                        ))
                }
            </div>
        </div> : <p className="loading">No Movies in Watch List</p>}
        </>)
}