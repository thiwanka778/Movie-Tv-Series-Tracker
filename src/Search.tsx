import React from "react";
import {Box,Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./styles.css";
import SearchMoviePage from "./SearchMoviePage";
import SearchTvPage from "./SearchTvPage";


interface searchProps {
    genres:any[],
    movieName:string|null,
    setMovieName:React.Dispatch<React.SetStateAction<string|null>>,
    tvName:string|null,
    setTvName:React.Dispatch<React.SetStateAction<string|null>>,
    getMovieIdClick:Function,
    getTvIdClick:Function,
    
}


export default function Search(props:searchProps){

const [value,setValue]=React.useState<string>(()=>{
  const vdata=window.localStorage.getItem("value");
  return vdata?JSON.parse(vdata):"1"
});

  const handleChange=(event:React.SyntheticEvent,newValue:string)=>{
    setValue(newValue)
  }


  React.useEffect(()=>{
     window.localStorage.setItem("value",JSON.stringify(value))
  },[value]);

    return (
        < div className="search-page">
            
          <Box>
            <TabContext value={value} >
              <TabList onChange={handleChange} centered>
              <Tab label="Movies" value="1"/>
              <Tab label="Tv Series" value="2"/>
              </TabList>
              <TabPanel value="1"><SearchMoviePage 
              
               genres={props.genres} getMovieIdClick={props.getMovieIdClick}
              movieName={props.movieName}
              setMovieName={props.setMovieName}
              /></TabPanel>
              <TabPanel value="2"><SearchTvPage getTvIdClick={props.getTvIdClick}
              tvName={props.tvName}
              setTvName={props.setTvName}/></TabPanel>
            </TabContext>
          </Box>
       
     
   
        
            
              
       
        </div>
    )
}


