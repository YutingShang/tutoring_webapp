import { useState } from "react";

export default function Index() {
    const [newReviewText, setNewReviewText]= useState("");
    const [reviewsArray, setReviewArray] = useState<{text: string, display: boolean}[]>([]);

    function onAdd(){
        if (newReviewText!=""){
        const newReview ={
            text : newReviewText,
            display : false,     //default set to not display
        }

        setReviewArray([newReview,...reviewsArray]);
        setNewReviewText("");
    }

    }

    function onToggleDisplay(i: number){
        let newReviewArray = [...reviewsArray];
        newReviewArray[i].display = !newReviewArray[i].display;
        setReviewArray(newReviewArray)
    }
    return (
        <>
            <div className = "container">
              <div className="mt-[100px]  text-center">
                <p>Select the ones that you want to display</p>
                <input className="sm:inline-block block 
                    sm:m-8 mx-auto my-6
                    border-solid border border-slate-400 outline-none rounded-lg p-2 w-56"
                    placeholder="Type a review" 
                    type="text" value={newReviewText} onChange={e=> setNewReviewText(e.target.value)}/>
                <button className="bg-sky-700 text-white rounded-lg p-2  drop-shadow-lg mb-8"onClick={onAdd}>Submit</button>
                </div>

                <div className="text-center">
                {reviewsArray.map((r,index)=> 
                    <button className={"inline-block p-5 m-4 rounded-lg "+(r.display? "bg-sky-200  drop-shadow-md" : "bg-white  drop-shadow-md bg-slate-50")} 
                    onClick={()=>onToggleDisplay(index)}
                    >{r.text}</button>
                )}

            </div>
                
            </div>

        </>
    );
}
