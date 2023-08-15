import parse from 'html-react-parser';
import { Typewriter } from 'react-simple-typewriter';
import { useState } from "react";

export default function DescriptionSpan(props:{
    image: string,
    description: string,     //no effects such as bold or italics allowed
}){
  
    const  [over, setOver] = useState(false);
    return(
        <>
        <span className="description-span"><img src={props.image} onMouseOver={()=>setOver(true)}/>
                            {over && ( <div className="description-text"><Typewriter words={[props.description]}
                          typeSpeed={50}
                            loop={1}
                            cursor={false}/> </div>)}</span>
                           
        </>
    )

}