import React from 'react';
import Layout from './Components/Layout';
import IsAuthenticated from './Components/IsAuthenticated';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import MoviePage from './Pages/MoviePage';
import SearchResults from './Pages/SearchResults';
import WatchList from './Pages/WatchList';
import useAuthContext from './hooks/useAuthContext';

import './style.css'

function App(){

    const {state} = useAuthContext();

    return (
        <>
        {state.authIsReady &&
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route element = {<IsAuthenticated />}>
                    <Route path="watchlist" element ={<WatchList/>}/>
                </Route>
                <Route index element={<Home/>}/>
                <Route path="movie/:id" element ={<MoviePage/>}/>
                <Route path="search" element ={<SearchResults/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
        }
        </>
    )
}

export default App;