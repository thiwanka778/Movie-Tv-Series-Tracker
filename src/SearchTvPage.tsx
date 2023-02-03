import React from 'react';
import "./styles.css";
import TextField from '@mui/material/TextField';
import GetTvCard from "./GetTvCard";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface stpProps{
  tvName:string|null,
  setTvName:React.Dispatch<React.SetStateAction<string|null>>,
  getTvIdClick:Function
}

export default function  SearchTvPage (props:stpProps) {
  const [getTv,setGetTv]=React.useState<any[]>([]);
  function handleChange(event:any){
    const {value}=event.target;
      props.setTvName(value)
 } 

  let getTvUrl:string=`https://api.themoviedb.org/3/search/tv?api_key=be4953a1d5d30aa10b9c264bf0c85e93&language=en-US&page=1&query=${props.tvName}`
React.useEffect(function(){
  if(props.tvName!==""){
    fetch(getTvUrl)
    .then(res=>res.json())
    .then(data=>setGetTv(data.results))
  }
    
},[getTvUrl,props.tvName])
const tvGrid:any[]=getTv.map(function(item:any){
  return (
    <GetTvCard key={item.id} item={item} getTvIdClick={props.getTvIdClick}/>
  )
  })

  function tvClear(){
    props.setTvName("")
  }
  return (
    <main className="smp">

    <section className="smp-a">
     <div>
     <TextField
          label="Search Tv Series"
          size="small"
          value={props.tvName}
          onChange={handleChange}
        />
     </div>
     {props.tvName!=="" && <div onClick={tvClear} className="clear-btn">
 <Button startIcon={<DeleteForeverIcon fontSize="small"/>} variant="contained" size="small" color="error">clear</Button>
 </div>}
    </section>

  {props.tvName!=="" &&  <section className="smp-b">
      {tvGrid}
    </section>}
    </main>
  )
}
