import React from 'react';
import NavBar from './NavBar';
import Movies from './Movies';
import Tv from './Tv';
import Search from './Search';
import {Routes,Route} from "react-router-dom";
import MovieClick from "./MovieClick";
import TvClick from "./TvClick";


interface genresType {
  id:number,
  name:string
}
function App() {
 
const [movieArray,setMovieArray]=React.useState<any[]>([]);
const [tvArray,setTvArray]=React.useState<any[]>([]);
const [genres,setGenres]=React.useState<genresType[]>([]);
const [movieName,setMovieName]=React.useState<string|null>(()=>{
  const mnData=window.localStorage.getItem("movieName");
  return mnData?JSON.parse(mnData):""
})

const [tvName,setTvName]=React.useState<string|null>(()=>{
  const tvData=window.localStorage.getItem("tvName");
  return tvData?JSON.parse(tvData):""
})



const [movieId,setMovieId]=React.useState<number|string>(()=>{
  const localData=window.localStorage.getItem("movieId");
  return localData?JSON.parse(localData):0;
});

const [tvId,setTvId]=React.useState<number>(()=>{
  const tvIdLocalData=window.localStorage.getItem("tvId");
  return tvIdLocalData ? JSON.parse(tvIdLocalData):0;
});


let apiKey:string=`${process.env.REACT_APP_API_KEY}`;
let popularMovieUrl:string=`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
let popularTvUrl:string=`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
let genereApi:string="https://api.themoviedb.org/3/genre/movie/list?api_key=be4953a1d5d30aa10b9c264bf0c85e93&language=en-US";

React.useEffect(function(){
  
  fetch(popularMovieUrl)
  .then(res=>res.json())
  .then(data=>setMovieArray(data.results))
},[popularMovieUrl])

React.useEffect(function(){
  fetch(popularTvUrl)
  .then(res=>res.json())
  .then(data=>setTvArray(data.results))
},[popularTvUrl])

React.useEffect(function(){
  fetch(genereApi)
  .then(res=>res.json())
  .then(data=>setGenres(data.genres))
},[genereApi])



function getMovieIdClick(id:number|string){
    setMovieId(function(prevState:number|string){
             return id;
    })
}


React.useEffect(()=>{
window.localStorage.setItem("movieId",JSON.stringify(movieId))
},[movieId]);

function getTvIdClick(id:number){
  setTvId(function(prevState:number){
           return id;
  })
}

React.useEffect(()=>{
  window.localStorage.setItem("tvId",JSON.stringify(tvId))
  },[tvId])

  
React.useEffect(()=>{
window.localStorage.setItem("movieName",JSON.stringify(movieName))
},[movieName]);

React.useEffect(()=>{
  window.localStorage.setItem("tvName",JSON.stringify(tvName))
  },[tvName])

    

  return (
    <div >
     <NavBar/>
     <Routes>
      <Route path="/" element={<Movies  movieArray={movieArray} getMovieIdClick={getMovieIdClick}/>}></Route>
     <Route path="tv-series" element={<Tv tvArray={tvArray} getTvIdClick={getTvIdClick} />}>
      
     </Route>


     <Route path="search-by-name-or-anything" element={<Search genres={genres} 
     getMovieIdClick={getMovieIdClick}
     getTvIdClick={getTvIdClick}
     movieName={movieName}
     setMovieName={setMovieName}
     tvName={tvName}
     setTvName={setTvName}
     />}> </Route>
    
     <Route path="/movie-detail/:movieId" element={<MovieClick movieId={movieId}/>}> </Route>
     
     <Route path="/tv-show-detail/:tvId" element={<TvClick tvId={tvId}/>}></Route>
    
     </Routes>
    </div>
  )
}

export default App;
