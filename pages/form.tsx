import axios from "axios"
import { useState } from "react"

export default function Index() {
    const [newReview, setNewReview] = useState("")
    const [newName, setNewName] = useState("anon")
    const [newSubject, setNewSubject] = useState("-")
    const [newLevel, setNewLevel] = useState("-")
    const [isHiddenState, setHiddenState] = useState(true)

    function onAdd() {
        if (!newReview || newSubject === '-' || newLevel === '-' || newReview.length < 20) {
            setHiddenState(false)      //validation on client side
        } else {
            axios.post("/api/review", JSON.stringify({ review: newReview, name: newName, subject: newSubject, level: newLevel }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => { setHiddenState(true); setNewReview(""); setNewName("anon"); setNewSubject("-"); setNewLevel("-") })
                .catch(e => {
                    if (e.response?.status === 400) {
                        console.log('400')
                        setHiddenState(false)          //validation on server side in case someone bypasses it
                    }
                    console.log(e)
                })
        }
    }


    return (
        <>
            {/* using the post endpoint when you submit a reviews*/}
            <div className="nav-bar"><span>Leave a Review!</span></div>
            <div className="container">
                <div className="top-section">
                    <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                    <p className="intro">If you've ever had a lesson with me, feel free to leave me a review on how I've done!</p>
                </div>

                <hr />

                <div className="w-auto sm:w-[607px] m-auto text-center">


                    <label >
                        What subject did I tutor you in? *
                        <select value={newSubject} onChange={r => setNewSubject(r.target.value)} name={"subject"} className=" mt-3 mb-6 m-auto block outline-[#8ba370] p-2 border-solid border border-black rounded-lg " >
                            <option>-</option>
                            <option>Maths</option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>Biology</option>
                            <option>Geography</option>
                        </select>
                    </label>

                    <label >
                        What level was this at? *
                        <select value={newLevel} onChange={r => setNewLevel(r.target.value)} className="m-auto mt-3 mb-6 block outline-[#8ba370] p-2 border-solid border border-black rounded-lg " >

                            <option>-</option>
                            <option>Year 6-8 </option>
                            <option>Year 9</option>
                            <option>GCSE</option>
                            <option>A-Level</option>
                        </select>

                    </label>

                    <div className="text-right">
                        <span className="text-[12px]">* (20-2000 characters)</span>
                        <textarea value={newReview} minLength={20} maxLength={2000} name="body" onChange={r => setNewReview(r.target.value)} className="outline-[#8ba370] p-2 border-solid border border-black rounded-lg h-[180px] w-full  " placeholder={"Enter your review here:"} required />
                    </div>

                    <input value={newName === 'anon' ? "" : newName} onChange={r => setNewName(r.target.value)} placeholder="Your name (optional)" type="text" className=" outline-[#8ba370] p-2 border-solid border border-black rounded-lg w-full my-6 " />
                    <p className="text-red-500 text-[14px]" hidden={isHiddenState}>*required fields are not filled in</p>
                    <button className="bg-[#446043] text-white rounded-lg p-2  drop-shadow-lg my-6" onClick={onAdd}>Submit</button>

                </div>



            </div>



        </>
    );
}
