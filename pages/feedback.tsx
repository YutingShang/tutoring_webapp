import { useState } from "react";
import reviewsArray from "../data/reviews";
import ReviewBubble from "../components/ReviewBubble";

export default function Feedback() {
    const [search,setSearch] = useState("");
    const filteredReviewsArray = reviewsArray.filter(r=> r.text.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase()) ||
    r.date.toLowerCase().includes(search.toLowerCase()) ||
    r.level.toLowerCase().includes(search.toLowerCase())  )
    return (
        <>
            
              
                <div className="nav-bar"><span>Reviews</span></div>
                <div className = "container">
                <div className="top-section">
                    <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                        <p className="intro">Take a look at the feedback I have recieved. <br></br>Search for keywords such as subject or date</p>
                    </div>

                    <div className="reivew-section">
            
                        <input  className="search-bar" type="text" placeholder="Type..." value={search} onChange={e=>setSearch(e.target.value)} />
                    <i></i>
                   
              
             { (filteredReviewsArray.length>0)?
             
             (<>{filteredReviewsArray.map(rev=> 
                (rev.id %2==0)?
                
                (<ReviewBubble key={rev.id} direction="right" text={rev.text} level={rev.level} date={rev.date} student={rev.student} subject={rev.subject}/>) : 
                (<ReviewBubble key={rev.id} direction="left" text={rev.text} level={rev.level} date={rev.date} student={rev.student} subject={rev.subject}/>) )}</>)
                :
                (<p id="no-results">No search results</p>)
             }  
</div>
            </div>

        </>
    );
}
