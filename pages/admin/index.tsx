import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoadingIcons from 'react-loading-icons'
import { getSession, signOut } from "next-auth/react"
import { GetServerSidePropsContext } from "next";
import HamburgerMenu from "../../components/HamburgerMenu";
import { Session } from "next-auth";
import { UserModel } from "../../models/user";
import AccountPanel from "../../components/AccountPanel";
import databaseConnect from "../../lib/connection";

export default function Admin(props: {
    session: Session
}) {

    const [revsArray, setRevsArray] = useState<{ _id: string, review: { original: string, current: string }, name: { original: string, current: string }, level: { original: string, current: string }, subject: { original: string, current: string }, displayed: boolean }[] | null>(null);
    //dont really need name, subject and level on this page


    function onRequest() {
        axios.get("/api/review-admin")
            .then(res => { setRevsArray(res.data.reviewsArray) }).catch(e => console.log(e))     //gets the new data and then updates the local array
    }

    useEffect(() => {
        onRequest();
    }, [])    //run once at the start


    useEffect(() => {
        //refreshes every 2 secs to update

        const interval = setInterval(() => {
            onRequest()
        }, 2000);  //every 2 secs, 1 sec = 1000 ms
        return () => clearInterval(interval)
    }, [onRequest])


    function onToggleDisplay(id: string, displayed: boolean) {

        //update the ui first, then update on server
        let revsArrayCopy = [...revsArray!]
        let reviewItem = revsArrayCopy.find(r => r._id == id)
        reviewItem!.displayed = !reviewItem!.displayed
        setRevsArray(revsArrayCopy)

        axios.put("/api/review-admin", JSON.stringify({ _id: id, displayed: !displayed }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            // () => onRequest()    //dont call this again to stop glitches
        ).catch(e => console.log(e))

    }


    return (
        <>

            <HamburgerMenu home aboutMe leaveReview blue />
            <div className="container">
                <AccountPanel session={props.session} />

                <div className="lg:mt-[120px] mt-[150px] text-center mb-16">
                    {/* <div className="top-section"> */}
                    <p className="intro">Select the ones that you want to display</p>
                </div>
                <div className="text-center">


                    {revsArray ?    //whether it has been loaded yet, if not show loading icon
                        //whether the database is empty
                        (revsArray.length == 0 ? <p className="text-[#b8bab8]">No reviews yet</p> :
                            (revsArray.map((r) =>     //!!each should have a unique key prop

                                //the blue button cards
                                <div key={r._id} className={"inline-block relative  m-4 rounded-lg " + (r.displayed ? "bg-sky-200  drop-shadow-md" : "bg-white  drop-shadow-md bg-slate-50")}>
                                    <button className={"reviewButton inline-block p-5 mr-14"}
                                        onClick={() => onToggleDisplay(r._id, r.displayed)}>

                                        <p className="text-[16px] leading-[24px]">{r.review.current ? r.review.current : r.review.original}</p>    {/*shows original if 'current' edit doesnt exist*/}
                                    </button>
                                    <a href={'/admin/' + r._id}>
                                        <FontAwesomeIcon className="absolute block top-[50%] translate-y-[-50%] right-4" icon={faPenToSquare} size="lg" style={{ color: "#0369A1" }} />

                                    </a>

                                </div>

                            ))) :
                        <LoadingIcons.TailSpin className="mx-auto block mt-[32px] w-6" stroke="#0369A1" strokeOpacity={1} />
                    }

                </div>

            </div >

        </>
    );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) return { redirect: { permanent: false, destination: "/login" } }         //go back to sign in page
    console.log("Session on Admin", session)
    try {
        await databaseConnect()
        const thisUser = await UserModel.findOne({ email: session.user.email })

        if (!thisUser) {
            return { redirect: { permanent: false, destination: "/login?unauthorised=true" } }        //go back to sign in page
        }
    } catch (e) {
        console.log(e)
        return { notFound: true }
    }

    return { props: { session: session } }   //stay on this page
}

