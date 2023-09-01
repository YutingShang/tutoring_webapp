import axios from "axios"
import { useState } from "react"
import HamburgerMenu from "../components/HamburgerMenu"
import LoadingIcons from "react-loading-icons"
import { Session } from "next-auth"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import AccountPanel from "../components/AccountPanel"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) return { props: {} }         //go back to sign in page

    return { props: { session: session } }   //stay on this page
}

export default function Form(props: { session: Session }) {
    const [newReview, setNewReview] = useState("")
    const [newName, setNewName] = useState("anon")
    const [newSubject, setNewSubject] = useState("-")
    const [newLevel, setNewLevel] = useState("-")
    const [isLoading, setIsLoading] = useState(false)
    const [showThankyou, setShowThankyou] = useState(false)
    const [submitFailed, setSubmitFailed] = useState(false)

    function onAdd() {
        if (newSubject === '-' || newLevel === '-' || newReview.length < 20) {
            //validation on client side
            setSubmitFailed(true)
        } else {
            setIsLoading(true)
            axios.post("/api/review", JSON.stringify({ review: newReview, name: newName, subject: newSubject, level: newLevel }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => { setIsLoading(false); setShowThankyou(true); setSubmitFailed(false); setNewReview(""); setNewName("anon"); setNewSubject("-"); setNewLevel("-") })
                .catch(e => {
                    if (e.response?.status === 400) {
                        console.log('400')
                    }
                    console.log(e)
                })
        }
    }


    return (
        <>
            {/* using the post endpoint when you submit a reviews*/}
            <div className="nav-bar"><span>Leave a Review!</span></div>

            <HamburgerMenu home aboutMe admin />
            <div className="container">
                {props.session && <AccountPanel session={props.session} />}
                <div className="top-section">
                    <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                    <p className="intro">If you've ever had a lesson with me, feel free to leave me a review on how I've done!</p>
                </div>

                <hr />

                <div className="w-auto sm:w-[607px] m-auto text-center">


                    <label >
                        What subject did I tutor you in? *
                        <select value={newSubject} onChange={r => { setShowThankyou(false); setNewSubject(r.target.value) }} name={"subject"} className=" mt-3 mb-6 m-auto block outline-[#8ba370] p-2 border-solid border border-black rounded-lg " >
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
                        <select value={newLevel} onChange={r => { setShowThankyou(false); setNewLevel(r.target.value) }} className="m-auto mt-3 mb-6 block outline-[#8ba370] p-2 border-solid border border-black rounded-lg " >

                            <option>-</option>
                            <option>Year 6-8 </option>
                            <option>Year 9</option>
                            <option>GCSE</option>
                            <option>A-Level</option>
                        </select>

                    </label>

                    <div className="text-right ">
                        <span className="text-[12px]">* (20-2000 characters)</span>
                        <textarea value={newReview} minLength={20} maxLength={2000} name="body" onChange={r => { setShowThankyou(false); setNewReview(r.target.value) }} className="outline-[#8ba370] p-2 border-solid border border-black rounded-lg h-[180px] w-full  " placeholder={"Enter your review here:"} required />
                        {/* <span className="text-[12px] absolute bottom-0 right-0 mb-2 mr-6 px-3 text-slate-600 bg-gray-200 ">{newReview.length}</span> */}
                        <span className="text-[12px] text-slate-500 leading-tight mt-0">Count: {newReview.length}</span>
                    </div>
                    {/* show error message after a failed submission, but disappears once fixed */}
                    <input value={newName === 'anon' ? "" : newName} onChange={r => { setShowThankyou(false); setNewName(r.target.value) }} placeholder="Your name (optional)" type="text" className=" outline-[#8ba370] p-2 border-solid border border-black rounded-lg w-full my-6 " />
                    {submitFailed && (newSubject === '-' || newLevel === '-' || newReview.length < 20) &&
                        <p className="text-red-500 text-[14px]" >*required fields are not filled in</p>}

                    {/* show thankyou message after successful submission, but if you enter something new (fill in new review), it disappears */}
                    {showThankyou &&
                        <p className="text-[#446043] text-[14px]" >Thank you :)</p>}

                    {/* Either show loading or submit button */}
                    {isLoading ? <LoadingIcons.TailSpin className="mx-auto block mt-[32px] mb-[56px] w-6" stroke="#8ba370" strokeOpacity={1} /> :
                        <button className="bg-[#446043] text-white rounded-lg p-2  drop-shadow-lg my-6" onClick={onAdd}>Submit</button>}

                </div>

            </div>

        </>
    );
}
