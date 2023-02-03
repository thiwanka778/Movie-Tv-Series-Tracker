import React from "react";
import "./styles.css";
import Rating from '@mui/material/Rating';
import {useNavigate} from "react-router-dom";

interface itemProps{
    item:any,
    getMovieIdClick:Function
}

export default function Card(props:itemProps){
    const navigate=useNavigate();
    let stringLength:number=props.item.original_title.length;
    let title:string;
    let rest:string="";
    if (stringLength<57){
        title=props.item.original_title;
    }
    else{
        for(let i:number=0;i<=55;i++){
            rest=rest+props.item.original_title[i];
        }
        title=rest;
    }
    
    let imgUrl:string=`https://www.themoviedb.org/t/p/w220_and_h330_face${props.item.poster_path}`
    let movieDetail:string=`/movie-detail/${props.item.id}&${props.item.original_title}`;
    return (
        <div onClick={()=>props.getMovieIdClick(props.item.id)} >
          <main className="card" onClick={()=>navigate(movieDetail)}>
            <img className="img" src={imgUrl} alt="network-error"/>
            <section>
            <Rating name="read-only" value={props.item.vote_average/2} precision={0.5} readOnly />
            </section>
            {stringLength<57 &&<p className="title">{title}</p>}
           {stringLength>=57 && <p className="title">{title}<span>...</span></p>}
           <p className="date">{props.item.release_date}</p>

            </main>  
        </div>
    )
}