import React from "react";
import "./styles.css";
import TvCard from "./TvCard";
interface tvArrayProps{
    tvArray:any[],
    getTvIdClick:Function
}
export default function Tv(props:tvArrayProps){
    const tvArrayDisplay=props.tvArray.map(function(item:any){
        return (
            <TvCard key={item.id} item={item} getTvIdClick={props.getTvIdClick}/>
        )
})
return (
    <div className="movies">
   {tvArrayDisplay}
    </div>
)
}