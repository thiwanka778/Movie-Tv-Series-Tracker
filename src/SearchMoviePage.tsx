import React from 'react'
import "./styles.css";
import TextField from '@mui/material/TextField';
import GetMovieCard from "./GetMovieCard";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface smpProps{
  genres:any[],
  movieName:string|null,
  setMovieName:React.Dispatch<React.SetStateAction<string|null>>,
  getMovieIdClick:Function,
  
  
  
}

export default function  SearchMoviePage  (props:smpProps)  {
  const [getMovie,setGetMovie]=React.useState<any[]>([]);


let getMovieUrl:string=`
https://api.themoviedb.org/3/search/movie?api_key=be4953a1d5d30aa10b9c264bf0c85e93&language=en-US&query=${props.movieName}&page=1&include_adult=true`
React.useEffect(function(){
  if(props.movieName!==""){
    fetch(getMovieUrl)
    .then(res=>res.json())
    .then(data=>setGetMovie(data.results))
  }
    
},[getMovieUrl,props.movieName])

function handleChange(event:any){
  const {value}=event.target;
    props.setMovieName(value)
} 


const movieGrid:any[]=getMovie.map(function(item:any){
return (
  <GetMovieCard key={item.id} item={item} getMovieIdClick={props.getMovieIdClick}/>
)
})


function movieClear(){
  props.setMovieName("");
}


  return (
    <main className="smp">

    <section className="smp-a">
     <div>
     <TextField
          label="Search Movies"
          size="small"
          value={props.movieName}
          onChange={handleChange}
        />
 </div>
 {props.movieName!=="" && <div onClick={movieClear} className="clear-btn">
 <Button startIcon={<DeleteForeverIcon fontSize="small"/>} variant="contained" size="small" color="error">clear</Button>
 </div>}
    </section>

  {props.movieName!=="" &&  <section className="smp-b">
      {movieGrid}
    </section>}
    </main>
  )
}
