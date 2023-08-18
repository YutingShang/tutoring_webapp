import {useState, useEffect} from "react";
import axios from "axios";
import LoadingIcons from 'react-loading-icons'


export default function Index() {
    const [quoteObject, setQuoteObject] = useState<{quote: string, author:string, category: string }|null>(null)
    const [quote, setQuote] = useState("")

    useEffect(()=>{
        fetch('/api/fetch-data')
            .then(res=>res.json())
            .then(data=>setQuoteObject(data))
            .catch(e=>{console.log(e)})
    }, [])

    console.log(quoteObject)

    
    return (
        <>

<div className="nav-bar"><span>Teaching</span></div>
            <div className = "container">
              
                <div className="top-section">
                <a href="/"><img src="/profile-pic.jpeg" id="home-circle" /></a>
                {quoteObject? (<>
                <p>Random Quote: {quoteObject.quote}</p>
                </>):     <LoadingIcons.TailSpin className="block" stroke="#98ff98" strokeOpacity={1} />}
            
                </div>
                
               
            
             

            </div>

        </>
    );
}
