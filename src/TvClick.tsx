import React from 'react';
import "./styles2.css";
import Rating from '@mui/material/Rating';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[900],
    },
    
  },
});

interface tvClickProps{
  tvId:number
}
interface genresType{
  id?:number,
  name?:string
}
interface tvDetail{
  adult?: boolean,
  backdrop_path?: string|any,
  created_by?:any[],
  episode_run_time?: any[],
  first_air_date?: string,
  genres?: genresType[],
  homepage?: string
  id?: number,
  in_production?: boolean,
  languages?: any[],
  last_air_date?: string,
  last_episode_to_air?:any|null
  name?: string|any,
  next_episode_to_air?: null|any,
  networks?:any[],
  number_of_episodes?: number|any,
  number_of_seasons?: number|any,
  origin_country?: any[],
  original_language?: string,
  original_name?: string,
  overview?: string|any,
  popularity?: number|any,
  poster_path?: string,
  production_companies?:any[],
  production_countries?: any[],
  seasons?:any[],
  spoken_languages?: any[],
  status?: string|any,
  tagline?: string|any,
  type?: string|any,
  vote_average?: number|any,
  vote_count?: number|any
}

export default function TvClick (props:tvClickProps)  {
  const [detail,setDetail]=React.useState<tvDetail>({});
  const navigate=useNavigate();
  const [trailer,setTrailer]=React.useState<any[]>([]);

let apiUrl:string=`https://api.themoviedb.org/3/tv/${props.tvId}?api_key=be4953a1d5d30aa10b9c264bf0c85e93&language=en-US`;
React.useEffect(function(){
  if(props.tvId!==0){
    fetch(apiUrl)
    .then(res=>res.json())
    .then(data=>setDetail(data))
  } 
},[apiUrl,props.tvId])

let imgUrl:string=`https://www.themoviedb.org/t/p/w220_and_h330_face${detail.poster_path}`;




let genres=detail.genres;
    
let rest:string="";
let genresArray=genres?.map(function(item:any){
    rest=rest+item.name+" ";
       return item.name;

});
console.log(detail);

let videoUrl:string=`https://api.themoviedb.org/3/tv/${props.tvId}/videos?api_key=be4953a1d5d30aa10b9c264bf0c85e93&language=en-US`;
React.useEffect(function(){
  if(props.tvId!==0){
    fetch(videoUrl)
    .then(res=>res.json())
    .then(data=>setTrailer(data.results))
  } 
},[videoUrl,props.tvId]);

let youtubeTrailer:string="";
console.log(genresArray);
for(let i:number=0;i<trailer.length;i++){
  if(trailer[i].type==="Trailer" && trailer[i].site==="YouTube"){
       youtubeTrailer=trailer[i].key;
       break;
  } 
}
let season:string;
if(detail.number_of_seasons===1){
   season="Season";
}
else{
  season='Seasons'
}

let youtubeLink:string=`https://www.youtube.com/watch?v=${youtubeTrailer}`;
  return (
    <ThemeProvider theme={theme}>
    <main className="movie-click">

        <section className="a">
       <img className="image" src={imgUrl}  alt="network-error"/>
        </section>


        <section className="b">
          <p className="title-b">{detail.original_name} </p>
          <p className="genre">{rest}<span>{rest!==""?".":""}</span> <span>{detail.number_of_episodes}</span> <span>Episodes</span>  <span>{detail.number_of_seasons}</span> {season}</p>
          <div className="rating"> <Rating name="read-only" value={detail.vote_average/2} precision={0.5} readOnly /> <span className="vote-average">{detail.vote_average}</span> </div>
          {detail.overview !=="" && <p className="overview">Overview</p>}
          <p className="detail">{detail.overview}</p>
           <p className="date-b"> {detail.first_air_date} </p>

           { youtubeTrailer!=="" && 
           <div className="a-div">
            <a href={youtubeLink} target="_blank" className="a-tag"> <div className="trailer">
            <p className="icon"><PlayCircleOutlineIcon/></p>
            <p className="trailer-word">Trailer</p>
             </div></a>
             </div>
             }
            
          <div onClick={()=>navigate(-1)} className="back-button">
          <Button size="small" startIcon={<ArrowBackIosNewIcon fontSize="small"/>} variant="contained" color="primary">
        Back
      </Button>
          </div>
        </section>
        </main>
        </ThemeProvider>
  )
}
