import axios from "axios"
import mongoose from "mongoose"
import { ReviewModel } from "../../models/review";
import EditCard from "../../components/EditCard";
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import SelectOption from "../../components/SelectOption";
import AdditionalEditCard from "../../components/AdditionalEditCard";
import OutsideClickHandler from 'react-outside-click-handler';




export async function getServerSideProps(context: any) {     //fetch data from the server, runs on the server

    await mongoose.connect(process.env.MONGODB_URL as string);
    const revsArray = await ReviewModel.find();          //get from the database


    //find the corresponding comment
    const reviewId = context.params.reviewEditId;      //name of the page, remove the /admin/ bit to just get the id
    console.log(revsArray, reviewId)
    const reviewObject = revsArray.find(r => r._id.toString() === reviewId);
    console.log(reviewObject)

    if (!reviewObject) {
        return { notFound: true }   //404 page
    }
    return {
        props: {
            _id: reviewId,
            review: JSON.parse(JSON.stringify(reviewObject!.review)),
            subject: JSON.parse(JSON.stringify(reviewObject!.subject)),
            level: JSON.parse(JSON.stringify(reviewObject!.level)),
            name: JSON.parse(JSON.stringify(reviewObject!.name)),
            date: reviewObject.date ? reviewObject.date : null,
            examBoard: reviewObject.examBoard ? reviewObject.examBoard : null,
        }
    }




}

