import { useState } from "react";
import './App.css';

function toHex(n:number):string{
  return n.toString(16).padStart(2,'0')
}

type SliderProps ={
  label: string
  color:string
  value:number
  onChange: (n:number)=> void
}

function Slider({label,color,value,onChange}:SliderProps){
  return(
    <div className="slider-group">
      <div className="slider-header">
        <span style={{color}}>{label}</span>
        <span>{value}</span>
      </div>
      <input type="range" value={value} min={0} max={255} onChange={e=>onChange(Number(e.target.value))}/>
    </div>
  )
}

type SwatchProps ={hex: string;onClick:()=>void}

function Swatch(hex,onClick:SwatchProps){
return(
  <button className="swatch-dot" style={{background:hex}} onClick={onclick}/>
    
  
)
}

type SavedColor={
  r:number
  g:number
  b:number
  hex:string
}
