import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoadingIcons from 'react-loading-icons'


export default function Admin() {
    const [revsArray, setRevsArray] = useState<{ _id: string, review: { original: string, current: string }, name: { original: string, current: string }, level: { original: string, current: string }, subject: { original: string, current: string }, displayed: boolean }[]>([]);
    //dont really need name, subject and level on this page
    
    function onRequest() {
        axios.get("/api/review")
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
        let revsArrayCopy = [...revsArray]
        let reviewItem = revsArrayCopy.find(r=>r._id==id)
        reviewItem!.displayed = !reviewItem!.displayed
        setRevsArray(revsArrayCopy)

        axios.put("/api/review", JSON.stringify({ _id: id, displayed: !displayed }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => onRequest()).catch(e => console.log(e))


    }
    return (
        <>


            <div className="container">
                <div className="top-section">
                    <p className="intro">Select the ones that you want to display</p>
                </div>
                <div className="text-center">


                    {revsArray.length!=0? 
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

                    )): 
                    <LoadingIcons.TailSpin className="mx-auto block mt-[32px] w-6" stroke="#0369A1" strokeOpacity={1} />
                    }

                </div>

            </div>

        </>
    );
}

