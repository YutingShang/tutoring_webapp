import { useState, useEffect } from "react";
// import reviewsArray from "../data/reviews";
import ReviewBubble from "../components/ReviewBubble";
import axios from "axios"
import HamburgerMenu from "../components/HamburgerMenu";
import LoadingIcons from "react-loading-icons";
import { Session } from "next-auth";
import AccountPanel from "../components/AccountPanel";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) return { props: {} }         //go back to sign in page

    return { props: { session: session } }   //stay on this page
}

export default function Feedback(props: { session: Session }) {
    const [search, setSearch] = useState("");
    const [revsArray, setRevsArray] = useState<{ _id: string, review: { original: string }, name: { original: string }, level: { original: string, }, subject: { original: string }, date: string, examBoard: string }[] | null>(null);

    function onRequest() {        //pulling data fromt the database
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



    //new filtered array - could be null
    const filteredReviewsArray = revsArray?.filter(r =>
    //one of the below (i.e. contains a searched phrase if there is a search)
    (
        (r.review.original).toLowerCase().includes(search.toLowerCase()) ||
        (r.subject.original).toLowerCase().includes(search.toLowerCase()) ||
        ((r.date ? true : false) && r.date.toLowerCase().includes(search.toLowerCase())) ||
        (r.level.original).toLowerCase().includes(search.toLowerCase())
    )
    )


    return (
        <>
            <HamburgerMenu home aboutMe leaveReview admin />

            <div className="nav-bar"><span>Reviews</span></div>
            <div className="container">
                {props.session && <AccountPanel session={props.session} />}
                <div className="top-section">
                    <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                    <p className="intro">Take a look at the feedback I have recieved. <br></br>Search for keywords such as subject or date</p>
                </div>

                <div className="reivew-section">

                    <input className="search-bar" type="text" placeholder="Type..." value={search} onChange={e => setSearch(e.target.value)} />

                    {filteredReviewsArray ? (
                        (filteredReviewsArray.length > 0) ?

                            (<>{filteredReviewsArray.map((rev, index) =>
                                (index % 2 != 0) ?

                                    (<ReviewBubble key={rev._id} direction="right" text={rev.review.original} level={rev.level.original} date={rev.date} student={rev.name.original} subject={rev.subject.original} />) :
                                    (<ReviewBubble key={rev._id} direction="left" text={rev.review.original} level={rev.level.original} date={rev.date} student={rev.name.original} subject={rev.subject.original} />))}</>)
                            :
                            (<p id="no-results">No search results</p>))
                        :
                        // Loading if not retrieved from database yet
                        <LoadingIcons.TailSpin className="mx-auto block mt-[32px] w-6" stroke="#8ba370" strokeOpacity={1} />
                    }
                </div>
            </div>

        </>
    );
}