export default function ReviewPage(props: {
    _id: string
    review: { original: string, current?: string },
    subject: { original: string, current?: string },
    level: { original: string, current?: string },
    name: { original: string, current?: string },
    date: string,     //date taught student, might be null
    examBoard: string   //might be null
}) {
    const [latestReview, setLatestReview] = useState("")    //initially no changes made so "", will change when you input into the textbox
    const [latestName, setLatestName] = useState("")
    const [latestSubject, setLatestSubject] = useState("")
    const [latestLevel, setLatestLevel] = useState("")
    // console.log("The latest review", latestReview)
    const [showOption, setShowOption] = useState(false)
    const [additionalFieldOptions, setAdditionalFieldOptions] = useState(["-", ...(!props.date ? ["date"] : []), ...(!props.examBoard ? ["exam board"]:[])])      //can export to a data file - maintain ALPHABETICALLY SORTED. On page load, it will conditionally show the options which have not yet been added
    const [selectedOption, setSelectedOption] = useState("-")

    const [hideDateField, setHideDateField] = useState(!props.date)    //show or hide depending if the field exists before. If null, then you set hidden to true (!props.date would be true since it doensnt exist)
    const [latestDate, setLatestDate] = useState("")
    const [hideExamBoardField, setHideExamBoardField] = useState(!props.examBoard)
    const [latestExamBoard, setLatestExamBoard] = useState("")

    function onSubmitChanges() {
        axios.put("/api/review", JSON.stringify({
            _id: props._id,
            ...(latestReview != "" && { reviewLatestEdit: latestReview }),
            ...(latestSubject != "" && { subjectLatestEdit: latestSubject }),
            ...(latestLevel != "" && { levelLatestEdit: latestLevel }),
            ...(latestName != "" && { nameLatestEdit: latestName }),
            ...(latestDate != "" && { date: latestDate }),
            ...(latestExamBoard!="" && {examBoard: latestExamBoard}),
        }), {     //update latest review, if changes were made, if empty string "" that means no changes were made
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(


        ).catch(e => console.log(e))
        window.location.reload()
    }



    console.log(props.review)
    console.log(selectedOption)

    function capitaliseFirst(word: string) {
        return word[0].toUpperCase() + word.slice(1)
    }

    function onAddField() {
        if (selectedOption === 'date') {
            setHideDateField(false)       //so you show it
            let newOptions = [...additionalFieldOptions]
            newOptions.splice(additionalFieldOptions.indexOf('date'), 1)    //removes date from options to add
            setSelectedOption("-")       //reset selected choice back to 'Add extra'
            setAdditionalFieldOptions(newOptions)
        } else if (selectedOption === 'exam board') {
            setHideExamBoardField(false)
            let newOptions = [...additionalFieldOptions]
            newOptions.splice(additionalFieldOptions.indexOf('exam board'), 1)
            setSelectedOption("-")
            setAdditionalFieldOptions(newOptions)
        }

    }

    function onRemoveDate() {
        setLatestDate("")
        setHideDateField(true)
        setAdditionalFieldOptions([...additionalFieldOptions, 'date'].sort())
    }

    function onRemoveExamBoard() {
        setLatestExamBoard("")      //removes the data captured
        setHideExamBoardField(true)
        setAdditionalFieldOptions([...additionalFieldOptions, 'exam board'].sort())
        
    }

    console.log(latestExamBoard)
    return (<>
        <div className="container editpage">
            <div className="top-section">
                <p className="intro">Make any changes.</p>
            </div>


            {/* <div className="text-center">    //this is another style of input box, left and right style
        <span className="px-3 p-2 bg-gray-100 border-slate-300 border rounded-l-lg border-r-0 shadow-sm shadow-[inset_0px_3px_3px_rgba(0,0,0,0.03)]">Original</span>
        <span className="border-slate-300 border p-2 px-5 rounded-r-lg bg-slate-100 text-slate-600">The review</span>
        </div> */}

            <EditCard setLatest={setLatestName} cardTitle="Name" originalText={props.name.original} currentText={props.name.current} />
            <EditCard setLatest={setLatestSubject} cardTitle="Subject" originalText={props.subject.original} currentText={props.subject.current} />
            <EditCard setLatest={setLatestLevel} cardTitle="Level" originalText={props.level.original} currentText={props.level.current} />
            <EditCard setLatest={setLatestReview} cardTitle="Review" originalText={props.review.original} currentText={props.review.current} />

            <AdditionalEditCard hidden={hideDateField} onRemove={onRemoveDate} setLatest={setLatestDate} cardTitle="Date" currentText={props.date} />
            <AdditionalEditCard hidden={hideExamBoardField} onRemove={onRemoveExamBoard} setLatest={setLatestExamBoard} cardTitle="Exam Board" currentText={props.examBoard}/>

            <div className="max-w-2xl mx-auto ">
                <div className="inline-block relative mb-10">   {/*margin bottom to the submit button*/}
                    {/*the Add button with the caret down icon */}
                    <OutsideClickHandler onOutsideClick={() => setShowOption(false)}>     {/*small issue that it doesnt work when you click outside on the same line as the button */}
                        <button onClick={() => { setShowOption(!showOption) }}>
                            <span className=" absolute top-0 left-0 inline-block mr-6 font-medium relative px-4 leading-loose py-1 bg-gray-100 border-slate-300 border rounded-lg shadow-[inset_0px_3px_3px_rgba(0,0,0,0.03)] ">
                                {selectedOption === "-" ? (<><span className="text-slate-500">Add extra</span></>) : capitaliseFirst(selectedOption)}  &nbsp;&nbsp;
                                {/*toggle the option display or not*/}
                                {/* {selectedOption==="-" && */}
                                <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: "#64748b", }} />


                            </span></button>

                        {/* the expanded options are below */}

                        <div className={"z-10 absolute top-[50px] left-0 shadow-md bg-gray-50 rounded-lg " + (showOption ? "inline-block" : "hidden")} >    {/*hide or not if selected*/}
                            {/*map every field to an option*/}

                            {additionalFieldOptions.map(op =>     //for every option in the list
                                <button key={op} className="block text-left"
                                    onClick={() => { setSelectedOption(op); setShowOption(false) }}>
                                    <SelectOption>{capitaliseFirst(op)}</SelectOption>  {/*capitalises first letter*/}
                                </button>

                            )}


                        </div>

                        {/* Plus icon - only show when not on 'Add extra' option */}
                        {selectedOption != '-' &&
                            <button className="inline-block" onClick={onAddField}>
                                <FontAwesomeIcon icon={faCirclePlus} size="xl" style={{ color: "#64748b", }} />
                            </button>}
                    </OutsideClickHandler>
                </div>
            </div>


            {/* <Select options={[{value:'date', label:'Date'}]}/> */}

            <div className="text-center mb-20">      {/*WARNING- large margin for the dropdown, may need to increase if more options*/}
                <button onClick={onSubmitChanges} className=" bg-sky-700 text-white rounded-lg p-2  drop-shadow-lg mb-8">Submit</button>
            </div>



        </div>

    </>)
}