import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { MouseEventHandler } from 'react';
import { useState } from 'react';

enum CardStates{
    Undefined,
    Tick,
    Cross
}

export default function QuestionCard(props:{
    id: number
    question:string,
    yesChild: number|null,
    noChild :number|null          //should either both be null or neither be null
    onClickYes: ()=>void ,     //the function that will be called when tick is clicked
    onClickNo: ()=>void,      //function called when cross clicked

}){
    const [state,setState] = useState(CardStates.Undefined)


  function onYes(){
    setState(CardStates.Tick)
    props.onClickYes()
    
  }

  function onNo(){
    setState(CardStates.Cross)
    props.onClickNo();
    
  }

  
return(
    <div className="m-4 xs:max-w-[475px] mx-auto relative p-4 rounded-lg bg-[#446043] text-[#f9f7f4]">

   
    {props.yesChild!=null && props.noChild!=null ? (<>
        <p className='mb-8 '>{props.question}</p>
        <button onClick={onYes} ><FontAwesomeIcon className="absolute bottom-4 left-4 block" icon={faCircleCheck} size="2xl" style={{color: (state===CardStates.Tick)? "#4ade80":"#f9f7f4"}} /></button>
        <button onClick={onNo}><FontAwesomeIcon className="absolute bottom-4 right-4 block" icon={faCircleXmark} size="2xl" style={{color: (state===CardStates.Cross)? "#FD7185":"#f9f7f4"}} /></button></>)
    : props.yesChild==null && props.noChild==null ?
    <p >{props.question}</p> 
    : "Error - should have either two children or none"}
    
    
    
    
    
</div>
)
}