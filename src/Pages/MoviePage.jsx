import {useParams} from 'react-router-dom';
import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import VideoPlayer from "./../Components/VideoPlayer";
import useAuthContext from './../hooks/useAuthContext';
import {useCreateUpdateDelete} from './../hooks/useCreateUpdateDelete';

export default function MoviePage(){
    const {state,dispatch} = useAuthContext();
    const movie = useParams();
    const [movieData, setMovieData] = React.useState(null);
    const [credit,setCredit] = React.useState(null);
    const [videos,setVideos] = React.useState(null);
    const [showModal,setShowModal] = React.useState(false);
    const [videoIndex,setVideoIndex] = React.useState(0);
    const [providers,setProviders] = React.useState(null);
    const {addGetMovietoWatchList} = useCreateUpdateDelete("Users");

    React.useEffect(()=>{
          fetch(`/.netlify/functions/fetch-movie-data?query=${movie.id}`)
            .then(res=>res.json())
            .then(data => {
              setMovieData(data.MovieData);
              setCredit(data.CreditData);
              setVideos(data.VideoData.results);
              setProviders(data.ProvidersData.results.US?.rent)
            
            })
            .catch(err => console.error(err));
        
    },[movie.id]);

    function playVideo(index){
      setShowModal(prev=>!prev);
      setVideoIndex(index);
    }

    async function addToWatchList(dataObj,uid){
      if(state.user){
        addGetMovietoWatchList(dataObj,uid);
      } else {
        dispatch({type: "RENDER_LOGIN_MODAL"})
      }
    }
    
    return (
        movieData && credit && videos ?
        <div className="single-movie-page dot flex">
        <div className="movie-page-container container flex dot" style={{backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, .75), #111), url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`}}>
              <div className="poster-container flex">
                   <LazyLoadImage
                      className="movie-poster"
                      placeholderSrc= {`https://image.tmdb.org/t/p/w300${movieData.poster_path}`} 
                      src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} 
                      alt="Movie Poster"
                      effect="blur"
                  />
                  <button className="cs-button watch" onClick={()=>addToWatchList({...movieData, uid: state?.user?.uid, movieId: movieData.id}, state?.user?.uid )}>Add to Watchlist</button>
              </div>
             <div className="movie-details flex">
                <h1 className="movie-title">{movieData.original_title} [{movieData.release_date.slice(0,4)}]</h1>
                {showModal && <VideoPlayer link={videos[videoIndex]} showPlayer={setShowModal}/>}
                {videos && 
                <div className="box-container trailers-box flex">
                {videos[0] && <h4>Trailer and Videos</h4>}
                <ul className="links">
                  {videos.slice(0,5).map((video,index)=><li key={index}><button onClick={()=>playVideo(index)} className="btn">{video.name}</button></li>)}
                </ul>
                </div>
                  }
                <div className="box-container flex">
                    <h4>Plot Details</h4>
                    <p className="movie-overview">{movieData.overview}</p>
                </div>
                <div className="genres-box flex">
                  <h4>Genres</h4>
                  <ul className="flex">
                  {movieData.genres.map((genre,index)=><li key={index}>{genre.name}</li>)}
                  </ul>
                </div>
                
                  {providers ?
                        <div className="providers-box flex">
                          <h4>Available On</h4>
                          <div className="provider-logo-box flex">
                                {providers.map((provider,index)=>(
                                  <div className="provider-logo-info flex" key={index}>
                                    {provider.logo_path && 
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                                        className="company-logo"
                                    />}
                                    <p>{provider.provider_name}</p>
                                  </div>
                                  ))}
                            </div>
                        </div> : <p>May not be available on streaming platforms yet</p>}  
                {movieData.production_companies[1] &&
                  <div className="box-container flex">
                      <h4>Produced By</h4>
                      <div className="producers-list flex">
                            {movieData.production_companies.map((company,index)=>(
                              <div className="producer-details" key={index}>
                                {company.logo_path && <img
                                    src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                                    className="company-logo"
                                  />}
                              </div>
                      ))}
                      </div>
                  </div>}
                <div className="actors-box flex">
                  {credit.cast.length!=0 && <h4>Starring</h4>}
                  <div className="actors-info flex">
                  {credit.cast.slice(0,10).map((actor,index)=>(
                        <div className="actor-details flex" key={index}>
                            {actor.profile_path &&<>
                            <p className="actor-name">{actor.name}</p>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                                className="actor-profile-image"
                            />
                            </>}
                        </div>
                        ))}
                  </div>
                </div>
             </div>
          </div>
        </div> : <p className="loading">Loading ...</p>
    )
}