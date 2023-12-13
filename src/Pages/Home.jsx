import MovieList from './../Components/MovieList';
import HeroBanner from './../Components/HeroBanner';
import CustomList from './../Components/CustomList';

export default function Home(){

    return (
        <>
            <HeroBanner/>
            <CustomList query= {"trending"} listName = {"Trending"}/>
            <MovieList name={"Now Playing"} genre_page={"now_playing,2"}/>
            <MovieList name={"Upcoming"} genre_page={"upcoming,3"}/>
            <MovieList name={"Popular"} genre_page={"popular,3"}/>
            <MovieList name={"Top Rated"} genre_page={"top_rated,2"}/>
        </>
    )
}