//this is the optional fields that you add later
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"

enum EditStates {
    NoEdit,
    Edit
}

export default function AdditionalEditCard(props: {
    cardTitle: string,
    currentText: string   //could be null
    setLatest: (arg0: string) => void,
    hidden: boolean
    onRemove: ()=>void
}) {
    const [editState, setEditState] = useState(EditStates.NoEdit);
   // const [hiddenState, setHiddenState] = useState(false)    //DOESNT WORK the hidden state, initially set to what was passed in from the main edit page
   
    function onToggle() {     //edit or no edit
        if (editState === EditStates.Edit) {
            setEditState(EditStates.NoEdit)
            props.setLatest("")    //delete any edits made
        } else {
            setEditState(EditStates.Edit)
        }
    };


    return (<>
        {!props.hidden &&    //show or not
            <div className="break-words my-10 max-w-2xl mx-auto">
                <div className="font-medium relative px-5 leading-loose p-2 bg-gray-100 border-slate-300 border rounded-t-lg border-b-0 shadow-[inset_0px_3px_3px_rgba(0,0,0,0.03)] ">
                    {props.cardTitle}

                    {props.currentText != null ?
                        //has been edited before so display both button options to further edit or not, and toggle
                        (<>
                            <button onClick={onToggle}>

                                {editState === EditStates.NoEdit ?
                                    //if in not edit mode, you can click to edit
                                    (<>
                                        <FontAwesomeIcon className="absolute right-4 top-[50%] translate-y-[-50%]" icon={faPenToSquare} style={{ color: "#64748b", }} size="lg" />
                                    </>) :
                                    //otherwise, cross to cancel edit if edited before, this is the other option
                                    (<>
                                        <FontAwesomeIcon className="absolute right-4 top-[50%] translate-y-[-50%]" icon={faXmark} style={{ color: "#64748b", }} size="lg" />
                                    </>)}

                            </button>

                        </>) :

                        (<>
                            <button onClick={props.onRemove}>
                                <FontAwesomeIcon className="absolute right-4 top-[50%] translate-y-[-50%]" icon={faXmark} style={{ color: "#64748b", }} size="lg" />
                            </button>

                        </>)}





                </div>
                {props.currentText != null ?     //whether it has been edited before
                    //not null means it has been edited before - one or two boxes
                    (<>

                        {editState === EditStates.NoEdit ?    //whether it is editable
                            //not editable - red box
                            (<>
                                <div className="relative border-slate-300 border p-2 px-5 bg-[#ffe6e4] text-slate-500 rounded-b-lg">
                                    {props.currentText}
                                    <div className="inline-block w-[65.07px]"></div>
                                    <span className="absolute right-0 bottom-0 bg-[#ffcccc] text-slate-600 px-1 rounded-br-lg">Current</span>
                                </div>

                            </>) :     //editable - red box and green box (plus grey box at top)
                            (<>
                                <div className="relative border-slate-300 border border-b-0 p-2 px-5 bg-[#ffe6e4] text-slate-500">
                                    {props.currentText}
                                    <div className="inline-block w-[65.07px]"></div>
                                    <span className="absolute right-0 bottom-0 bg-[#ffcccc] text-slate-600 px-1">Current</span>
                                </div>

                                <div className="relative border-slate-300 border p-2 px-5 rounded-b-lg bg-[#e1ffe7] ">

                                    {/* content editable span, suppressed the warning that elements are modified */}
                                    <span suppressContentEditableWarning={true} contentEditable={true} onInput={e => props.setLatest(e.currentTarget.textContent ? e.currentTarget.textContent : "")} className="border-0 outline-none">{props.currentText}</span>
                                    <div className="inline-block w-[37.12px]"></div>
                                    <span className="absolute right-0 bottom-0 bg-[#c2ffcf] text-slate-600 px-1 rounded-br-lg">Edit</span>
                                </div>
                            </>)}
                    </>) :
                    //not edited before - new green input box

                    (<>
                        {/* only display if in edit state, if crossed, disappear */}
                        <div className="relative border-slate-300 border p-2 px-5 rounded-b-lg bg-[#e1ffe7] ">

                            {/* content editable span, suppressed the warning that elements are modified */}
                            <span placeholder="Enter new value ..." suppressContentEditableWarning={true} contentEditable={true} onInput={e => props.setLatest(e.currentTarget.textContent ? e.currentTarget.textContent : "")} className="border-0 outline-none "></span>
                            <div className="inline-block w-[37.12px]"></div>
                            <span className="absolute right-0 bottom-0 bg-[#c2ffcf] text-slate-600 px-1 rounded-br-lg">Edit</span>
                        </div>


                    </>)
                }





            </div>}
    </>)

}