import React from "react";
import "./styles.css";
import {useNavigate} from "react-router-dom"
import Rating from '@mui/material/Rating';

interface itemProps{
    item:any,
    getTvIdClick:Function
   
}
export default function TvCard(props:itemProps){
    const navigate=useNavigate();
    let stringLength:number=props.item.original_name.length;
    let title:string;
    let rest:string="";
    if (stringLength<57){
        title=props.item.original_name;
    }
    else{
        for(let i:number=0;i<=55;i++){
            rest=rest+props.item.original_name[i];
        }
        title=rest;
    }
   let imgUrl:string=`https://www.themoviedb.org/t/p/w220_and_h330_face${props.item.poster_path}`
   let tvDetailUrl:string=`/tv-show-detail/${props.item.id}&${props.item.original_name}`

    return (
        <div onClick={()=>props.getTvIdClick(props.item.id)}>
             <main className="card" onClick={()=>navigate(tvDetailUrl)} >
            <img className="img" src={imgUrl} alt="network-error" />
            <section>
            <Rating name="read-only" value={props.item.vote_average/2} precision={0.5} readOnly />
            </section>
         { stringLength<57 && <p className="title">{title}</p>}
         {stringLength>=57 && <p className="title">{title}<span>...</span></p>}
           <p className="date">{props.item.first_air_date}</p>

            </main>  

        </div>
    )
}