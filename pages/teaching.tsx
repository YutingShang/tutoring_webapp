import { useState, useEffect } from "react";
import LoadingIcons from 'react-loading-icons'
import teachingQuestionsArray from "../data/teaching-questions";
import QuestionCard from "../components/QuestionCard";


export default function Index() {
    const [quoteObject, setQuoteObject] = useState<{ quote: string, author: string, category: string } | null>(null)
    const [treeArray, setTreeArray] = useState([teachingQuestionsArray[0]]) //start with the first teaching-question object
    //disclaimer, not actually a tree, more like a decision tree/graph



    useEffect(() => {
        fetch('/api/fetch-data')
            .then(res => res.json())
            .then(data => setQuoteObject(data))
            .catch(e => { console.log(e) })
    }, [])


    function onClickYesOrNo(polarity: string,
        q: {      //the current question
            id: number,
            question: string,
            yesChild: number | null,
            noChild: number | null
        }) {

        const newQuestionObject = teachingQuestionsArray.find(item => item.id === (polarity === 'y' ? q.yesChild : q.noChild))    //finds either the yes or no child of the current card 
        // depending on the polarity of the button clicked, undefined if 
        let newTreeArray = [...treeArray]    //copy of array

        if (treeArray.includes(q)) {
            newTreeArray.length = treeArray.indexOf(q) + 1      //splices and removes all items after the current item q
            console.log("current is in branch before")
        }
        if (newQuestionObject !== undefined && !newTreeArray.includes(newQuestionObject)) {        //if object exists and doesnt already exist (it wont, cos the rest of the list was removed)
            newTreeArray = [...newTreeArray, newQuestionObject]                 //adds new object 
            console.log("new object added")

        } else {
            console.log("error occured - yes child not found", newQuestionObject)
            console.log(newQuestionObject !== undefined, treeArray)
        }



        setTreeArray(newTreeArray)





    }


    return (
        <>

            <div className="nav-bar"><span>Teaching</span></div>
            <div className="container">

                <div className="top-section">
                    <a href="/" ><img src="/profile-pic.jpeg" id="home-circle" /></a>
                    {quoteObject ? (<>
                        <p className="mt-[18px] intro leading-[32px]">Random Quote: "{quoteObject.quote}"</p>
                    </>) : <LoadingIcons.TailSpin className="mx-auto block mt-[32px] w-6" stroke="#8ba370" strokeOpacity={1} />}

                </div>

                {treeArray.map(q => <QuestionCard onClickYes={() => onClickYesOrNo('y', q)} onClickNo={() => onClickYesOrNo('n', q)} key={q.id} id={q.id} question={q.question} yesChild={q.yesChild} noChild={q.noChild} />)}

            </div>

        </>
    );
}
