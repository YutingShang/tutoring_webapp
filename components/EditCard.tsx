import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react"

enum EditStates{
    NoEdit,
    Edit
}

export default function EditCard(props:{
    cardTitle: string,
    originalText: string,
    currentText: string|undefined
    setLatest:(arg0: string)=>void;
}){
    const [editState, setEditState] = useState(EditStates.NoEdit);
  
       
    function onToggle(){     //edit or no edit
        if (editState===EditStates.Edit){
            setEditState(EditStates.NoEdit)
            props.setLatest("")    //delete any edits made
        }else{
            setEditState(EditStates.Edit)
        }
    };

    return (<>
     <div className="break-words my-10 max-w-2xl mx-auto">
            <div className="font-medium relative px-5 leading-loose p-2 bg-gray-100 border-slate-300 border rounded-t-lg border-b-0 shadow-[inset_0px_3px_3px_rgba(0,0,0,0.03)] ">
            {props.cardTitle}
                <button onClick={onToggle}>

                
                {editState===EditStates.NoEdit?
                (<>
               <FontAwesomeIcon className="absolute right-4 top-[50%] translate-y-[-50%]" icon={faPenToSquare} style={{color: "#64748b",}} size="lg"/>
                </>):
                (<>
                <FontAwesomeIcon className="absolute right-4 top-[50%] translate-y-[-50%]" icon={faXmark} style={{color: "#64748b",}} size="lg"/>
                </>)}

                </button>
                
                
            </div>
            {props.currentText?     //whether it has been edited before
            //has been edited before - two or three boxes
            (<>        
             <div className="relative border-slate-300 border border-b-0 p-2 px-5 bg-slate-100 text-slate-500">
                {props.originalText}
                <div className="inline-block w-[65.66px]"></div>    {/*invisible block to prevent text overlapping the words*/}
                <span className="absolute right-0 bottom-0 bg-slate-300 text-slate-600 px-1">Original</span>    {/*aboslute positioned lable*/}
            </div>

            {editState===EditStates.NoEdit?    //whether it is editable
            //not editable - red box (plus grey box at the top)
            (<>
                <div className="relative border-slate-300 border p-2 px-5 bg-[#ffe6e4] text-slate-500 rounded-b-lg">
                    {props.currentText}
                    <div className="inline-block w-[65.07px]"></div>  
                    <span className="absolute right-0 bottom-0 bg-[#ffcccc] text-slate-600 px-1 rounded-br-lg">Current</span>
                </div>
            
            </>):     //editable - red box and green box (plus grey box at top)
            (<>
                <div className="relative border-slate-300 border border-b-0 p-2 px-5 bg-[#ffe6e4] text-slate-500">
                    {props.currentText}
                    <div className="inline-block w-[65.07px]"></div>  
                    <span className="absolute right-0 bottom-0 bg-[#ffcccc] text-slate-600 px-1">Current</span>
                </div>

                <div  className="relative border-slate-300 border p-2 px-5 rounded-b-lg bg-[#e1ffe7] ">
                   
                    {/* content editable span, suppressed the warning that elements are modified */}
                    <span suppressContentEditableWarning={true} contentEditable={true} onInput={e=>props.setLatest(e.currentTarget.textContent?e.currentTarget.textContent:"")} className="border-0 outline-none">{props.currentText}</span>
                    <div className="inline-block w-[37.12px]"></div>  
                    <span className="absolute right-0 bottom-0 bg-[#c2ffcf] text-slate-600 px-1 rounded-br-lg">Edit</span>
                </div>
            </>)}
            </>):     //not edited before - one or two boxes
            (<>
             
            {editState===EditStates.NoEdit?    //whether it is editable
            //not editable - one grey box
            (<>
                <div className="relative border-slate-300 border p-2 px-5 bg-slate-100 text-slate-500 rounded-b-lg">
                    {props.originalText}
                    <div className="inline-block w-[65.66px]"></div>    {/*invisible block to prevent text overlapping the words*/}
                    <span className="absolute right-0 bottom-0 bg-slate-300 text-slate-600 px-1 rounded-br-lg">Original</span>    {/*aboslute positioned lable*/}
                </div>

            </>):  //editable - one grey box and one green box
            (<>
                <div className="relative border-slate-300 border border-b-0 p-2 px-5 bg-slate-100 text-slate-500">
                {props.originalText}
                <div className="inline-block w-[65.66px]"></div>    {/*invisible block to prevent text overlapping the words*/}
                <span className="absolute right-0 bottom-0 bg-slate-300 text-slate-600 px-1">Original</span>    {/*aboslute positioned lable*/}
            </div>

                <div  className="relative border-slate-300 border p-2 px-5 rounded-b-lg bg-[#e1ffe7] ">
                   
                    {/* content editable span, suppressed the warning that elements are modified */}
                    <span suppressContentEditableWarning={true} contentEditable={true} onInput={e=>props.setLatest(e.currentTarget.textContent?e.currentTarget.textContent:"")} className="border-0 outline-none">{props.originalText}</span>
                    <div className="inline-block w-[37.12px]"></div>  
                    <span className="absolute right-0 bottom-0 bg-[#c2ffcf] text-slate-600 px-1 rounded-br-lg">Edit</span>
                </div>
            </>)}
            
            </>)
            }

           
         
            

        </div>
    </>)
   
}