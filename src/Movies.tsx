import React from "react";
import Card from "./Card";
import "./styles.css";

interface movieArrayProps{
    movieArray:any[];
    getMovieIdClick:Function
}
export default function Movies(props:movieArrayProps){
    const movieArrayDisplay=props.movieArray.map(function(item:any){
            return (
                <Card key={item.id} item={item} getMovieIdClick={props.getMovieIdClick}
                id={item.id}/>
            )
    })
    return (
        <div className="movies">
       {movieArrayDisplay}
        </div>
    )
}